;; js Math.sqrt()
(module
  (export "sqrt" (func $sqrt))
  (func $sqrt
    (param $num f32)
    (result f32)
    (f32.sqrt(local.get $num))
  )
)

