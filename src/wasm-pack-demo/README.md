# wasm-pack-demo

```sh
# new, create a new project with a template
$ wasm-pack new
$ wasm-pack new -h
# wasm-pack new <name> --mode <mode> --template <template>

# build, build your npm package!
$ wasm-pack build
$ wasm-pack build -h
```

```sh
# create a new project template
$ wasm-pack new wasm-pack-demo

# create a release build. Enable optimizations and disable debug info 🚀
$ cd wasm-pack-demo && wasm-pack build --release

# 查看 npm package
$ ls pkg
```


## Cargo.toml

```toml
# 配置 npm package 的信息
[package]
name = "wasm-pack-demo"
version = "0.0.1"
authors = ["xgqfrms <xgqfrms@outlook.com>"]
description = "wasm-pack-demo, with rust, wasm-pack, npm 🦀 📦 🚀"
repository = "https://github.com/xgqfrms/rust-in-action"
license = "MIT"

# Rust / WebAssembly ??? version
edition = "2021"
# custom config ✅
author = "xgqfrms"
editor = "vscode"

```

> `package.json`

```json
{
  "name": "wasm-pack-demo",
  "collaborators": [
    "xgqfrms <xgqfrms@outlook.com>"
  ],
  "description": "wasm-pack-demo, with rust, wasm-pack, npm 🦀 📦 🚀",
  "version": "0.0.1",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/xgqfrms/rust-in-action"
  },
  "files": [
    "wasm_pack_demo_bg.wasm",
    "wasm_pack_demo.js",
    "wasm_pack_demo_bg.js",
    "wasm_pack_demo.d.ts"
  ],
  "module": "wasm_pack_demo.js",
  "types": "wasm_pack_demo.d.ts",
  "sideEffects": false
}

```


## `wasm-pack` custom template

```sh
# wasm-pack new <name> --mode <mode> --template <template>

# default template
$ wasm-pack new wasm-pack-default-template
$ wasm-pack new wasm-pack-default-template --template https://github.com/rustwasm/wasm-pack-template

# custom template
$ wasm-pack new wasm-pack-custom-template --template https://github.com/xgqfrms/wasm-pack-template
# $ wasm-pack new wasm-pack-custom-template --mode normal --template https://github.com/xgqfrms/wasm-pack-template

```

https://github.com/xgqfrms/wasm-pack-template

https://github.com/rustwasm/wasm-pack-template


### `cargo generate`

https://github.com/ashleygwilliams/cargo-generate

```sh
$ cargo generate --git https://github.com/rustwasm/wasm-pack-template.git --name my-project

$ cd my-project && wasm-pack build

$ wasm-pack test --headless --firefox

$ wasm-pack publish

```
