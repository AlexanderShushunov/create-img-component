#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { convertToAVIF } from './confertToAvif.mjs';
import { confertToWebp } from './confertToWebp.mjs';
import { makeComponent } from './makeComponent.mjs';
import { makeComponentName } from './makeComponentName.mjs';
import { extractImgName } from './extractImgName.mjs';

if (process.argv[2]) { // for one picture
  processImg(extractImgName(process.argv[2]));
} else { // for all pictures from folder
  const files = fs.readdirSync(getFullPath())
  for (const file of files) {
    if (!file.endsWith('.png')) {
      continue;
    }
    const imgName = extractImgName(file);
    if (imgName) {
      processImg(imgName);
    }
  }
}

function processImg(imgName) {
  const componentName = makeComponentName(imgName);
  const componentDir = getFullPath(componentName)

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir);
  }

  fs.copyFileSync(getFullPath(`${imgName}.png`),  path.join(componentDir, `${imgName}.png`));
  convertToAVIF(getFullPath(`${imgName}.png`), path.join(componentDir, `${imgName}.avif`));
  confertToWebp(getFullPath(`${imgName}.png`), path.join(componentDir, `${imgName}.webp`));
  makeComponent(imgName, componentName, componentDir);
}

function getFullPath(...tail) {
  const cwd = process.env.INIT_CWD || process.cwd();
  return path.join(cwd, ...tail);
}