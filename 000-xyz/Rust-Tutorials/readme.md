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

使变量变得"可变"（mutable）只需一个 mut 关键字。

常量是不可变的

变量的值可以"重新绑定"，但在"重新绑定"以前不能私自被改变，这样可以确保在每一次"绑定"之后的区域里编译器可以充分的推理程序逻辑。

虽然 Rust 有自动判断类型的功能，但有些情况下声明类型更加方便：

声明了 a 为无符号 64 位整型变量，如果没有声明类型，a 将自动被判断为有符号 32 位整型变量


重影（Shadowing）
重影的概念与其他面向对象语言里的"重写"（Override）或"重载"（Overload）是不一样的。

重影就是刚才讲述的所谓"重新绑定"，之所以加引号就是为了在没有介绍这个概念的时候代替一下概念。

重影就是指变量的名称可以被重新使用的机制：

```rs

fn main () {
  println!("🦀 shadowing 重影，let 重新声明");
  // 变量
  let x = 5;
  let x = x + 1;
  let x = x * 2;
  println!("\nvalue = {}", x);
  // value = 12
}

```

重影与可变变量的赋值不是一个概念，
重影是指用同一个名字重新代表另一个变量实体，其`类型`、`可变属性`和`值`都可以变化。
但`可变变量赋值`仅能发生`值`的变化。

```rs

fn main () {
  println!("🦀 shadowing 重影，let 重新声明");
  // 变量重影
  let shadowing = 1;
  // let shadowing = shadowing + "2";
  let shadowing = &format!("shadowing is equal to {}", shadowing);
  println!("\shadowing = {}", shadowing);
  // 
  // 可变变量赋值
  let mut str = "123";
  // str = str.len();
  str = "2022";
  println!("\nstring = {}", str);
}

```

这段程序会出错：不能给字符串变量赋整型值。


