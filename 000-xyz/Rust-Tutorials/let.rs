
/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2022-09-15
 * @modified
 *
 * @description
 * @link
 *
 */

fn main () {
  let var = 123;

  // 以下三行代码都是被禁止的：
  var = "abc";
  var = 4.56;
  var = 456;

  // 第一行的错误在于当声明 var 是 123 以后，var 就被确定为整型数字，不能把字符串类型的值赋给它。
  // 第二行的错误在于自动转换数字精度有损失，Rust 语言不允许精度有损失的自动数据类型转换。
  // 第三行的错误在于 var 不是个可变变量。
  println!("println 🦀 {var}", var);
}

/*

$ rustc ./let.rs && ./let

*/
