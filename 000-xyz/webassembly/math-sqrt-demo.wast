;; wat 是 WebAssembly 有一个基于 S-表达式的文本表示形式
;; wast 是用于测试的 wat, 是 wat 的超集
;; https://mbebenita.github.io/WasmExplorer/

(module
    (export "sqrt" (func $sqrt))
    (func $sqrt
        (param $num f32)
        (result f32)
        ;; (f32.sqrt (get_local $num))
        (f32.sqrt (local.get $num))
    )
)

