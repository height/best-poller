/* global describe it expect */
// 对于 export default 导出的方法，使用 `interopRequireDefault` 做测试兼容
function interopRequireDefault (path, obj) { return (obj = require(path)) && obj.__esModule ? obj.default : obj }

const BestResponse = interopRequireDefault('../dist/index.js')

let data = {
  key: 1,
  key2: 0,
  key3: 1
}

let bestResponse = new BestResponse({
  timeout: 3000,
  store: data,
})

function polling () {
  setInterval(() => {
    bestResponse.setStore({
      key: 1,
      key2: 1,
      key3: 2
    })
  }, 2000)
}

describe('polling', () => {
  it('return `hello world`', () => {

  })
})
