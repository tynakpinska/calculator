let display = document.querySelector(".operation");
let result = document.querySelector(".result");

const operate = (displayContent, regOperator) => {
  let numbers = displayContent.split(regOperator);
  let operator = displayContent.match(regOperator)
    ? displayContent.match(regOperator)[0]
    : undefined;
  let num1 = numbers[0] ? Number(numbers[0]) : undefined;
  let num2 = numbers[1] ? Number(numbers[1]) : undefined;

  if (operator === "/" && num2 === 0) {
    result.textContent = "error";
    return;
  }
  if (!num2 || !operator) {
    result.textContent = num1;
    return;
  }

  switch (operator) {
    case "+":
      result.textContent = (num1 + num2).toString().length > 10 ? (num1 + num2).toPrecision(10) : num1 + num2;
      break;
    case "-":
      result.textContent = (num1 - num2).toString().length > 10 ? (num1 - num2).toPrecision(10) : num1 - num2;
      break;
    case "*":
      result.textContent = (num1 * num2).toString().length > 10 ? (num1 * num2).toPrecision(10) : num1 * num2;
      break;
    case "/":
      result.textContent = (num1 / num2).toString().length > 10 ? (num1 / num2).toPrecision(10) : num1 / num2;
      break;
  }
};

const removeLastChar = () => {
  display.textContent = display.textContent.substring(
    0,
    display.textContent.length - 1
  );
};

const addClickedChar = clickedChar => {
  display.textContent = display.textContent + clickedChar;
};

const replaceOperator = (reg, clickedOperator) => {
  display.textContent = display.textContent.replace(reg, clickedOperator);
};

const updateDisplay = e => {
  let regOperator = new RegExp(/[\+\-\*\/]/);
  let regOperatorEnd = new RegExp(/[\+\-\*\/]$/);
  let clickedChar = e.target.textContent;

  if (clickedChar === "CLEAR") {
    display.textContent = "";
    result.textContent = "";
    return;
  }

  if (
    regOperator.test(clickedChar) &&
    regOperatorEnd.test(display.textContent)
  ) {
    replaceOperator(regOperatorEnd, clickedChar);
    return;
  }

  if (clickedChar === "." && display.textContent.includes(".")) {
    return;
  }

  if (clickedChar === "🠄") {
    removeLastChar();
    operate(display.textContent, regOperator);
    return;
  }

  if (clickedChar === "=") {
    operate(display.textContent, regOperator);
    return;
  }

  addClickedChar(clickedChar);
  operate(display.textContent, regOperator);
};

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("mouseup", updateDisplay);
});
