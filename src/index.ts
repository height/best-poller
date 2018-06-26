/**
 * @name Best Poller
 * @author Linkjun
 * @description A basic poller built on top of promises, based on the typescript.
 */
interface Option {
  fun: Function
  param?: any
  interval: number
  callback: Function
  errorCallback?: Function
}

class BestPoller {
  version = '0.1.0'

  timer: any

  options: Option

  isDestroy = false

  constructor (fun, param, interval, callback, errorCallback?) {
    this.options = { fun, param, interval, callback, errorCallback }
    this.run(this.options)
  }

  async run ({ fun, param, interval, callback, errorCallback }: Option) {
    let success
    let fail
    try {
      success = await fun(param)
    } catch (e) {
      fail = e
    }

    // 成功
    if (success && callback) {
      await callback(success, fail)
    }
    // 失败
    if (fail && errorCallback) {
      console.error('Polling ERROR:', fail)
      await errorCallback(fail)
    }

    if (this.isDestroy) return

    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.run({ fun, param, interval, callback, errorCallback })
    }, interval)
  }

  stop () {
    clearTimeout(this.timer)
    this.isDestroy = true
  }

  continue () {
    if (this.isDestroy && this.options.param) {
      this.isDestroy = false
      this.run(this.options)
    }
  }

  destroy () {
    clearTimeout(this.timer)
    this.isDestroy = true
    delete this.version
    delete this.timer
    delete this.options
    delete this.isDestroy
    delete this.run
    delete this.stop
    delete this.continue
    delete this.constructor
  }
}

export default BestPoller
