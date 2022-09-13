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

## wasm-pack cli

```sh
$  wasm-pack new -h
wasm-pack-new 0.10.3
🐑 create a new project with a template

USAGE:
    wasm-pack new [OPTIONS] <name>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
    -m, --mode <mode>            Should we install or check the presence of binary tools. [possible values: no-install,
                                 normal, force] [default: normal]
    -t, --template <template>    The URL to the template [default: https://github.com/rustwasm/wasm-pack-template]

ARGS:
    <name>    The name of the project

```

```sh
$ wasm-pack build  -h
wasm-pack-build 0.10.3
🏗️  build your npm package!

USAGE:
    wasm-pack build [FLAGS] [OPTIONS] [ARGS]

FLAGS:
        --debug            Deprecated. Renamed to `--dev`
        --dev              Create a development build. Enable debug info, and disable optimizations
        --no-typescript    By default a *.d.ts file is generated for the generated JS file, but this flag will disable
                           generating this TypeScript file
    -h, --help             Prints help information
        --profiling        Create a profiling build. Enable optimizations and debug info
        --release          Create a release build. Enable optimizations and disable debug info
    -V, --version          Prints version information

OPTIONS:
    -m, --mode <mode>            Sets steps to be run. [possible values: no-install, normal, force] [default: normal]
    -d, --out-dir <out-dir>      Sets the output directory with a relative path [default: pkg]
        --out-name <out-name>    Sets the output file names. Defaults to package name
    -s, --scope <scope>          The npm scope to use in package.json, if any
    -t, --target <target>        Sets the target environment. [possible values: bundler, nodejs, web, no-modules]
                                 [default: bundler]

ARGS:
    <path>                The path to the Rust crate. If not set, searches up the path from the current directory
    <extra-options>...    List of extra options to pass to `cargo build`

```




## demos

<!-- /src/rust-to-wasm-npm -->

/src/wasm-pack-demo

```sh
# login, Add an npm registry user account! (aliases: adduser, add-user)
$ wasm-pack login
# $ wasm-pack adduser
# $ wasm-pack add-user

# new, create a new project with a template
$ wasm-pack new
# wasm-pack new <name> --mode <mode> --template <template>
$ wasm-pack new wasm-pack-demo

# build, build your npm package!
$ wasm-pack build
# create a release build. Enable optimizations and disable debug info 🚀
$ cd wasm-pack-demo && wasm-pack build --release


# publish, pack up your npm package and publish!
$ wasm-pack publish

```


```sh
$ wasm-pack build --release
# warning: be sure to add `/Users/xgqfrms-mbp/Library/Caches/.wasm-pack/.wasm-bindgen-cargo-install-0.2.83/bin` to your PATH to be able to run the installed binaries
# [INFO]: Optimizing wasm binaries with `wasm-opt`...
# [INFO]: Optional fields missing from Cargo.toml: 'description', 'repository', and 'license'. These are not necessary, but recommended
# [INFO]: ✨   Done in 2m 11s
# [INFO]: 📦   Your wasm pkg is ready to publish at /Users/xgqfrms-mbp/Documents/GitHub/rust-in-action/src/wasm-pack-demo/pkg.

```

## docs

This tool seeks to be a one-stop shop for building and working with rust- generated WebAssembly that you would like to interop with JavaScript, in the browser or with Node.js. 
`wasm-pack` helps you build rust-generated WebAssembly packages that you could publish to the npm registry, or otherwise use alongside any javascript packages in workflows that you already use, such as `webpack`.

该工具旨在成为构建和使用 rust 生成的 WebAssembly 的一站式商店，您希望与 JavaScript、浏览器或 Node.js 进行互操作。
`wasm-pack` 帮助您构建 rust 生成的 WebAssembly 包，您可以将其发布到 npm 注册表，或者与您已经使用的工作流中的任何 javascript 包一起使用，例如 webpack。

https://rustwasm.github.io/docs/wasm-pack/

https://rustwasm.github.io/wasm-pack/book/

