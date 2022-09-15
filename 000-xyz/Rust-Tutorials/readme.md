# Rust Tutorials

> zh-Hans

https://www.rust-lang.org/zh-CN/tools/install

https://www.rust-lang.org/zh-CN/learn/get-started


## Rust Playground

> REPL

https://play.rust-lang.org/



## 菜鸟教程

https://www.runoob.com/rust/rust-tutorial.html

Rust 输出文字的方式主要有两种：`println!()` 和 `print!()`

```rs

fn main () {
  // print
  print!("print 🦀");
}

/*

$ rustc ./print.rs && ./print

*/


```

```rs
fn main () {
  // println! === print! + \n
  println!("println! === print! + \\n 🦀");
}


/*

$ rustc ./println.rs && ./println

*/
```

## Rust 基础语法

变量，基本类型，函数，注释和控制流，这些几乎是每种编程语言都具有的编程概念。

Rust 是强类型语言，但具有自动判断变量类型的能力。

let 不可变变量

```rs
let a = 123;

// 以下三行代码都是被禁止的：
a = "abc";
a = 4.56; 
a = 456;

// 第一行的错误在于当声明 a 是 123 以后，a 就被确定为整型数字，不能把字符串类型的值赋给它。
// 第二行的错误在于自动转换数字精度有损失，Rust 语言不允许精度有损失的自动数据类型转换。
// 第三行的错误在于 a 不是个可变变量。

```

