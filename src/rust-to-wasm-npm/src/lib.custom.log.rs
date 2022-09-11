// 引入 wasm_bindgen::prelude 的全部模块 *
use wasm_bindgen::prelude::*;

// 使用 wasm-bindgen 在 Rust 与 JavaScript 之间通信

// js_namespace = console, js_name = log
// #[wasm_bindgen]
// extern "C" {
//   // Use `js_namespace` here to bind `console.log(..)` instead of just `log(..)`
//   #[wasm_bindgen(js_namespace = console)]
//   fn log(s: &str);
//   // fn console_log(s: &str);
//   // Uncaught (in promise) TypeError: `console.console_log` is not a function  ❌

//   // The `console.log` is quite polymorphic, so we can bind it with multiple signatures.
//   // Note that we need to use `js_name` to ensure we always call `log` in JS.
//   #[wasm_bindgen(js_namespace = console, js_name = log)]
//   fn log_u32(a: u32);

//   // Multiple arguments too!
//   #[wasm_bindgen(js_namespace = console, js_name = log)]
//   fn log_strs(a: &str, b: &str);
// }


// #[wasm_bindgen]
// extern "C" {
//   // Use `js_namespace` here to bind `console.log(..)` instead of just `log(..)`
//   // 自定义 js name ❓ js_name `console_log` 不是 js 中真实存在的 ❌
//   #[wasm_bindgen(js_namespace = console, js_name = console_log)]
//   // fn log(s: &str);
//   fn console_log(s: &str);
//   // rust_to_wasm_npm.js:138 Uncaught (in promise) TypeError: `console.console_log` is not a function ❌

//   // The `console.log` is quite polymorphic, so we can bind it with multiple signatures.
//   // Note that we need to use `js_name` to ensure we always call `log` in JS.
//   #[wasm_bindgen(js_namespace = console, js_name = log)]
//   fn log_u32(a: u32);

//   // Multiple arguments too!
//   #[wasm_bindgen(js_namespace = console, js_name = log)]
//   fn log_strs(a: &str, b: &str);
// }

#[wasm_bindgen]
extern "C" {
  // Use `js_namespace` here to bind `console.log(..)` instead of just `log(..)`
  // 自定义 js name ✅ js_namespace 和 js_name 必须是 js 中真实存在的 ✅
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  // fn log(s: &str);
  fn console_log(s: &str);

  // The `console.log` is quite polymorphic, so we can bind it with multiple signatures.
  // Note that we need to use `js_name` to ensure we always call `log` in JS.
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_u32(a: u32);

  // Multiple arguments too!
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_strs(a: &str, b: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
  // &format!， 字符串格式化，即字符串插值
  let string: &str = &format!("Hello, {}!", name);
  // log(string);
  console_log("自定义 js name ✅ js_namespace 和 js_name 必须是 js 中真实存在的 ✅\n");
  console_log(string);
}

#[wasm_bindgen]
pub fn greet_u32(num: u32) {
  // &format!， 字符串格式化，即字符串插值
  log_u32(num);
}

// #[wasm_bindgen]
// pub fn greet_u32(num: &u32) {
//   // &format!， 字符串格式化，即字符串插值
//   log_u32(num);
// }

/*

the trait `RefFromWasmAbi` is not implemented for `u32`

= help: the following other types implement trait `RefFromWasmAbi`:
             JsValue
             [f32]
             [f64]
             [i16]
             [i32]
             [i64]
             [i8]
             [isize]
           and 6 others
= note: this error originates in the attribute macro `wasm_bindgen` (in Nightly builds, run with -Z macro-backtrace for more info)

*/

#[wasm_bindgen]
pub fn greet_strs(str1: &str, str2: &str) {
  // &format!， 字符串格式化，即字符串插值
  let string1: &str = &format!("Hello, {}!", str1);
  let string2: &str = &format!("\nThis year is {}!", str2);
  log_strs(string1, string2);
}

