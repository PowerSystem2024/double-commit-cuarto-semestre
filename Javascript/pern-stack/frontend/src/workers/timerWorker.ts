let count: number = 0;
onmessage = (event: MessageEvent) => {
    const time = event.data || 0
    setInterval(() => {
        postMessage(count)
        count++
    }, time)
}