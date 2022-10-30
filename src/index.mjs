import fs from 'node:fs';
import { convertToAVIF } from './confertToAvif.mjs';
import { confertToWebp } from './confertToWebp.mjs';
import { makeComponent } from './makeComponent.mjs';

const imgName = process.argv[2].split('.')[0];
const componentDir = `./${imgName}`;

if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir);
}

fs.copyFileSync(`${imgName}.png`, `${componentDir}/${imgName}.png`);
convertToAVIF(`${imgName}.png`, `${componentDir}/${imgName}.avif`);
confertToWebp(`${imgName}.png`, `${componentDir}/${imgName}.webp`);
makeComponent(imgName, componentDir);