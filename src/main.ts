import { getHelp } from "./0_help";
import { readlineInterface } from "./readlineInterface";

(async function () {
  try {
    getHelp();
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