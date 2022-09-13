;; js Math.sqrt()
(module
  (export "sqrt" (func $sqrt))
  (func $sqrt
    (param $num f32)
    (result f32)
    ;; local.get ✅ WebAssembly Specification
    ;; 执行 f32.sqrt，传参
    (f32.sqrt(local.get $num))
  )
)

