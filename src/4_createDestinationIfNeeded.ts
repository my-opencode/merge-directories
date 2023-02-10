import fs from "fs/promises";
import path from "path";
export async function createDestinationIfNeeded(directory: string, destination: string) {
  const destPath = path.resolve(directory, destination);
  try {
    await createDirectory(destPath);
    return destPath;
  } catch (err) {
    throw new Error(`Unable to create destination folder "${destination}" in "${directory}"`);
  }
}

export async function createDirectory(absolutePath: string) {
  try {
    await fs.lstat(absolutePath);
    return absolutePath;
  } catch (err) {
    // do nothing
  }
  try {
    await fs.mkdir(absolutePath);
    return absolutePath;
  } catch (err) {
    throw new Error(`Unable to create directory "${absolutePath}"`);
  }
}

export async function createAllDestinationDirectories(root:string, directories:Set<string>){
  let count = 0;
  const _directories = [...directories];
  let total = String(_directories.length);
  const f = (n:number) => String(n).padStart(total.length,` `);
  for (const rel of _directories.sort((a,b)=>a.length-b.length)){
    console.log(`[${f(++count)}/${total}] Creating directory: "${rel}".`);
    await createDirectory(path.resolve(root, rel));
  }
}