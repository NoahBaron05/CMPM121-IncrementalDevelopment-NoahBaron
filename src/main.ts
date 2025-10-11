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
  <div id="shop" style="margin-top: 10px; text-align: center;"></div>
`;

const snowManButton = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const snowmenPerSecondElement = document.getElementById("growth")!;
const shopContainer = document.getElementById("shop")!;

//Item definitions
interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  button?: HTMLButtonElement;
  costEl?: HTMLElement;
  counterEl?: HTMLElement;
}

const availableItems: Item[] = [
  {
    name: "Snow Cone Maker",
    cost: 10,
    rate: 0.1,
    count: 0,
  },
  {
    name: "Santa's Elves",
    cost: 100,
    rate: 2,
    count: 0,
  },
  {
    name: "Snowman Factory",
    cost: 1000,
    rate: 50,
    count: 0,
  },
];

//Create HTML buttons
availableItems.forEach((item) => {
  const itemContainer = document.createElement("div");
  itemContainer.style.marginTop = "10px";
  itemContainer.style.textAlign = "center";

  const button = document.createElement("button");
  button.style.width = "150px";
  button.style.height = "50px";
  button.style.fontSize = "16px";
  button.textContent = item.name;
  button.disabled = true;

  const counterEl = document.createElement("span");
  counterEl.textContent = "0";

  const costContainer = document.createElement("div");
  costContainer.style.fontSize = "15px";
  costContainer.textContent = "Cost: ";

  const costEl = document.createElement("span");
  costEl.textContent = `${item.cost}`;
  costContainer.appendChild(costEl);

  itemContainer.appendChild(button);
  itemContainer.appendChild(counterEl);
  itemContainer.appendChild(document.createElement("br"));
  itemContainer.appendChild(costContainer);
  shopContainer.appendChild(itemContainer);

  item.button = button;
  item.costEl = costEl;
  item.counterEl = counterEl;
});

//Necessary starting values
let displayCount: string = "0";
let growthRate: number = 0;
const costInflation: number = 1.15;

let lastTime: number | null = null;
let numAuto: number = 0;
let snowmenCountPerSecond: number = 0;
let timeAccumulator: number = 0;

//Manual clicking
snowManButton.addEventListener("click", () => {
  incrementCounter(1);
});

//Purchasing items logic
availableItems.forEach((item) => {
  item.button!.addEventListener("click", () => {
    if (counter >= item.cost) {
      numAuto += item.rate;
      counter -= item.cost;
      item.cost *= costInflation;

      item.count++;
      item.counterEl!.textContent = `${item.count}`;
      item.button!.disabled = true;
      item.costEl!.textContent = `${item.cost.toFixed(1)}`;
    }
  });
});

//Changes the counter to the updated value
function incrementCounter(amount: number) {
  counter += amount;
  displayCount = `${counter.toFixed(1)}`;
  counterElement.textContent = displayCount;
}

function gameLoop(currentTime: number) {
  if (lastTime != null) {
    //Finds the increment value based on the time passed
    const deltaTime = currentTime - lastTime;
    timeAccumulator += deltaTime;

    //Adds snowmen generated to the total
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

  //Enable buttons if affordable
  availableItems.forEach((item) => {
    if (counter >= item.cost) {
      item.button!.disabled = false;
    }
  });

  //End of loop
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
