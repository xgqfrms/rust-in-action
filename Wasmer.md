# Wasmer All In One




https://wasmer.io/

https://www.cnblogs.com/xgqfrms/p/16683271.html

> Wasmer runtime /  wasmer 虚拟机

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


```sh

$ wasmer -V
# wasmer 2.3.0

$ wasmer -h
wasmer 2.3.0
Wasmer Engineering Team <engineering@wasmer.io>
WebAssembly standalone runtime.

USAGE:
    wasmer <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    cache          Wasmer cache
    compile        Compile a WebAssembly binary
    config         Get various configuration information needed to compile programs which use Wasmer
    create-exe     Compile a WebAssembly binary into a native executable
    help           Prints this message or the help of the given subcommand(s)
    inspect        Inspect a WebAssembly file
    run            Run a WebAssembly file. Formats accepted: wasm, wat
    self-update    Update wasmer to the latest version
    validate       Validate a WebAssembly binary
    wast           Run spec testsuite

```


```sh
$ cargo new wasmer_demo
# Created binary (application) `wasmer_demo` package

$ cd wasmer_demo 

$ cargo run wasmer_demo

# 生成 WebAssembly
$ cargo build --target=wasm32-wasi

# 运行 Rust
# $ cargo run
# $ cargo run hello_world_package

# 运行 WebAssembly
$ wasmer run target/wasm32-wasi/debug/wasmer_demo.wasm
# hello world 🦀

```

```sh
# Run a WebAssembly file. Formats accepted: wasm, wat
$ wasmer run target/wasm32-wasi/debug/wasmer_demo.wasm

# $ wasmer run js-math-sqrt.wat
# error: failed to run `js-math-sqrt.wat`
# ╰─▶ 1: No export `_start` found in the module.
#        Similar functions found: `sqrt`.
#        Try with: wasmer js-math-sqrt.wat -i sqrt 

# 调用导出方法，传递参数
$ wasmer run js-math-sqrt.wat -i sqrt 4
# 2
$ wasmer run js-math-sqrt.wast -i sqrt 4
# 2
$ wasmer run js-math-sqrt.wasm -i sqrt 4
# 2

```

```sh
# 当前路径下不存在 ./cowsay.wasm 文件
$ wasmer run cowsay.wasm Hello World!

# error: failed to run `cowsay.wasm`
# ╰─▶ 1: No such file or directory (os error 2)
```
