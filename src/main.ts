import { getHelp } from "./0_help";
import { readArgs } from "./1_read_args";
import { existsDirectory } from "./2_existsDirectory";
import { listSourceDirectories } from "./3_listSourceDirectories";
import { readlineInterface } from "./readlineInterface";

(async function () {
  try {
    getHelp();
    const { directory, template, destination } = readArgs();
    await existsDirectory(directory);
    const orderedSourceDirectories = await listSourceDirectories(directory, template);
  } catch (err) {
    if (err !== `exit`)
    console.log(err instanceof Error ? `${err.message}\n${err.stack} ` : `Unexpected error: ${String(err)}`);
  }
  readlineInterface.pause();
  await new Promise(r => {
    readlineInterface.question('Press enter to close', () => {
      readlineInterface.write('Closing');
      readlineInterface.close();
      r(1);
    });
  });
})();
