import fs from "fs/promises";
import path from "path";
import { IFileToCopy } from "./5_list_all";

export async function mergeAllFiles(dest: string, files: IFileToCopy) {
  let count = 0;
  let total = String(Object.keys(files).length);
  const f = (n: number) => String(n).padStart(total.length, ` `);
  for (const rel in files) {
    try {
      console.log(`[${f(++count)}/${total}] Merging file: "${rel}".`);
      await fs.copyFile(files[rel], path.resolve(dest, rel));
    } catch (err) {
      throw new Error(`Unable to merge file ${rel}.\n${(err instanceof Error) ? err.message : err}`);
    }
  }
}