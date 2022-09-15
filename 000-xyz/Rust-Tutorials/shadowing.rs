
/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2022-09-16
 * @modified
 *
 * @description
 * @link
 *
 */

fn main () {
  println!("🦀 shadowing 重影，let 重新声明");
  // 变量
  let x = 5;
  let x = x + 1;
  let x = x * 2;
  println!("\nvalue = {}", x);
  // value = 12
  test();
}

fn test () {
  println!("\n🦀 shadowing 重影 & let 重新声明");
  // 变量重影
  let shadowing = 1;
  // let shadowing = shadowing + "2";
  // ❌ str.len(); ^^^^^^^^^ expected `&str`, found `usize`
  // let shadowing = &(String::from("shadowing is equal to") + shadowing);
  // ❌ shadowing); ^^^^^^^^^ expected `&str`, found integer
  // let shadowing = &(String::from("shadowing is equal to") + String::from(shadowing));
  // ❌ String::from(shadowing)); ^^^^^^^^^^^ expected `&str`, found struct `String`
  // ❌ help: consider borrowing here: `&String::from(shadowing)`
  // let shadowing = &(String::from("shadowing is equal to") + &String::from(shadowing));
  // ❌  &String::from(shadowing)); ^^^^^^^^^^^^ the trait `From<{integer}>` is not implemented for `String`
  // let shadowing = &(String::from("shadowing is equal to") + &String::from(shadowing));
  // rust 数字专字符串
  // let shadowing = &format("shadowing is equal to {}", shadowing);
  // &format("shadowing is equal to {}", shadowing); ^^^^^^ not a function
  // help: use `!` to invoke the macro
  // help: consider importing this function instead
  // use `std::fmt::format`;
  let shadowing = &format!("shadowing is equal to {}", shadowing);
  println!("\nshadowing = {}", shadowing);
  //
  // 可变变量赋值, 类型不可以改变
  let mut str = "123";
  // str = str.len();
  // str.len(); ^^^^^^^^^ expected `&str`, found `usize`
  println!("\nstring = {}", str);
  str = "2022";
  println!("\nstring = {}", str);
}

/*

$ rustc ./shadowing.rs && ./shadowing

*/
