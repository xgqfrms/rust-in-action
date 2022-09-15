
fn main () {
  // print
  print!("print 🦀");
  let year = 2022;
  print!("this year is {}", year);
  // 使用 \n 修复，末尾的 % 问题 ✅
  print!("\n");
}

/*

$ rustc ./print.rs && ./print
// print 🦀%

// ??? Rust print! 这么多输出一个 %
*/

