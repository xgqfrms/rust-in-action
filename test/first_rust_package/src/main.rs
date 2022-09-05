fn main() {
    println!("🦀 Hello, world!");
    println!("\n$ rustc -V");
    println!("rustc 1.63.0 (4b91a6ea7 2022-08-08)");
    // 调用 function
    add(1, 2);
}

// fn 定义 function
fn add(left: usize, right: usize) -> usize {
  // {} 插值，占位符
  println!("\n🦀 left = {}, right = {}", left, right);
  println!("🦀🦀 left + right = {}", left + right);
  println!("\n🦀🦀🦀 left = {}, right = {}, left + right = {}", left, right, left + right);
  left + right
}
