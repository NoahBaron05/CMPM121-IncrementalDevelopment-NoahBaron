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
  counter++;
  displayCount = `${counter}`;
  counterElement.textContent = displayCount;
});
