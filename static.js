const ws = new WebSocket("ws://localhost:8080/");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const difference = document.getElementById("difference");

const byteToBits = byte => {
  return byte
    .toString(2)
    .padStart(8, "0")
    .split("");
};

const clearCanvas = () => {
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

const getRandomData = () => {
  ws.send("refresh");
};

ws.onopen = () => {
  console.log("CONNECT");
  getRandomData();
};

ws.onclose = () => {
  console.log("DISCONNECT");
};

ws.onmessage = event => {
  const start = Date.now();
  clearCanvas();
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  const bytes = JSON.parse(event.data).data;
  bytes.forEach((byte, i) => {
    const bits = byteToBits(byte);
    bits.forEach((bit, j) => {
      const dataIndex = i * 32 + j * 4;
      if (bit === "1") {
        pixels.data[dataIndex] = 0;
        pixels.data[dataIndex + 1] = 0;
        pixels.data[dataIndex + 2] = 0;
      }
    });
  });
  context.putImageData(pixels, 0, 0);
  difference.innerHTML = "execution time: " + (Date.now() - start) + "ms";
};

clearCanvas();