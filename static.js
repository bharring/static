function byteToBits(byte) {
  return byte.toString(2).padStart(8, '0').split('');
}

function getRandomData() {
  const start = Date.now();
  const difference = document.getElementById('difference');
  const ws = new WebSocket('ws://localhost:8080/');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = pixels.data;

  ws.onmessage = function (event) {
    const bytes = JSON.parse(event.data).data;
    bytes.forEach((byte, i) => {
      const bits = byteToBits(byte);
      bits.forEach((bit, j) => {
        const dataIndex = i * 32 + j * 4;
        if (bit === '1') {
          data[dataIndex] = 0;
          data[dataIndex + 1] = 0;
          data[dataIndex + 2] = 0;
        }
      })
    });
    context.putImageData(pixels, 0, 0);
    difference.innerHTML = 'execution time: ' + (Date.now() - start) + 'ms';
  };
}

getRandomData();