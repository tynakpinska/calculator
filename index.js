let operationDisplay = document.querySelector(".operation");
let resultDisplay = document.querySelector(".result");

operationDisplay.textContent = "";
resultDisplay.textContent = "";
let num1 = "";
let num2 = "";
let operator = "";
let outcome = "";

const calculate = (num1, num2, operator) => {
  operationDisplay.textContent = `${num1} ${operator} ${num2}`;
  if (operator === "/" && num2 === 0) {
    resultDisplay.textContent = "error";
    return;
  }
  if (!num2 || !operator) {
    resultDisplay.textContent = num1;
    return;
  }

  switch (operator) {
    case "+":
      outcome =
        (num1 + num2).toString().length > 10
          ? (num1 + num2).toPrecision(2)
          : num1 + num2;
      break;
    case "-":
      outcome =
        (num1 - num2).toString().length > 10
          ? (num1 - num2).toPrecision(2)
          : num1 - num2;
      break;
    case "*":
      outcome =
        (num1 * num2).toString().length > 10
          ? (num1 * num2).toPrecision(2)
          : num1 * num2;
      break;
    case "/":
      outcome =
        (num1 / num2).toString().length > 10
          ? (num1 / num2).toPrecision(2)
          : num1 / num2;
      break;
  }

  return [num1, num2, outcome];
};

const removeLastChar = () => {
  operationDisplay.textContent = operationDisplay.textContent.substring(
    0,
    operationDisplay.textContent.length - 1
  );
};

const addClickedChar = clickedChar => {
  operationDisplay.textContent = operationDisplay.textContent + clickedChar;
};

const replaceOperator = (reg, clickedOperator) => {
  operationDisplay.textContent = operationDisplay.textContent.replace(
    reg,
    clickedOperator
  );
};

const clearData = () => {
  num1 = "";
  num2 = "";
  operator = "";
  operationDisplay.textContent = "";
  resultDisplay.textContent = "";
};

const updateDisplay = e => {
  e.preventDefault();

  let regOperator = new RegExp(/[\+\-\*\/]/g);
  let regOperatorEnd = new RegExp(/[\+\-\*\/]$/);
  let regDigits = new RegExp(/[0-9]/);

  // if clicked key is not an operator or a digit, don't do anything
  if (
    e.key &&
    !(
      e.key.match(regDigits) ||
      e.key.match(regOperator) ||
      e.key === "Backspace" ||
      e.key === "Enter" ||
      e.key === "Delete" ||
      e.key === ","
    )
  ) {
    return;
  }

  let clickedChar =
    e.key &&
    (e.key.match(regDigits) ||
      e.key.match(regOperator) ||
      e.key === "Backspace" ||
      e.key === "Enter" ||
      e.key === "Delete" ||
      e.key === ",")
      ? e.key
      : e.target.textContent;

  if (regOperator.test(clickedChar)) {
    if (outcome) {
      num1 = outcome;
      num2 = "";
      outcome = "";
    }
    if (clickedChar == "-" && !num1) {
      num1 = clickedChar;
    } else {
      operator = clickedChar;
    }
  }

  if (clickedChar === "CLEAR" || clickedChar === "Delete") {
    clearData();
    return;
  }

  if (clickedChar === "🠄" || clickedChar === "Backspace") {
    removeLastChar();
    return;
  }

  if (clickedChar !== "Enter" && clickedChar !== "=" && clickedChar !== ",") {
    addClickedChar(clickedChar);
  }

  if (clickedChar === ",") {
    if (num1.toString().includes(".")) return;
    if (num1 && operator && num2) {
      num2 = `${Number(num2)}.`;
      resultDisplay.textContent = `${Number(num2)}.`;
    } else if (num1 && !operator) {
      num1 = `${Number(num1)}.`;
      resultDisplay.textContent = `${Number(num1)}.`;
    }
  }

  if (regDigits.test(clickedChar)) {
    if (outcome) {
      num1 = Number(clickedChar);
      outcome = "";
      resultDisplay.textContent = num1;
    } else if (num1 == "-") {
      num1 = Number(`${num1}${clickedChar}`);
    } else if (!num1 && operator) {
      num2 = Number(operationDisplay.textContent);
      resultDisplay.textContent = num2;
    } else if (!num1 || (num1 && !operator)) {
      if (num1.toString().includes(".")) {
        num1 = Number(`${num1.toString()}${clickedChar}`);
      } else {
        num1 = Number(`${Number(num1)}${clickedChar}`);
      }
      resultDisplay.textContent = num1;
    } else {
      if (num2.toString().includes(".")) {
        num2 = num2
          ? Number(`${num2.toString()}${clickedChar}`)
          : Number(clickedChar);
      } else {
        num2 = num2 ? Number(`${num2}${clickedChar}`) : Number(clickedChar);
      }
      resultDisplay.textContent = num2;
    }
  }

  // if clicked character is operator and the last character in display is also operator, exchange operator to the clicked one
  if (
    regOperator.test(clickedChar) &&
    regOperatorEnd.test(operationDisplay.textContent)
  ) {
    replaceOperator(regOperatorEnd, clickedChar);
    return;
  }

  operationDisplay.textContent = `${num1} ${operator}`;

  if (
    (clickedChar === "=" || clickedChar === "Enter") &&
    operator !== "" &&
    num2
  ) {
    let result = calculate(num1, num2, operator);
    outcome = result[2];
    operationDisplay.textContent = `${num1} ${operator} ${num2} =`;
    num1 = outcome;
    num2 = 0;
    operator = "";
    resultDisplay.textContent = num1;
  }
};

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("mouseup", updateDisplay);
});

window.addEventListener("keydown", updateDisplay);
