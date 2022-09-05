# Rust & WebAssembly

> Rust 🦀 and WebAssembly 🕸

https://rustwasm.github.io/docs/book/

## Rust

https://doc.rust-lang.org/book/

https://doc.rust-lang.org/stable/rust-by-example/

https://github.com/rust-lang/rustlings/

https://www.rust-lang.org/zh-CN/learn
https://kaisery.github.io/trpl-zh-cn/

## WebAssembly

http://webassembly.org/

https://developer.mozilla.org/en-US/docs/WebAssembly

https://hacks.mozilla.org/category/webassembly/


> wat demo

```wat
;; 编译器

;; C/C++ => WASM (.c/.cpp => .wasm)
;; https://mbebenita.github.io/WasmExplorer/

;; WAT/WAST => WASM (.wat/.wast => .wasm)
;; https://webassembly.github.io/wabt/demo/wat2wasm/

;; Rust => WASM (.rs => .wasm)
;; https://github.com/yewstack/yew
;; https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm


;; WebAssembly text format
;; To enable WebAssembly to be read and edited by humans, there is a textual representation of the wasm binary format.
;; 为了使 WebAssembly 能够被人类阅读和编辑，有一个 wasm 二进制格式的文本表示。

;; js's Math.sqrt(4) === 2
;; wat define method `sqrt`
(module
    (export "sqrt" (func $sqrt))
    (func $sqrt
        (param $num f32)
        (result f32)
        ;; (f32.sqrt (get_local $num))
        (f32.sqrt (local.get $num))
    )
)

```


## refs

https://www.cnblogs.com/xgqfrms/p/16656480.html

https://www.cnblogs.com/xgqfrms/p/12702549.html
