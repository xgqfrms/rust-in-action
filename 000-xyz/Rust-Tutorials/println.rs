
fn main () {
  // println! === print! + \n
  println!("println! === print! + \\n 🦀");
  let year = 2022;
  println!("this year is {}", year);
  // 转义符 {}
  println!("转义符 = {{}}");
  println!("转义符 = {{\\n}}");
  // ✅ 转义符 = {\n}
  // println!("转义符 = {\n}");
  // ❌ error: aborting due to previous error
  // println!("转义符 = {\n");
  // ❌ ^ expected `'}'` in format string
  // println!("转义符 = \{ \}");
  // ❌ \ unknown character escape
}


/*

$ rustc ./println.rs && ./println
// println! === print! + \n 🦀

*/
