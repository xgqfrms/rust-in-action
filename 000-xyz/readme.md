# Rust & WebAssembly & Bash

[Rust-Tutorials](./Rust-Tutorials/readme.md)

[WebAssembly-Tutorials](./WebAssembly-Tutorials/readme.md)


## rustup


```sh
$ rustup target -h
# $ rustup target --help
rustup-target 
Modify a toolchain's supported targets

USAGE:
    rustup target <SUBCOMMAND>

FLAGS:
    -h, --help    Prints help information

SUBCOMMANDS:
    list      List installed and available targets
    add       Add a target to a Rust toolchain
    remove    Remove a target from a Rust toolchain

```


```sh
# 查看支持的 WebAssembly 开发环境（目标平台）
$ rustup target list | grep wasm

# wasm32-unknown-emscripten
# wasm32-unknown-unknown
# wasm32-wasi
```

LLVM 约定的三元格式组：CPU 架构、供应商、操作系统
32 位 CPU，供应商，操作系统
C/C++ 环境 (emscripten)


```sh
# 安装 WebAssembly 开发环境（目标平台）
$ rustup target add wasm32-wasi
$ rustup target add wasm32-unknown-unknown
$ rustup target add wasm32-unknown-emscripten

$ rustup target list | grep wasm 
# wasm32-unknown-emscripten (installed)
# wasm32-unknown-unknown (installed)
# wasm32-wasi (installed)

```



## wasmer 虚拟机

> Wasmer runtime

```sh
$ curl https://get.wasmer.io -sSfL | sh
# https://github.com/wasmerio/wasmer/releases/download/2.3.0/wasmer-darwin-amd64.tar.gz

$ wasmer -h
# zsh: command not found: wasmer

```

> wasmer `环境变量`配置

```sh
# open & edit config
$ code .zshrc

$ vim .zshrc
.zshrc
```

```code
# WebAssembly & Rust
# /Users/xgqfrms-mbp/.wasmer/bin
export PATH="$PATH:/Users/xgqfrms-mbp/.wasmer/bin:$PATH"

```

```sh
# update
$ source ~/.zshrc

```

https://wasmer.io/

https://www.cnblogs.com/xgqfrms/p/16683271.html

## WAPM

> WebAssembly Package Manager

```sh
# install package
$ wapm install cowsay

$ wapm run cowsay Hello World 2022!

```

WebAssembly apps and libraries

https://wapm.io/



## VSCode

tasks.json 和 launch.json

https://www.runoob.com/rust/cargo-tutorial.html
