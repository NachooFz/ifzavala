/*
  game_of_life.js
  Implementa la simulación del Juego de la Vida de Conway. El juego se ejecuta
  dentro de un canvas adaptado al tamaño del contenedor. Controles para
  iniciar, pausar, generar un patrón aleatorio y limpiar la cuadrícula.
*/

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('gameOfLife');
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const randomBtn = document.getElementById('randomBtn');
  const clearBtn = document.getElementById('clearBtn');

  // Crear canvas
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Configuración del juego
  let cols, rows;
  const cellSize = 15;
  let grid;
  let intervalId;
  let running = false;

  function setupGrid() {
    // Ajustar tamaño del canvas al contenedor
    const width = container.clientWidth;
    cols = Math.floor(width / cellSize);
    rows = 20; // número fijo de filas para mantener proporción
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;
    // Inicializar matriz de celdas muertas
    grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    drawGrid();
  }

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x] === 1) {
          ctx.fillStyle = '#00bcd4';
        } else {
          ctx.fillStyle = '#0a1128';
        }
        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }

  function countNeighbors(r, c) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const y = (r + i + rows) % rows;
        const x = (c + j + cols) % cols;
        count += grid[y][x];
      }
    }
    return count;
  }

  function update() {
    const newGrid = grid.map(arr => arr.slice());
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const neighbors = countNeighbors(y, x);
        if (grid[y][x] === 1) {
          newGrid[y][x] = neighbors === 2 || neighbors === 3 ? 1 : 0;
        } else {
          newGrid[y][x] = neighbors === 3 ? 1 : 0;
        }
      }
    }
    grid = newGrid;
    drawGrid();
  }

  function randomize() {
    grid = grid.map(row => row.map(() => (Math.random() > 0.7 ? 1 : 0)));
    drawGrid();
  }

  function clearGrid() {
    grid = grid.map(row => row.map(() => 0));
    drawGrid();
  }

  function start() {
    if (!running) {
      intervalId = setInterval(update, 200);
      running = true;
    }
  }

  function pause() {
    if (running) {
      clearInterval(intervalId);
      running = false;
    }
  }

  // Interacciones con el usuario para activar/desactivar celdas manualmente
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    grid[y][x] = grid[y][x] ? 0 : 1;
    drawGrid();
  });

  // Ajustar tamaño al cargar
  setupGrid();
  window.addEventListener('resize', setupGrid);

  // Botones de control
  startBtn.addEventListener('click', start);
  pauseBtn.addEventListener('click', pause);
  randomBtn.addEventListener('click', randomize);
  clearBtn.addEventListener('click', clearGrid);
});