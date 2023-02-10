export async function mergeAllDirectories(orderedSourceDirectories:string[],destination:string) {
  let count = 0;
  let total = String(orderedSourceDirectories.length);
  const f = (n:number) => String(n).padStart(total.length,`0`);
  for (const source of orderedSourceDirectories) {
    console.log(`[${f(++count)}/${total}] Merging ${source}`);
  }
}