import sharp from 'sharp';

export const convertToAVIF = (src, dest) => {
  sharp(src)
    .toFormat('avif', { effort: 9, quality: 50 })
    .toFile(dest);
};
