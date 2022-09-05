pub fn add(left: usize, right: usize) -> usize {
  // {} 插值，占位符
  println!("\n🦀 left = {}, right = {}", left, right);
  println!("🦀🦀 left + right = {}", left + right);
  println!("\n🦀🦀🦀 left = {}, right = {}, left + right = {}", left, right, left + right);
  left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}

