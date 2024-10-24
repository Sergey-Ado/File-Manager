# File Manager

The file manager is designed for the following operations:
- Folder navigation
- Basic file operations (copy, move, delete, rename, etc.)
- Obtaining information about the operating system of the host machine
- Calculating a file hash
- Compress and decompress files
### Command to run from terminal
```
npm run start -- --username=your_username
```
### List of operations and their syntax:

- Navigation
    - Go upper from current directory
    ```
    up
    ```
    - Go to dedicated folder from current directory
    ```
    cd path_to_directory
    ```
    - Print in console list of all files and folders in current directory
    ```
    ls
    ```
- Basic operations with files
    - Read file
    ```
    cat path_to_file
    ```
    - Create empty file in current working directory
    ```
    add new_filename
    ```
    - Rename file:
    ```
    rn path_to_file new_filename
    ```
    - Copy file:
    ```
    cp path_to_file path_to_new_directory
    ```
    - Move file
    ```
    mv path_to_file path_to_new_directory
    ```
    - Delete file
    ```
    rm path_to_file
  ```
- Operating system info
    - Get EOL (default system End-Of-Line)
    ```
    os --EOL
    ```
    - Get host machine CPUs info
    ```
    os --cpus
    ```
    - Get home directory
    ```
    os --homedir
    ```
    - Get current system user name
    ```
    os --username
    ```
    - Get CPU architecture
    ```
    os --architecture
    ```
- Hash calculation
    - Calculate hash for file
    ```
    hash path_to_file
    ```
- Compress and decompress operations
    - Compress file
    ```
    compress path_to_file path_to_destination
    ```
    - Decompress file
    ```
    decompress path_to_file path_to_destination
    ```
### Rules for specifying paths to files and folders
- Paths can be absolute or relative
- If the path contains spaces, the entire path must be enclosed in single or double quotes. Same thing when entering a file name with spaces
- When using the compress and decompress commands, the path_to_destination must be set to the path to the final file along with the file name
- Most of the application's functions cannot work with system files and folders (for example, for windows this is c:/, c:/windows, *.sys, etc.), so the message "Operation failed" will be displayed. To be able to work with these files and folders, you must run the application as an administrator
