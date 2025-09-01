let counter = 0;
onmessage = (event) => {
  const time = event.data || 0;
  setInterval(() => {
    counter += 1;
    postMessage(counter);
  }, time);
};
