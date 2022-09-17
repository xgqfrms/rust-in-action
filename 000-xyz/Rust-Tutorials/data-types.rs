
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
  println!("🦀 数据类型");
  let int8: i8 = -1;
  let u_int8: u8 = 1;
  println!("🦀 int8 = {}", int8);
  println!("🦀 u_int8 = {}", u_int8);

  let int16: i16 = -1;
  let u_int16: u16 = 1;
  println!("🦀 int16 = {}", int16);
  println!("🦀 u_int16 = {}", u_int16);

  let int32: i32 = -1;
  let u_int32: u32 = 1;
  println!("🦀 int32 = {}", int32);
  println!("🦀 u_int32 = {}", u_int32);

  let int64: i64 = -1;
  let u_int64: u64 = 1;
  println!("🦀 int64 = {}", int64);
  println!("🦀 u_int64 = {}", u_int64);

  let int128: i128 = -1;
  let u_int128: u128 = 1;
  println!("🦀 int128 = {}", int128);
  println!("🦀 u_int128 = {}", u_int128);

  // arch(32/64) isize usize
  let int_size: isize = -1;
  let u_int_size: usize = 1;
  println!("🦀 arch(32/64) int_size = {}", int_size);
  println!("🦀 arch(32/64) u_int_size = {}", u_int_size);
}

/*

$ rustc ./data-types.rs && ./data-types

*/
