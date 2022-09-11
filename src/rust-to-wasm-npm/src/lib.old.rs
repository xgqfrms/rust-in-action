// ✅ Cargo.toml 中 dependencies 配置后，无需再次手动导入外部包 external crate

// 导入外部包 external crate
// extern crate wasm_bindgen;

// 引入 wasm_bindgen::prelude 的全部模块 *
use wasm_bindgen::prelude::*;

// 使用 wasm-bindgen 在 Rust 与 JavaScript 之间通信

/*

wasm-pack 使用另一个工具 wasm-bindgen 来提供 JavaScript 和 Rust 类型之间的桥梁。
它允许 JavaScript 使用字符串调用 Rust API，或调用 Rust 函数来捕获 JavaScript 异常。

*/

// 从 Rust 调用 JavaScript 中的外部函数
// #[] => 属性, 修改下一条语句 extern; 即，告诉 rust 调用一些外部定义的函数, wasm-bindgen 知道如何找到这些函数
// #[wasm_bindgen]
// extern {
//   // 函数签名 (参数名：参数类型)
//   // pub fn alert(s: &str);
//   // let console_log = console.log;
//   // pub fn console_log(s: &str);
//   // pub fn console.log(s: &str);
//   pub fn console(s: &str);
// }


// js_namespace = console, js_name = log
#[wasm_bindgen]
extern "C" {
  // Use `js_namespace` here to bind `console.log(..)` instead of just `log(..)`
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);

  // The `console.log` is quite polymorphic, so we can bind it with multiple signatures.
  // Note that we need to use `js_name` to ensure we always call `log` in JS.
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_u32(a: u32);

  // Multiple arguments too!
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  // fn log_many(a: &str, b: &str);
  fn log_many_strs(a: &str, b: &str);
}

// js_namespace = console, js_name = console_log ???
// #[wasm_bindgen]
// extern "C" {
//   // Use `js_namespace` here to bind `console.log(..)` instead of just `log(..)`
//   #[wasm_bindgen(js_namespace = console)]
//   // fn log(s: &str);
//   fn console_log(s: &str);

//   // The `console.log` is quite polymorphic, so we can bind it with multiple signatures.
//   // Note that we need to use `js_name` to ensure we always call `log` in JS.
//   #[wasm_bindgen(js_namespace = console, js_name = log)]
//   // fn log_u32(a: u32);
//   fn console_log_u32(a: u32);

//   // Multiple arguments too!
//   #[wasm_bindgen(js_namespace = console, js_name = log)]
//   // fn log_many(a: &str, b: &str);
//   fn console_log_many_strs(a: &str, b: &str);
// }

// ❌  rust_to_wasm_npm.js:119 Uncaught (in promise) TypeError: `console.console_log` is not a function

// 生成 JavaScript 可以调用的 Rust 函数
// #[] => 属性, 修改下一条语句 fn; 即，这个 Rust 函数能够被 JavaScript 调用
// public => pub
#[wasm_bindgen]
pub fn greet(name: &str) {
  // &format!， 字符串格式化，即字符串插值
  // alert(&format!("Hello, {}!", name));
  // console_log(&format!("Hello, {}!", name));
  // console.log(&format!("Hello, {}!", name));
  // console(&format!("Hello, {}!", name));
  // const string: &str = &format!("Hello, {}!", name);

  let string: &str = &format!("Hello, {}!", name);
  // `name` non-constant value ❌
  log(string);
  log_u32(2022);
  let strings: &str = &format!("Hello, {}\nThis year is {}!", name, "2022");
  log_many_strs(strings, "xgqfrms");
  // console_log_many_strs(&format!("Hello, {}\nThis year is {}!", name, "2022"), "xgqfrms");

  // let string: &str = &format!("Hello, {}!", name);
  // // `name` non-constant value ❌
  // console_log(string);
  // console_log_u32(2022);
  // let strings: &str = &format!("Hello, {}\nThis year is {}!", name, "2022");
  // console_log_many_strs(strings, "xgqfrms");
  // // console_log_many_strs(&format!("Hello, {}\nThis year is {}!", name, "2022"), "xgqfrms");
}

// public => pub
pub fn add(left: usize, right: usize) -> usize {
  left + right
}


// 测试代码
// module => mod
/*

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn it_works() {
    let result = add(2, 2);
    // 断言
    assert_eq!(result, 4);
  }
}

*/
