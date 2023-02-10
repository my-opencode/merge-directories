import fs from "fs/promises";
export async function existsDirectory(directory:string){
  try {
    await fs.lstat(directory);
  } catch(err){
    throw new Error(`Directory does not exist. "${directory}"`);
  }
}