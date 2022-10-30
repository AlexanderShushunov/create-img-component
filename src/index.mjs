#!/usr/bin/env node
import fs from 'node:fs';
import { convertToAVIF } from './confertToAvif.mjs';
import { confertToWebp } from './confertToWebp.mjs';
import { makeComponent } from './makeComponent.mjs';
import { makeComponentName } from './makeComponentName.mjs';

const imgName = process.argv[2].split('.')[0];
const componentName = makeComponentName(imgName);
const componentDir = `./${componentName}`;

if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir);
}

fs.copyFileSync(`${imgName}.png`, `${componentDir}/${imgName}.png`);
convertToAVIF(`${imgName}.png`, `${componentDir}/${imgName}.avif`);
confertToWebp(`${imgName}.png`, `${componentDir}/${imgName}.webp`);
makeComponent(imgName, componentName, componentDir);