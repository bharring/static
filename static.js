const ws = new WebSocket("ws://localhost:8080/");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const difference = document.getElementById("difference");

const clearCanvas = () => {
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

const getRandomData = () => {
  ws.send((canvas.width * canvas.height) / 8);
}

ws.onopen = () => {
  console.log("CONNECT");
  getRandomData();
};

ws.onclose = () => {
  console.log("DISCONNECT");
};

ws.onmessage = (event) => {
  const start = Date.now();
  clearCanvas();
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  const bytes = JSON.parse(event.data).data;
  bytes.forEach((byte, i) => {
    const mask = 0x80;
    for (let j = 0; j < 8; j++) {
      if ((mask >> j) & byte) {
        const dataIndex = i * 32 + j * 4;
        pixels.data[dataIndex] = 0;
        pixels.data[dataIndex + 1] = 0;
        pixels.data[dataIndex + 2] = 0;
      }
    }
  });
  context.putImageData(pixels, 0, 0);
  difference.innerHTML = "execution time: " + (Date.now() - start) + "ms";
};

clearCanvas();
