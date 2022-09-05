// if declared `ferris_says` as dependencies in `Cargo.toml` file
// it's no need import external crate `ferris_says` anymore ✅
// extern crate ferris_says;
// can't find crate ❌
use ferris_says::say;
use std::io::{stdout, BufWriter};

fn main() {
  println!("🦀 Hello, world!");
  println!("$ rustc -V");
  println!("rustc 1.63.0 (4b91a6ea7 2022-08-08)");
  // 调用 function
  add(1, 2);
  println!("\ncowsay 🐮");
  let stdout = stdout();
  // let message = String::from("Hello fellow Rustaceans!");
  let message = String::from("🦀 Hello Rust 🦀!");
  let width = message.chars().count();
  let mut writer = BufWriter::new(stdout.lock());
  say(message.as_bytes(), width, &mut writer).unwrap();
}


// fn 定义 function
fn add(left: usize, right: usize) -> usize {
  // {} 插值，占位符
  println!("\n🦀 left = {}, right = {}", left, right);
  println!("🦀🦀 left + right = {}", left + right);
  println!("🦀🦀🦀 left = {}, right = {}, left + right = {}", left, right, left + right);
  left + right
}
