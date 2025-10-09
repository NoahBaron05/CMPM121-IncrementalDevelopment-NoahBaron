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
    <button style="width: 125px; height: 25px; font-size: 12px;" id="autoA" disabled>Auto Snowmen A</button>
    <span id="autoCounterA">
  </div>
  <div style="font-size: 15px;">
    Cost: 10 Snowmen
  </div>
  <div style="margin-top: 10px;">
    <button style="width: 125px; height: 25px; font-size: 12px;" id="autoB" disabled>Auto Snowmen B</button>
    <span id="autoCounterB">
  </div>
  <div style="font-size: 15px;">
    Cost: 100 Snowmen
  </div>
  <div style="margin-top: 10px;">
    <button style="width: 125px; height: 25px; font-size: 12px;" id="autoC" disabled>Auto Snowmen B</button>
    <span id="autoCounterC">
  </div>
  <div style="font-size: 15px;">
    Cost: 1000 Snowmen
  </div>
`;

const snowManButton = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const autoButtonA = document.getElementById("autoA")! as HTMLButtonElement;
const autoCounterElementA = document.getElementById("autoCounterA")!;
const autoButtonB = document.getElementById("autoB")! as HTMLButtonElement;
const autoCounterElementB = document.getElementById("autoCounterB")!;
const autoButtonC = document.getElementById("autoC")! as HTMLButtonElement;
const autoCounterElementC = document.getElementById("autoCounterC")!;
const snowmenPerSecondElement = document.getElementById("growth")!;

let displayCount: string = "0";
let autoDisplayCountA: number = 0;
let autoDisplayCountB: number = 0;
let autoDisplayCountC: number = 0;
let growthRate: number = 0;

snowManButton.addEventListener("click", () => {
  incrementCounter(1);
});

autoButtonA.addEventListener("click", () => {
  if (counter >= 10) {
    numAuto += 0.1;
    counter -= 10;

    autoDisplayCountA++;
    autoCounterElementA.textContent = `${autoDisplayCountA}`;
    autoButtonA.disabled = true;
  }
});

autoButtonB.addEventListener("click", () => {
  if (counter >= 100) {
    numAuto += 2;
    counter -= 100;

    autoDisplayCountB++;
    autoCounterElementB.textContent = `${autoDisplayCountB}`;
    autoButtonB.disabled = true;
  }
});

autoButtonC.addEventListener("click", () => {
  if (counter >= 1000) {
    numAuto += 50;
    counter -= 1000;

    autoDisplayCountC++;
    autoCounterElementC.textContent = `${autoDisplayCountC}`;
    autoButtonC.disabled = true;
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
    autoButtonA.disabled = false;
  }
  if (counter >= 100) {
    autoButtonB.disabled = false;
  }
  if (counter >= 1000) {
    autoButtonC.disabled = false;
  }

  //End of loop
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
