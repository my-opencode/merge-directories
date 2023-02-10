import fs from "fs/promises";
import path from "path";

export interface IFileToCopy {
  [relativePath: string]: string;
}
export interface ILists { directories: Set<string>, files: IFileToCopy }
export async function listDirectoryAndFilesOfAllSources(orderedSourceDirectories: string[], lists?: ILists) {
  if (!lists)
    lists = {
      directories: new Set(),
      files: {}
    };
  let count = 0;
  let total = String(orderedSourceDirectories.length);
  const f = (n: number) => String(n).padStart(total.length, `0`);
  for (const source of orderedSourceDirectories) {
    console.log(`[${f(++count)}/${total}] Listing ${source}`);
    await listDirectoryAndFilesOfOneSource(source, source, lists);
  }
  console.log(`\nFound ${lists.directories.size} directories.`);
  console.log(`Found ${Object.keys(lists.files).length} files.`);
  return lists;
}

export async function listDirectoryAndFilesOfOneSource(root: string, source: string, lists: ILists) {
  try {
    const children = await fs.readdir(source, { withFileTypes: true });
    for (const child of children) {
      try {
        const absolute = path.resolve(source, child.name);
        let relative = absolute.slice(root.length);
        if ([`/`,`\\`].includes(relative.slice(0, 1))) relative = relative.slice(1);
        if (child.isFile()) {
          lists.files[relative] = absolute;
        } else if (child.isDirectory()) {
          await listDirectoryAndFilesOfOneSource(root, absolute, lists);
          lists.directories.add(relative);
        }
      } catch (err) {
        if (err instanceof Error) err.message = `${child.isFile() ? `File` : `Directory`}: ${child.name}\n${err.message}`;
        throw err;
      }
    }
  } catch (err) {
    throw new Error(`Unable to list "${source}".\n${err instanceof Error ? err.message : String(err)}`);
  }
}