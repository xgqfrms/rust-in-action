## WAPM

> WebAssembly Package Manager

```sh
# install package
$ wapm install cowsay

$ wapm run cowsay Hello World 2022!

```

WebAssembly apps and libraries

https://wapm.io/


```sh
$ wapm -h
wapm-cli 0.5.5

USAGE:
    wapm <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    add                            Add packages to the manifest without installing
    bin                            Get the .bin dir path
    config                         Config related subcommands
    execute                        Execute a command, installing it temporarily if necessary
    help                           Prints this message or the help of the given subcommand(s)
    init                           Set up current directory for use with wapm
    install                        Install a package
    keys                           Manage minisign keys for verifying packages
    list                           List the currently installed packages and their commands
    login                          Logins into wapm, saving the token locally for future commands
    logout                         Remove the token for the registry
    publish                        Publish a package
    remove                         Remove packages from the manifest
    run                            Run a command from the package or one of the dependencies
    run-background-update-check    Run the background updater explicitly
    search                         Search packages
    uninstall                      Uninstall a package
    validate                       Check if a directory or tar.gz is a valid wapm package
    whoami                         Prints the current user (if authed) in the stdout

```

