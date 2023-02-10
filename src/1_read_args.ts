import path from "path";

export function readArgs(){
  console.log(process.argv);

  const dirI = process.argv.indexOf(`--directory`);
  const tplI = process.argv.indexOf(`--template`);
  const destI = process.argv.indexOf(`--destination`);

  if(dirI < 0) 
    throw new TypeError(`Missing argument directory.`);
  if(tplI < 0) 
    throw new TypeError(`Missing argument template.`);
  if(destI < 0) 
    throw new TypeError(`Missing argument destination.`);

  const directory = process.argv[dirI + 1];
  const template = process.argv[tplI + 1];
  const destination = process.argv[destI + 1];

  if(!directory || !path.isAbsolute(directory))
    throw new TypeError(`Invalid Directory`);
  if(!template?.length)
    throw new TypeError(`Invalid Template`);
  if(!destination?.length)
    throw new TypeError(`Invalid Destination`);

  return {
    directory,
    template,
    destination
  };
}