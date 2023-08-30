let timer; // Timer variable
let running = false; // Flag to track if stopwatch is running
let startTime; // Store the start time
let elapsedTime = 0; // Total elapsed time
let lapIndex = 1; // Lap index

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const lapResetButton = document.getElementById('lapReset');
const lapList = document.getElementById('lapList');

function formatTime(time) {
  const date = new Date(time);
  return date.toISOString().substr(11, 8);
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startPause() {
  if (running) {
    clearInterval(timer);
    running = false;
    startPauseButton.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    running = true;
    startPauseButton.textContent = 'Pause';
  }
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  updateDisplay();
}

function lap() {
  if (running) {
    const lapTime = elapsedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapIndex++}: ${formatTime(lapTime)}`;
    lapList.appendChild(lapItem);
  }
}

function reset() {
  clearInterval(timer);
  elapsedTime = 0;
  lapIndex = 1;
  running = false;
  startPauseButton.textContent = 'Start';
  updateDisplay();
  lapList.innerHTML = '';
}

startPauseButton.addEventListener('click', startPause);
lapResetButton.addEventListener('click', function() {
  if (running) {
    lap();
  } else {
    reset();
  }
});

reset(); // Initialize display and buttons
