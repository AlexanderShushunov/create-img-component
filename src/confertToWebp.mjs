import sharp from 'sharp';

export const confertToWebp = async (src, dest) => sharp(src)
    .toFormat('webp', { effort: 6, quality: 80 })
    .toFile(dest);

