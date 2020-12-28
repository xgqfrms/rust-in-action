# rust-in-action

> Rust in Action

https://www.cnblogs.com/xgqfrms/p/12702549.html

```sh
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

$ source $HOME/.cargo/env

$ rustc -h

$ rustc -V
# rustc 1.42.0 (b8cedc004 2020-03-09)

```

https://www.rust-lang.org/tools/install

https://sh.rustup.rs


```sh
$ cd src/hello_world/

$ rustc main.rs

$ ./main

```


```sh

$ rustc app.rs

error[E0432]: unresolved import `ferris_says`
 --> app.rs:1:5
  |
1 | use ferris_says::say; // from the previous step
  |     ^^^^^^^^^^^ maybe a missing crate `ferris_says`?

error: aborting due to previous error

For more information about this error, try `rustc --explain E0432`.

```

## version

```sh
$ rustc -V
rustc 1.42.0 (b8cedc004 2020-03-09)

$ rustc --version 
rustc 1.42.0 (b8cedc004 2020-03-09)

```

```sh
$ rustc -h
Usage: rustc [OPTIONS] INPUT

Options:
    -h, --help          Display this message
        --cfg SPEC      Configure the compilation environment
    -L [KIND=]PATH      Add a directory to the library search path. The
                        optional KIND can be one of dependency, crate, native,
                        framework, or all (the default).
    -l [KIND=]NAME      Link the generated crate(s) to the specified native
                        library NAME. The optional KIND can be one of
                        static, framework, or dylib (the default).
        --crate-type [bin|lib|rlib|dylib|cdylib|staticlib|proc-macro]
                        Comma separated list of types of crates
                        for the compiler to emit
        --crate-name NAME
                        Specify the name of the crate being built
        --edition 2015|2018
                        Specify which edition of the compiler to use when
                        compiling code.
        --emit [asm|llvm-bc|llvm-ir|obj|metadata|link|dep-info|mir]
                        Comma separated list of types of output for the
                        compiler to emit
        --print [crate-name|file-names|sysroot|cfg|target-list|target-cpus|target-features|relocation-models|code-models|tls-models|target-spec-json|native-static-libs]
                        Compiler information to print on stdout
    -g                  Equivalent to -C debuginfo=2
    -O                  Equivalent to -C opt-level=2
    -o FILENAME         Write output to <filename>
        --out-dir DIR   Write output to compiler-chosen filename in <dir>
        --explain OPT   Provide a detailed explanation of an error message
        --test          Build a test harness
        --target TARGET Target triple for which the code is compiled
    -W, --warn OPT      Set lint warnings
    -A, --allow OPT     Set lint allowed
    -D, --deny OPT      Set lint denied
    -F, --forbid OPT    Set lint forbidden
        --cap-lints LEVEL
                        Set the most restrictive lint level. More restrictive
                        lints are capped at this level
    -C, --codegen OPT[=VALUE]
                        Set a codegen option
    -V, --version       Print version info and exit
    -v, --verbose       Use verbose output

Additional help:
    -C help             Print codegen options
    -W help             Print 'lint' options and default settings
    --help -v           Print the full set of options rustc accepts

```
