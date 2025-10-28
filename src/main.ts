import "./style.css";

// ---------- Variables ----------
let counter = 0;
let displayCount = "0";
let growthRate = 0;
const costInflation = 1.15;

let lastTime: number | null = null;
let autoGrowthRate = 0;
let growthCountPerSecond = 0;
let timeAccumulator = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
  button?: HTMLButtonElement;
  costEl?: HTMLElement;
  counterEl?: HTMLElement;
  container?: HTMLDivElement;
}

// ---------- Items ----------
const availableItems: Item[] = [
  {
    name: "Snow Cone Maker",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "A small snowcone maker to generate snowmen (0.1/s)",
  },
  {
    name: "Santa's Elves",
    cost: 100,
    rate: 2,
    count: 0,
    description: "An elf from Santa's workshop to make snowmen (2/s)",
  },
  {
    name: "Snowman Factory",
    cost: 1000,
    rate: 50,
    count: 0,
    description: "A factory to rapidly produce snowmen (50/s)",
  },
  {
    name: "Arctic Research Lab",
    cost: 10000,
    rate: 200,
    count: 0,
    description: "A top secret lab to optimally grow snowmen (200/s)",
  },
  {
    name: "Frost Forge",
    cost: 250000,
    rate: 1000,
    count: 0,
    description: "An ancient forge for building a snowman army (1000/s)",
  },
];

// ---------- DOM Setup ----------
document.body.innerHTML = `
  <div style="font-size: 40px; text-align: center; font-weight: bold">  
    Snowmen ⛄: <span id="counter">0</span>
  </div>
  <div style="font-size: 25px; text-align: center;">
    <br>
    <span id="growth">0</span> Snowmen per Second
    <br><br>
  </div>
  <div style="text-align:center;">
    <button id="increment" style="width:150px; height:150px; font-size:75px;">⛄</button>
    <p>Make Snowman</p>
  </div>
  <div style="font-size: 35px; text-align: center; font-weight: bold">
    <p>Upgrades:</p>
  </div>
  <div id="shop" style="margin-top:20px; text-align:center;"></div>
`;

const incrementButton = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const growthElement = document.getElementById("growth")!;
const shopContainer = document.getElementById("shop")!;

// ---------- Shop Creation ----------
availableItems.forEach((item) => {
  const container = document.createElement("div");
  container.style.marginTop = "15px";
  container.style.display = "none"; // initially hidden

  const button = document.createElement("button");
  button.textContent = item.name;
  button.style.width = "150px";
  button.style.height = "50px";
  button.style.fontSize = "16px";
  button.disabled = true;

  const counterEl = document.createElement("div");
  counterEl.textContent = `Owned: ${item.count}`;

  const costEl = document.createElement("div");
  costEl.textContent = `Cost: ${item.cost.toFixed(1)}`;

  // Tooltip
  const tooltip = document.createElement("div");
  tooltip.textContent = item.description;
  tooltip.style.position = "absolute";
  tooltip.style.background = "rgba(255,255,255,0.95)";
  tooltip.style.left = "50%";
  tooltip.style.transform = "translateX(-50%)";
  tooltip.style.border = "1px solid #aaa";
  tooltip.style.borderRadius = "8px";
  tooltip.style.padding = "6px";
  tooltip.style.width = "220px";
  tooltip.style.display = "none";
  tooltip.style.margin = "6px auto";
  tooltip.style.fontSize = "14px";

  button.addEventListener(
    "mouseenter",
    () => (tooltip.style.display = "block"),
  );
  button.addEventListener("mouseleave", () => (tooltip.style.display = "none"));

  container.append(button, counterEl, costEl, tooltip);
  shopContainer.append(container);

  item.container = container;
  item.button = button;
  item.costEl = costEl;
  item.counterEl = counterEl;
});

// ---------- Events ----------
incrementButton.addEventListener("click", () => {
  incrementCounter(1);
});

availableItems.forEach((item) => {
  item.button!.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      autoGrowthRate += item.rate;
      item.count++;
      item.cost *= costInflation;

      item.counterEl!.textContent = `Owned: ${item.count}`;
      item.costEl!.textContent = `Cost: ${item.cost.toFixed(1)}`;
    }
  });
});

// ---------- Functions ----------
function incrementCounter(amount: number) {
  counter += amount;
  displayCount = counter.toFixed(1);
  counterElement.textContent = displayCount;
}

// ---------- Game Loop ----------
function gameLoop(currentTime: number) {
  if (lastTime != null) {
    const delta = currentTime - lastTime;
    timeAccumulator += delta;

    const gain = (delta / 1000) * autoGrowthRate;
    incrementCounter(gain);

    growthCountPerSecond += gain;
    if (timeAccumulator >= 1000) {
      growthRate = growthCountPerSecond;
      growthElement.textContent = growthRate.toFixed(1);
      growthCountPerSecond = 0;
      timeAccumulator = 0;
    }
  }

  // Handle shop item state
  availableItems.forEach((item) => {
    // Reveal item once it’s affordable
    if (counter >= item.cost && item.container!.style.display === "none") {
      item.container!.style.display = "block";
    }

    // Enable or disable purchase button
    item.button!.disabled = counter < item.cost;
  });

  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
