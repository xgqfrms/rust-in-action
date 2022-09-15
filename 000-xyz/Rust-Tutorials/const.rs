
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
  // const con: i32 = 123;
  // ^^^ help: convert the identifier to upper case: `CON`
  // let con = 456;
  // ❌ con = 456; ^^^ interpreted as a constant pattern, not a new variable
  // help: introduce a variable instead: `con_var`
  // println!("🦀 const = {}", con);
  // 常量 ，全部大写 ✅
  const CONST: i32 = 123;
  println!("🦀 const = {}", CONST);

  // 这里声明了 uInt64 为无符号 64 位整型类型变量;
  // 如果没有声明类型，uInt64 将自动被判断为有符号 32 位整型变量
  // let uInt64: u64 = 123;
  // ⚠️ uInt64: u64 = 123;
  // ^^^^^^ help: convert the identifier to snake case: `u_int64`
  // println!("\n🦀 uInt64 = {}", uInt64);

  // let u_Int64: u64 = 123;
  // println!("\n🦀 u_Int64 = {}", u_Int64);
  // ⚠️ u_Int64: u64 = 123;
  // ^^^^^^^ help: convert the identifier to snake case (notice the capitalization): `u_int64`

  // 变量，全部小写，使用下划线连字符 ✅
  let u_int64: u64 = 123;
  println!("\n🦀 u_int64 = {}", u_int64);

  // 没有声明类型，自动推断为有符号 32 位整型变量
  let int32 = 123;
  // let int32: i32 = 123;
  println!("\n🦀 int32 = {}", int32);
}

/*

$ rustc ./const.rs && ./const

*/
