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

```sh
$ rustup update
$ rustup --version

$ rustup -V
# rustup 1.25.1 (bb60b1e89 2022-07-12)
# info: This is the version for the rustup toolchain manager, not the rustc compiler.
# info: The currently active `rustc` version is `rustc 1.63.0 (4b91a6ea7 2022-08-08)`

$ rustc -V
# rustc 1.63.0 (4b91a6ea7 2022-08-08)

```

https://www.rust-lang.org/tools/install

https://sh.rustup.rs


## rust docs

```sh
# local rust docs
$ rustup doc

```

Rust Documentation

`file:///Users/xgqfrms-mbp/.rustup/toolchains/stable-x86_64-apple-darwin/share/doc/rust/html/index.html`

The Rust Programming Language

`file:///Users/xgqfrms-mbp/.rustup/toolchains/stable-x86_64-apple-darwin/share/doc/rust/html/book/index.html`



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

## demos

```rs
// main.rs

fn main() {
  println!("Hello, world!");
}

```

```sh
$ cd src/hello_world/

# rust compiler
$ rustc main.rs
# -o === output
$ rustc main.rs -o demo
# 可执行文件，跨平台
$ ./main

```

## Rust Playground

https://play.rust-lang.org/
