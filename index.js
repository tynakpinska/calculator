let display = document.querySelector(".operation");
let result = document.querySelector(".result");

const calculate = (num1, num2, operator) => {
  console.log("num1: ", num1, "num2: ", num2, "operator: ", operator);
  if (operator === "/" && num2 === 0) {
    result.textContent = "error";
    return;
  }
  if (!num2 || !operator) {
    result.textContent = num1;
    return;
  }
  if (num1 && num2) {
    switch (operator) {
      case "+":
        return (num1 + num2).toString().length > 10
          ? (num1 + num2).toPrecision(10)
          : num1 + num2;
      case "-":
        return (num1 - num2).toString().length > 10
          ? (num1 - num2).toPrecision(10)
          : num1 - num2;
      case "*":
        return (num1 * num2).toString().length > 10
          ? (num1 * num2).toPrecision(10)
          : num1 * num2;

      case "/":
        return (num1 / num2).toString().length > 10
          ? (num1 / num2).toPrecision(10)
          : num1 / num2;
    }
  }
};

const parseDisplayContent = (displayContent, regOperator) => {
  let numbers = [];
  if (regOperator.test(displayContent[0])) {
    numbers[0] = displayContent[0] + displayContent[1];
    let shortenedDisplayContent = displayContent.slice(
      2,
      displayContent.length
    );
    numbers.splice(1, 0, ...shortenedDisplayContent.split(regOperator));
  } else {
    numbers = displayContent.split(regOperator);
  }
  numbers = numbers.filter(n => n !== "");
  console.log(numbers);

  let num1 = numbers[0] ? Number(numbers[0]) : undefined;
  let num2 = numbers[1] ? Number(numbers[1]) : undefined;

  let operators = displayContent.match(regOperator);

  let operator = operators
    ? num1 < 0
      ? operators[1]
      : operators[0]
    : undefined;

  if (numbers.length > 2) {
    num1 = calculate(num1, num2, operator);
    numbers.shift();
    numbers[0] = num1;
    num2 = numbers[1] ? Number(numbers[1]) : undefined;
    operator = displayContent.match(regOperator)[1];
  }

  result.textContent = calculate(num1, num2, operator);
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
  let regOperator = new RegExp(/[\+\-\*\/]/g);
  let regOperatorEnd = new RegExp(/[\+\-\*\/]$/);
  let clickedChar = e.key ? e.key : e.target.textContent;

  if (clickedChar === "CLEAR") {
    display.textContent = "";
    result.textContent = "";
    return;
  }

  // if clicked character is operator and the last character in display is also operator, exchange operator to the clicked one
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
    parseDisplayContent(display.textContent, regOperator);
    return;
  }

  if (clickedChar === "=") {
    parseDisplayContent(display.textContent, regOperator);
    display.textContent = result.textContent;
    return;
  }

  addClickedChar(clickedChar);
  parseDisplayContent(display.textContent, regOperator);
};

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("mouseup", updateDisplay);
});

window.addEventListener("keydown", updateDisplay);
