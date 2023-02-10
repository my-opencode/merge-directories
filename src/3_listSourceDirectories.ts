import fs from "fs/promises";
import path from "path";
export async function listSourceDirectories(directory: string, template: string) {
  const _template = template.toLowerCase();
  const tplLn = template.length;
  const dirents = await fs.readdir(directory, { withFileTypes: true });
  const sources = dirents.filter(de => de.isDirectory() && de.name.toLowerCase().slice(0, tplLn) === _template).map(de => de.name).sort().map(n => path.resolve(directory, n));
  if (!sources.length) {
    throw new Error(`Did not find any source directory like "${template}" in "${directory}`);
  }
  return sources;
}