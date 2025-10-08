import "./style.css";

let counter = 0;

document.body.innerHTML = `
  <p style="font-size: 20px;">Snowmen ⛄: <span id="counter">0</span></p>
  <button style="width: 50px; height: 50px; font-size: 25px;" id="increment">⛄
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

let displayCount: string = "0";

button.addEventListener("click", () => {
  incrementCounter(1);
});

function incrementCounter(amount: number) {
  counter += amount;
  displayCount = `${counter.toFixed(1)}`;
  counterElement.textContent = displayCount;
}

let lastTime: number | null = null;

function gameLoop(currentTime: number) {
  //Finds the increment value based on the time passed
  if (lastTime != null) {
    const deltaTime = currentTime - lastTime;
    const incrementAmount = deltaTime / 1000;
    incrementCounter(incrementAmount);
  }

  //End of loop
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
