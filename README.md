# merge-directories

Merges multiple directories in order.  

Reason to be: 

Merge partial automatic backups into the current state.  

Only adds or replace files. 
Does not remove files from the destination (merge) directory.

## Usage

### Help

merge-directories.exe --help

Prints this Usage section.

### Merge

merge-directories.exe --directory /abs/path --destination merged --template my-backup-

#### Arguments

- directory: String: absolute path to the folder where directories to merge are located.
- template: String: beginning of the beginning of the name of the directories to merge.
- destination: String: destination folder name

#### Process

- Creates /abs/path/merged if missing
- Lists all source directories (`sources`) of /abs/path starting with template "my-backup-"
- Iterates `sources`
    - Lists all unique directory relative paths
    - Lists all file relative paths and latest source path
- Iterates directory list and mkdir
- Iterates file list and copies from source to dest

## Versions

- 1.0.1 "Brute Force"
  Copies every file from every previous folder into the destination
- 2.0.0 "Work Smart"
  Lists all directories and files. Creates and copies once per file.
