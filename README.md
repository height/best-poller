# Best Poller

## Create Poller

```
let getInfo = function(key) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let random = Math.random()
			if (random > 0.5) {
				resolve({
					type: 'success',
					key,
					random
				})
				return
			}
			reject({
				type: 'error',
				key,
				random
			})
		}, 300)
	})
}

let polling = new Polling(iotGetWifiDeviceStatus, {
	key: 1
}, 1000, (re) => {
	// success
}, (error) => {
	// error
})
```

## destroy

```
	polling.destroy()
```

## stop

```
	polling.stop()
```


## continue

```
	polling.continue()
```

