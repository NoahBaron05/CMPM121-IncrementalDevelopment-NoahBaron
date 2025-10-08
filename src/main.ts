import "./style.css";

let counter = 0;

document.body.innerHTML = `
  <div style="font-size: 20px;">  
    Snowmen ⛄: <span id="counter">0</span>
  </div>
  <div style="font-size: 15px;">
    <span id="growth">0</span> Snowmen per Second
  <div style="margin-top: 10px;">
    <button style="width: 50px; height: 50px; font-size: 25px;" id="increment">⛄
  </div>
  <div style="margin-top: 10px;">
    <button style="width: 100px; height: 25px; font-size: 12px;" id="auto" disabled>Auto Snowmen</button>
    <span id="autoCounter">
  </div>
  <div style="font-size: 15px;">
    Cost: 10 Snowmen
  </div>
`;

const snowManButton = document.getElementById("increment")!;
const autoButton = document.getElementById("auto")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const autoCounterElement = document.getElementById("autoCounter")!;
const snowmenPerSecondElement = document.getElementById("growth")!;

let displayCount: string = "0";
let autoDisplayCount: number = 0;
let growthRate: number = 0;

snowManButton.addEventListener("click", () => {
  incrementCounter(1);
});

autoButton.addEventListener("click", () => {
  if (counter >= 10) {
    numAuto++;
    counter -= 10;

    autoDisplayCount++;
    autoCounterElement.textContent = `${autoDisplayCount}`;
    autoButton.disabled = true;
  }
});

function incrementCounter(amount: number) {
  counter += amount;
  displayCount = `${counter.toFixed(1)}`;
  counterElement.textContent = displayCount;
}

let lastTime: number | null = null;
let numAuto: number = 0;
let snowmenCountPerSecond: number = 0;
let timeAccumulator: number = 0;

function gameLoop(currentTime: number) {
  if (lastTime != null) {
    //Finds the increment value based on the time passed
    const deltaTime = currentTime - lastTime;
    timeAccumulator += deltaTime;

    const incrementAmount = (deltaTime / 1000) * numAuto;
    incrementCounter(incrementAmount);

    //Finds the current snowmen per second
    snowmenCountPerSecond += incrementAmount;
    if (timeAccumulator >= 1000) {
      growthRate = snowmenCountPerSecond;
      snowmenPerSecondElement.textContent = `${growthRate.toFixed(1)}`;
      snowmenCountPerSecond = 0;
      timeAccumulator = 0;
    }
  }

  if (counter >= 10) {
    autoButton.disabled = false;
  }

  //End of loop
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
