// fixed bug
extern crate ferris_says;

use ferris_says::say;
// from the previous step
use std::io::{stdout, BufWriter};

fn main() {
  let stdout = stdout();
  let message = String::from("🦀 Hello World!");
  let width = message.chars().count();

  let mut writer = BufWriter::new(stdout.lock());
  say(message.as_bytes(), width, &mut writer).unwrap();
}

/*
extern crate ferris_says;

use ferris_says::say;
use std::io::{ stdout, BufWriter };

fn main() {
    let out = b"Hello fellow Rustaceans!";
    let width = 24;

    let mut writer = BufWriter::new(stdout());
    say(out, width, &mut writer).unwrap();
}
*/
