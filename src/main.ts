import "./style.css";

let counter = 0;

document.body.innerHTML = `
  <div style="font-size: 40px; text-align: center;">  
    Snowmen ⛄: <span id="counter">0</span>
  </div>
  <div style="font-size: 25px; text-align: center;">
    <br>
    <span id="growth">0</span> Snowmen per Second
    <br><br>
  <div style="margin-top: 10px;">
    <button style="width: 150px; height: 150px; font-size: 75px;" id="increment">⛄</button>
    <p>Make Snowman</p>
    <br>
  </div>
  <div style="margin-top: 10px; text-align: center;">
    <button style="width: 150px; height: 50px; font-size: 16px;" id="autoA" disabled>Snow Cone Maker</button>
    <span id="autoCounterA">
  </div>
  <div style="font-size: 15px; text-align: center;">
    Cost: <span id="autoCostA">10</span> Snowmen
  </div>
  <div style="margin-top: 10px; text-align: center;">
    <button style="width: 150px; height: 50px; font-size: 16px;" id="autoB" disabled>Santa's Elves</button>
    <span id="autoCounterB">
  </div>
  <div style="font-size: 15px; text-align: center;">
    Cost: <span id="autoCostB">100</span> Snowmen
  </div>
  <div style="margin-top: 10px; text-align: center;">
    <button style="width: 150px; height: 50px; font-size: 16px;" id="autoC" disabled>Snowman Factory</button>
    <span id="autoCounterC">
  </div>
  <div style="font-size: 15px; text-align: center;">
    Cost: <span id="autoCostC">1000</span> Snowmen
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
const autoCostAElement = document.getElementById("autoCostA")!;
const autoCostBElement = document.getElementById("autoCostB")!;
const autoCostCElement = document.getElementById("autoCostC")!;
const snowmenPerSecondElement = document.getElementById("growth")!;

let displayCount: string = "0";
let autoDisplayCountA: number = 0;
let autoDisplayCountB: number = 0;
let autoDisplayCountC: number = 0;
let growthRate: number = 0;
let autoCostA = 10;
let autoCostB = 100;
let autoCostC = 1000;

snowManButton.addEventListener("click", () => {
  incrementCounter(1);
});

autoButtonA.addEventListener("click", () => {
  if (counter >= autoCostA) {
    numAuto += 0.1;
    counter -= autoCostA;
    autoCostA *= 1.15;

    autoDisplayCountA++;
    autoCounterElementA.textContent = `${autoDisplayCountA}`;
    autoButtonA.disabled = true;
    autoCostAElement.textContent = `${autoCostA.toFixed(1)}`;
  }
});

autoButtonB.addEventListener("click", () => {
  if (counter >= autoCostB) {
    numAuto += 2;
    counter -= autoCostB;
    autoCostB *= 1.15;

    autoDisplayCountB++;
    autoCounterElementB.textContent = `${autoDisplayCountB}`;
    autoButtonB.disabled = true;
    autoCostBElement.textContent = `${autoCostB.toFixed(1)}`;
  }
});

autoButtonC.addEventListener("click", () => {
  if (counter >= autoCostC) {
    numAuto += 50;
    counter -= autoCostC;
    autoCostC *= 1.15;

    autoDisplayCountC++;
    autoCounterElementC.textContent = `${autoDisplayCountC}`;
    autoButtonC.disabled = true;
    autoCostCElement.textContent = `${autoCostC.toFixed(1)}`;
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

  if (counter >= autoCostA) {
    autoButtonA.disabled = false;
  }
  if (counter >= autoCostB) {
    autoButtonB.disabled = false;
  }
  if (counter >= autoCostC) {
    autoButtonC.disabled = false;
  }

  //End of loop
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
