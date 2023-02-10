// import { createReadStream, createWriteStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { createDirectory } from "./4_createDestinationIfNeeded";
export async function mergeOneDirectory(source: string, destination: string, counters?: { file: number, dir: number }) {
  if (!counters) counters = {
    file: 0,
    dir: 0
  }
  await createDirectory(destination);
  try {
    const children = await fs.readdir(source, { withFileTypes: true });
    for (const child of children) {
      try {
        const from = path.resolve(source, child.name);
        const to = path.resolve(destination, child.name);
        if (child.isFile()) {
          await overwriteFile(from, to);
          counters.file++;
        } else if (child.isDirectory()) {
          await mergeOneDirectory(from, to, counters);
          counters.dir++;
        }
      } catch (err) {
        if (err instanceof Error) err.message = `File: ${child.name}\n${err.message}`;
        throw err;
      }
    }
    return counters;
  } catch (err) {
    throw new Error(`Unable to merge "${source}" into "${destination}".\n${err instanceof Error ? err.message : String(err)}`);
  }
}

export async function overwriteFile(from: string, to: string) {
  // const writes = createWriteStream(to);
  // const reads = createReadStream(from);
  // await new Promise((rs, rj) => {
  //   writes.on(`end`, () => rs(1));
  //   reads.on(`error`, rj);
  //   reads.pipe(writes);
  // });
  try {
    await fs.rm(to);
  } catch (err) {
    // do nothing
  }
  await fs.copyFile(from, to);
}