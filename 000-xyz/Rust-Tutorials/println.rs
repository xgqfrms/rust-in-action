
fn main () {
  // println! === print! + \n
  println!("println! === print! + \\n 🦀");
  let year = 2022;
  println!("this year is {}", year);
  // const name = "xgqfrms";
  // const age = 18;
  // ❌ ^^^^ help: provide a type for the constant: `name: &str`
  // ❌ ^^^^ help: provide a type for the constant: `age: i32`
  let name = "xgqfrms";
  let age = 18;
  // 按照参数顺序插值 ✅
  println!("\nmy xgqfrms is {}, my alias is also {}, my age is {}", name, name, age);
  // index & 参数顺序，混合插值 ❌
  // println!("\nmy xgqfrms is {0}, my alias is also {0}, my age is {}", name, age);
  // ❌ formatting specifier missing & age^^^ argument never used
  // 按照参数 index 插值 ✅
  println!("\nmy xgqfrms is {0}, my alias is also {0}, my age is {1}", name, age);
  println!("\nmy age is {1}, my xgqfrms is {0}, my alias is also {0}\n", name, age);
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
