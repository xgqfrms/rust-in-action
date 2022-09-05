# Cargo

https://doc.rust-lang.org/cargo/getting-started/first-steps.html

```sh
# generate a new package
$ cargo new hello_world

# Cargo defaults to --bin to make a binary program. To make a library, we would pass --lib, instead.
$ cargo new first_rust_package --bin
# $ cargo new first_rust_package

# --lib
$ cargo new first_rust_lib --lib

```

## Cargo.toml (manifest)

> package/library template

```toml
[package]
name = "package_name"
# name = "library_name"
version = "0.0.1"
edition = "2022"
# custom config ✅
author = "xgqfrms"
editor = "vscode"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
# ferris-says = "0.2.1"


```


## build & run

```sh
$ cd first_rust_package 

# build package
$ cargo build

# run package
$ ./target/debug/first_rust_package


# 🚀 compile and run
$ cargo run

```
