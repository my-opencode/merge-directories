export function getHelp() {
  if (process.argv.includes(`--help`)) {
    console.log(`merge-directories
Version: ${process.env.NPM_PACKAGE_VERSION}

Usage:

merge-directories.exe --help

Prints this Usage section.

merge-directories.exe --directory /abs/path --destination merged --template my-backup-

Arguments:
- directory: String: absolute path to the folder where directories to merge are located.
- template: String: beginning of the beginning of the name of the directories to merge.
- destination: String: destination folder name

Process:
- Creates /abs/path/merged if missing
- Lists all source directories (sources) of /abs/path starting with template "my-backup-"
- Iterates sources
  - Adds directories and sub directories of source inside destination
  - Overwrites files of destination with those of source
`);
    // process.exit();
    throw `exit`;
  }
}