# Cargo All In One

Cargo: the Rust build tool and package manager

When you install `rustup` you’ll also get the latest stable version of the Rust build tool and package manager, also known as `Cargo`. 
Cargo does lots of things:

* build your project with `cargo build`
* run your project with `cargo run`
* test your project with `cargo test`
* build documentation for your project with `cargo doc`
* publish a library to crates.io with `cargo publish`

To test that you have Rust and Cargo installed, you can run this in your terminal of choice:

```sh
$ cargo -V
$ cargo --version
# cargo 1.63.0 (fd9c4297c 2022-07-01)

```

```sh
$ cargo -h
Rust's package manager

USAGE:
    cargo [+toolchain] [OPTIONS] [SUBCOMMAND]

OPTIONS:
    -V, --version               Print version info and exit
        --list                  List installed commands
        --explain <CODE>        Run `rustc --explain CODE`
    -v, --verbose               Use verbose output (-vv very verbose/build.rs output)
    -q, --quiet                 Do not print cargo log messages
        --color <WHEN>          Coloring: auto, always, never
        --frozen                Require Cargo.lock and cache are up to date
        --locked                Require Cargo.lock is up to date
        --offline               Run without accessing the network
        --config <KEY=VALUE>    Override a configuration value
    -Z <FLAG>                   Unstable (nightly-only) flags to Cargo, see 'cargo -Z help' for
                                details
    -h, --help                  Print help information

Some common cargo commands are (see all commands with --list):
    build, b    Compile the current package
    check, c    Analyze the current package and report errors, but don't build object files
    clean       Remove the target directory
    doc, d      Build this package's and its dependencies' documentation
    new         Create a new cargo package
    init        Create a new cargo package in an existing directory
    add         Add dependencies to a manifest file
    run, r      Run a binary or example of the local package
    test, t     Run the tests
    bench       Run the benchmarks
    update      Update dependencies listed in Cargo.lock
    search      Search registry for crates
    publish     Package and upload this package to the registry
    install     Install a Rust binary. Default location is $HOME/.cargo/bin
    uninstall   Uninstall a Rust binary

See 'cargo help <command>' for more information on a specific command.

```

https://www.rust-lang.org/learn/get-started

https://doc.rust-lang.org/cargo/getting-started/first-steps.html

```sh
# generate a new package
$ cargo new hello_world

# Cargo defaults to --bin to make a binary program. To make a library, we would pass --lib, instead.
$ cargo new first_rust_package --bin
# $ cargo new first_rust_package

# --lib
$ cargo new first_rust_library --lib

```

## Cargo.toml (manifest)

> package/library template

```toml
[package]
name = "package_name"
# name = "library_name"
version = "0.0.1"
edition = "2021"
# edition = "2022"
# custom config ✅
author = "xgqfrms"
editor = "vscode"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
# ferris-says = "0.2.1"


```

## crates

Rust 的 crate 包管理器; 类似 Node.js 的 npm 包管理器;

> cowsay mascot

https://crates.io/search?q=ferris-says

https://crates.io/crates/ferris-says

```toml
[dependencies]
# rust cowsay
ferris-says = "0.2.1"

```

```rs
// use the say function that the ferris-says crate exports for us.
use ferris_says::say;

```

```rs
// import the crate ferris_says ❌ no need anymore ✅
// extern crate ferris_says;

use ferris_says::say;
use std::io::{ stdout, BufWriter };

fn main() {
    let out = b"Hello fellow Rustaceans!";
    let width = 24;
    let mut writer = BufWriter::new(stdout());
    say(out, width, &mut writer).unwrap();
}

```



## build & run

> rust package ✅

```sh
$ cd first_rust_package 

# build package
$ cargo build

# run package
$ ./target/debug/first_rust_package


# 🚀 compile and run
$ cargo run

```

> rust library ❌

```sh
$ cd first_rust_library

# 🚀 compile and run
$ cargo run
# error: a bin target must be available for `cargo run` ❌
```

## cargo & `Cargo.toml`

> cargo run 入口文件 `src/lib.rs` 或 `src/lib.rs`

```sh
$ cargo run main.rs
error: could not find `Cargo.toml` in `/Users/xgqfrms-mbp/Documents/GitHub/rust-in-action/src/hello_world` or any parent directory

$ ✗ cargo run main.rs
error: failed to parse manifest at `/Users/xgqfrms-mbp/Documents/GitHub/rust-in-action/src/hello_world/Cargo.toml`

Caused by:
  no targets specified in the manifest
  either `src/lib.rs`, `src/main.rs`, a [lib] section, or [[bin]] section must be presen

```


## wasm-pack

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

https://crates.io/

https://crates.io/search?q=wasm-pack

> Your favorite Rust → Wasm workflow tool!

https://crates.io/crates/wasm-pack

https://crates.io/crates/wasm-bindgen


```rs
// ✅ Cargo.toml 中 dependencies 配置后，无需再次手动导入外部包 external crate

// 导入外部包 external crate
// extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

// Import the `window.alert` function from the Web.
#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}

// Export a `greet` function from Rust to JavaScript, that alerts a
// hello message.
#[wasm_bindgen]
pub fn greet(name: &str) {
  alert(&format!("Hello, {}!", name));
}

```

```js
import { greet } from "./hello_world";

greet("World!");

```


```toml

[dependencies]
wasm-bindgen = "0.2.82"
# 配置后，无需再次手动导入外部包 external crate
# 即，可以省略 extern crate wasm_bindgen;

[lib]
crate-type = ["cdylib"]
# tells Rust to build a `cdylib` version of our package ???

```

https://doc.rust-lang.org/cargo/guide/

https://doc.rust-lang.org/reference/linkage.html

`--crate-type=cdylib`, `#![crate_type = "cdylib"]`
A dynamic system library will be produced. 
This is used when compiling a dynamic library to be loaded from another language. 
This output type will create `*.so` files on Linux, `*.dylib` files on macOS, and `*.dll` files on Windows.

将生成一个动态系统库。
这在编译要从另一种语言加载的动态库时使用。
此输出类型将在 Linux 上创建 `*.so` 文件，在 macOS 上创建 `*.dylib` 文件，在 Windows 上创建 `*.dll` 文件。

```sh
# build the package
$ wasm-pack build --target web

# wasm32-unknown-unknown => 纯 WebAssembly 模块
# rust-to-wasm-npm/target/wasm32-unknown-unknown/release/rust_to_wasm_npm.wasm

# Your wasm pkg is ready to publish at /rust-to-wasm-npm/pkg

```

1. Compiles your `Rust` code to `WebAssembly`.
2. Runs `wasm-bindgen` on that WebAssembly, generating a JavaScript file that `wraps up` that WebAssembly file `into a module` the browser can understand.
3. Creates a `pkg` directory and moves that JavaScript file and your WebAssembly code into it.
4. Reads your `Cargo.toml` and produces an equivalent `package.json`.
5. Copies your `README.md` (if you have one) into the package.

https://hacks.mozilla.org/2018/04/hello-wasm-pack/

压缩包大小，优化

https://rustwasm.github.io/book/game-of-life/code-size.html#shrinking-wasm-size

```js
  <script type="module">
    import init, { greet } from "./pkg/rust_to_wasm_npm.js";
    init().then(() => {
      greet("WebAssembly");
    });
  </script>
```

> rustwasm

```sh
# install wasm-pack
$ curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# or
$ cargo install wasm-pack

# or
$ npm install -g wasm-pack
# or
$ yarn global add wasm-pack

```

https://rustwasm.github.io/docs/book/

https://rustwasm.github.io/wasm-pack/installer/

https://rustwasm.github.io/book/game-of-life/setup.html

