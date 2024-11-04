import { BufferedWriter } from '$lib/tools/BufferedWriter.js';
import { fail, json } from '@sveltejs/kit';
import { Jimp } from 'jimp';

export const actions = {
	upload: async ({ request, setHeaders }) => {
		const data = await request.formData();
		const file = data.get('file') as File;
		if (!file) {
			return fail(400, { success: false, error: 'Missing file parameter.' });
		}

		let buffer: Buffer | null = null;

		try {
			buffer = await parseImage(file);
		} catch (e) {
			const { message: error } = e as Error;
			console.log('return 400');
			return fail(400, { success: false, error });
		}

		setHeaders({
			'Content-Disposition': `attachment; filename="${file.name.split('.')[0]}.map`
		});
		return { success: true, data: buffer };
	}
};

async function parseImage(file: File) {
	const image = await Jimp.read(await file.arrayBuffer());
	const { width, height } = image.bitmap;
	const map: number[][] = [];
	const images: { src: string; hash: string }[] = [];

	if (width % 16 !== 0 || height % 16 !== 0) {
		throw new Error('Image dimensions must be divisible by 16.');
	}

	for (let x = 0; x < width; x += 16) {
		const row = [];
		for (let y = 0; y < height; y += 16) {
			const tile = image.clone().crop({ x, y, w: 16, h: 16 });
			const src = await tile.getBase64('image/png');
			const hash = tile.hash();
			if (!images.find((i) => i.hash === hash)) {
				images.push({
					src,
					hash
				});
			}
			row.push(images.findIndex((i) => i.hash === hash));
		}
		map.push(row);
	}

	const writer = new BufferedWriter();
	writer.writeString(file.name.toUpperCase());
	writer.writeByte(width / 16);
	writer.writeByte(height / 16);
	writer.writeByte(images.length);

	for (const image of images) {
		writer.writeString(image.src);
	}
	for (let x = 0; x < map[0].length; x++) {
		for (let y = 0; y < map.length; y++) {
			writer.writeByte(map[x][y]);
			writer.writeByte(0); //permissions
		}
	}

	return writer.getBuffer();
}
