const operate = (operator, num1, num2) => {
  switch (operator) {
    case "add":
      return num1 + num2;
    case "substract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      return num1 / num2;
  }
};

const display = document.querySelector("textarea");
let displayValue = display.textContent;

const updateDisplay = e => {
  if (e.target.textContent === "CLEAR") {
    display.textContent = "";
    displayValue = display.textContent;
  } else {
    display.textContent = display.textContent + e.target.textContent;
    displayValue = display.textContent;
  }
};

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", updateDisplay);
});
