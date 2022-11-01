#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { convertToAVIF } from './confertToAvif.mjs';
import { confertToWebp } from './confertToWebp.mjs';
import { makeComponent } from './makeComponent.mjs';
import { makeComponentName } from './makeComponentName.mjs';
import { extractImgName } from './extractImgName.mjs';

main(process.argv[2]);

async function main(arg) {
  if (arg) { // for one picture
    await processImg(extractImgName(arg));
  } else { // for all pictures from folder
    const files = (await fs.readdir(getFullPath()))
      .filter((file) => file.endsWith('.png'));
    for (const file of files) {
      printProgress(files, file);

      const imgName = extractImgName(file);
      if (imgName) {
        await processImg(imgName);
      }
    }
  }
}

async function processImg(imgName) {
  const componentName = makeComponentName(imgName);
  const componentDir = getFullPath(componentName);

  await fs.mkdir(componentDir);

  await Promise.all([
    fs.copyFile(getFullPath(`${imgName}.png`), path.join(componentDir, `${imgName}.png`)),
    convertToAVIF(getFullPath(`${imgName}.png`), path.join(componentDir, `${imgName}.avif`)),
    confertToWebp(getFullPath(`${imgName}.png`), path.join(componentDir, `${imgName}.webp`)),
    makeComponent(imgName, componentName, componentDir),
  ]);
}

function getFullPath(...tail) {
  const cwd = process.env.INIT_CWD || process.cwd();
  return path.join(cwd, ...tail);
}

function printProgress(files, file) {
  const index = files.indexOf(file);
  const progress = Math.round(index / files.length * 100);
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.cursorTo('\n');
  process.stdout.write(`${file}, ${progress}%`);
}
