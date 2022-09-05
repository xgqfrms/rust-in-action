const test = async (moduleBytes) => {
  try {
    // This will throw a ReferenceError on platforms where BigInt is not supported.
    // Please do not change the test value to BigInt literal (i.e. 0n), cause in that case a SyntaxError will be thrown before an execution.
    console.log('🚀 moduleBytes =', moduleBytes);
    const instance = await WebAssembly.instantiate(moduleBytes);
    console.log('✅ instance =', instance);
    // {module: Module, instance: Instance}
    const {b}= instance.instance.exports;
    return b(BigInt(0)) === BigInt(0);
  } catch (e) {
    return false;
  }
};


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




// WebAssembly.Instance

// const wasmInstance = new WebAssembly.Instance(wasmModule, {});
// const { addTwo } = wasmInstance.exports;
// for (let i = 0; i < 10; i++) {
//   console.log(addTwo(i, i));
// }
