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

`cargo --version`

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
