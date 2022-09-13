# wasm-pack All In One

`wasm-pack` 📦✨ your favorite `rust` -> `wasm` workflow tool!

```sh
# install wasm-pack
$ curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

#or 
$ cargo install wasm-pack
#or 
$ npm install -g wasm-pack
#or 
$ yarn global add wasm-pack

```

```sh
$ wasm-pack -h
wasm-pack 0.10.3
The various kinds of commands that `wasm-pack` can execute

USAGE:
    wasm-pack [FLAGS] [OPTIONS] <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -q, --quiet      No output printed to stdout
    -V, --version    Prints version information
    -v, --verbose    Log verbosity is based off the number of v used

OPTIONS:
        --log-level <log-level>    The maximum level of messages that should be logged by wasm-pack. [possible values:
                                   info, warn, error] [default: info]

SUBCOMMANDS:
    build      🏗️  build your npm package!
    help       Prints this message or the help of the given subcommand(s)
    login      👤  Add an npm registry user account! (aliases: adduser, add-user)
    new        🐑 create a new project with a template
    pack       🍱  create a tar of your npm package but don't publish!
    publish    🎆  pack up your npm package and publish!
    test       👩‍🔬  test your wasm!

```

https://rustwasm.github.io/wasm-pack/installer/


> MDN

使用 Rust 的 npm 包构建工具 wasm-pack 来构建一个 npm 包;
这个包只包含 WebAssembly 和 JavaScript 代码，以便包的用户无需安装 Rust 就能使用;
他们甚至不需要知道这里包含 WebAssembly！

```sh
# 要构建我们的包，我们需要一个额外工具 wasm-pack
# 它会帮助我们把我们的代码编译成 WebAssembly 并制造出正确的 npm 包。
$ cargo install wasm-pack
# Installed package `wasm-pack v0.10.3` (executable `wasm-pack`)

```

https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust_to_wasm




```sh
# wasm-pack / wapm-cli
$ wapm install cowsay

$ wapm run cowsay Hello World!
$ wapm run cowsay Hello World 2!

```

## docs

https://rustwasm.github.io/docs/wasm-pack/

