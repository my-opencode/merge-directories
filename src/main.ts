import { readlineInterface } from "./readlineInterface";

(async function () {
  console.log(`hello`);
  readlineInterface.pause();
  await new Promise(r => {
    readlineInterface.question('Press enter to close', () => {
      readlineInterface.write('Closing');
      readlineInterface.close();
      r(1);
    });
  });
})();