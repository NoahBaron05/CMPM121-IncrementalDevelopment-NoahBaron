import "./style.css";

let counter = 0;

document.body.innerHTML = `
  <div style="font-size: 20px;">  
    Snowmen ⛄: <span id="counter">0</span>
  </div>
  <div style="margin-top: 10px;">
    <button style="width: 50px; height: 50px; font-size: 25px;" id="increment">⛄
  </div>
  <div style="margin-top: 10px;">
    <button style="width: 100px; height: 25px; font-size: 12px;" id="auto" disabled>Auto Snowmen
  </div>
  <div style="font-size: 15px;">
    Cost: 10 Snowmen
  </div>
`;

const snowManButton = document.getElementById("increment")!;
const autoButton = document.getElementById("auto")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;

let displayCount: string = "0";

snowManButton.addEventListener("click", () => {
  incrementCounter(1);
});

autoButton.addEventListener("click", () => {
  if (counter >= 10) {
    growthRate++;
    counter -= 10;
    autoButton.disabled = true;
  }
});

function incrementCounter(amount: number) {
  counter += amount;
  displayCount = `${counter.toFixed(1)}`;
  counterElement.textContent = displayCount;
}

let lastTime: number | null = null;
let growthRate: number = 0;

function gameLoop(currentTime: number) {
  //Finds the increment value based on the time passed
  if (lastTime != null) {
    const deltaTime = currentTime - lastTime;
    const incrementAmount = (deltaTime / 1000) * growthRate;
    incrementCounter(incrementAmount);
  }

  if (counter >= 10) {
    autoButton.disabled = false;
  }

  //End of loop
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
