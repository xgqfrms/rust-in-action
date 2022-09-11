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
#[wasm_bindgen]
extern {
  // 函数签名 (参数名：参数类型)
  pub fn alert(s: &str);
}

// 生成 JavaScript 可以调用的 Rust 函数
// #[] => 属性, 修改下一条语句 fn; 即，这个 Rust 函数能够被 JavaScript 调用
// public => pub
#[wasm_bindgen]
pub fn greet(name: &str) {
  // &format!， 字符串格式化，即字符串插值
  alert(&format!("Hello, {}!", name));
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
