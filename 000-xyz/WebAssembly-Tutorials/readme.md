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


## demos

> wat 

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


```js

// IIFE
(() => {
  // const WebA_URL = `https://cdn.xgqfrms.xyz/webassembly/math-sqrt-demo.wasm`;
  const WebA_URL = `./math-sqrt-demo.wasm`;
  const ThrowErrorInfo = () => {throw new Error(`fetch WASM failed!`)};
  fetch(`${WebA_URL}`)
  .then(res => res.ok ? res.arrayBuffer() : ThrowErrorInfo())
  // .then(bytes => WebAssembly.compile(bytes))
  .then(bytes => {
    test(bytes);
    console.log(`🚀 bytes =`, bytes);
    // ArrayBuffer(65)
    const module = WebAssembly.compile(bytes);
    // async / await: WebAssembly.compile
    console.log(`👻 module =`, module);
    // Promise {<pending>}
    // ⚠️ ⏰ 编译
    return WebAssembly.compile(bytes);
  })
  // .then(module => WebAssembly.instantiate(module))
  .then(module => {
    console.log(`👻👻 module =`, module);
    // Module {}
    // async / await: WebAssembly.instantiate
    const instance = WebAssembly.instantiate(module);
    console.log(`✅✅ instance =`, instance);
    // Promise {<fulfilled>: Instance}
    return WebAssembly.instantiate(module);
  })
  // .then(instance => window.WebAssembly.Sqrt = instance.exports.sqrt);
  .then(instance => {
    console.log(`✅✅✅ instance =`, instance);
    console.log(`instance.exports =`, instance, instance.exports);
    // console.log(`instance.instance.exports =`, instance.instance.exports);
    // app.js:12 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'exports') ❌
    if(!window.WA) {
      window.WA = {};
      window.WA.sqrt = instance.exports.sqrt;
      console.log(`window.WA.sqrt(4) =`, window.WA.sqrt(4), window.WA.sqrt(4) === 2 ? `✅` : `❌`);
    }
    // window.WebAssembly
    const result = instance.exports.sqrt(4);
    console.log(`sqrt(4)'s result =`, result, result === 2 ? `✅` : `❌`)
    setTimeout(() => {
      const app = document.querySelector(`#app`);
      app.innerHTML = ``;
      app.insertAdjacentHTML(`beforeend`, `sqrt(4)'s result = ${result} ${result === 2 ? '✅' : '❌'}`);
    }, 1000);
  });
})();

```


## WebAssembly & JS API


> 在 js 中执行 `.wasm` 文件的步骤


```js

(() => {
  const log = console.log;
  log(`\n🎉在 js 中执行 \`.wasm\` 文件的4个步骤: `);
  const ThrowErrorInfo = () => {
    throw new Error(`fetch WASM failed!`);
  };
  const WASM_URL = `https://cdn.xgqfrms.xyz/webassembly/math-sqrt-demo.wasm`;
  fetch(WASM_URL)
  .then(res => {
    // 1. 获取 wasm 转换成 ArrayBuffer 形式的 bytes 字节码
    log(`1. 获取 wasm 转换成 ArrayBuffer 形式的 bytes 字节码`);
    return res.ok ? res.arrayBuffer() : ThrowErrorInfo();
  })
  .then(bytes => {
    // async / await: WebAssembly.compile
    // 2. 使用 WebAssembly.compile 把 bytes 字节码编译成 module 模块
    log(`2. 使用 WebAssembly.compile 把 bytes 字节码编译成 module 模块`);
    return WebAssembly.compile(bytes);
  })
  .then(module => {
    // async / await: WebAssembly.instantiate
    // 3. 使用 WebAssembly.instantiate 把 module 模块实例化，并把模块中定义的方法 exports 导出
    log(`3. 使用 WebAssembly.instantiate 把 module 模块实例化，并把模块中定义的方法 exports 导出`)
    return WebAssembly.instantiate(module);
  })
  .then(instance => {
    // 4. 导入模块 exports 的方法
    log(`4. 导入模块 exports 的方法`);
    const {sqrt} = instance.exports;
    // global namespace (WebAssembly)
    if(!window.WebAssembly) {
      WebAssembly = {};
    }
    window.WebAssembly.sqrt = sqrt;
    console.log('\nsqrt(4) =', sqrt(4), sqrt(4) === 2 ? `✅` : `❌`);
    // sqrt(4) = 2 ✅
    console.log('\nWebAssembly.sqrt(4) =', WebAssembly.sqrt(4), WebAssembly.sqrt(4) === 2 ? `✅` : `❌`);
    // WebAssembly.sqrt(4) = 2 ✅
  });
})();

/*

🎉在 js 执行 `.wasm` 文件的4个步骤: 

1. 获取 wasm 转换成 ArrayBuffer 形式的 bytes 字节码
2. 使用 WebAssembly.compile 把 bytes 字节码编译成 module 模块
3. 使用 WebAssembly.instantiate 把 module 模块实例化，并把模块中定义的方法 exports 导出
4. 导入模块 exports 的方法

sqrt(4) = 2 ✅

WebAssembly.sqrt(4) = 2 ✅

*/

```

https://cdn.xgqfrms.xyz/

https://cdn.xgqfrms.xyz/webassembly/index.html



https://webassembly.org/getting-started/js-api/


## refs

https://www.cnblogs.com/xgqfrms/p/16656480.html

https://www.cnblogs.com/xgqfrms/p/12702549.html

