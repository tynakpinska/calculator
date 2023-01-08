let operationDisplay = document.querySelector(".operation");
let resultDisplay = document.querySelector(".result");

operationDisplay.textContent = "";
resultDisplay.textContent = "";
let num1 = "";
let num2 = "";
let operator = "";
let outcome = "";

const calculate = (num1, num2, operator) => {
  num1 = Number(num1);
  num2 = Number(num2);
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
        (num1 + num2).toString().length > 5
          ? (num1 + num2).toFixed(5)
          : num1 + num2;
      break;
    case "-":
      outcome =
        (num1 - num2).toString().length > 5
          ? (num1 - num2).toFixed(5)
          : num1 - num2;
      break;
    case "*":
      outcome =
        (num1 * num2).toString().length > 5
          ? (num1 * num2).toFixed(5)
          : num1 * num2;
      break;
    case "/":
      outcome =
        (num1 / num2).toString().length > 5
          ? (num1 / num2).toFixed(5)
          : num1 / num2;
      break;
  }

  outcome = Number(outcome);

  return [num1, num2, outcome];
};

const removeLastChar = () => {
  resultDisplay.textContent = resultDisplay.textContent.substring(
    0,
    resultDisplay.textContent.length - 1
  );
};

const addClickedChar = clickedChar => {
  operationDisplay.textContent = operationDisplay.textContent + clickedChar;
};

const clearData = () => {
  num1 = "";
  num2 = "";
  operator = "";
  operationDisplay.textContent = "";
  resultDisplay.textContent = "";
};

const handleDigit = clickedChar => {
  if (outcome) {
    num1 = clickedChar;
    outcome = "";
    resultDisplay.textContent = num1;
  } else if (num1 == "-") {
    num1 = `${num1}${clickedChar}`;
  } else if (!num1 && operator) {
    num2 = operationDisplay.textContent;
    resultDisplay.textContent = num2;
  } else if (!num1 || (num1 && !operator)) {
    if (num1.toString().includes(".")) {
      num1 = `${num1.toString()}${clickedChar}`;
    } else {
      num1 = `${num1}${clickedChar}`;
    }
    resultDisplay.textContent = num1;
  } else {
    if (num2.toString().includes(".")) {
      num2 = num2 ? `${num2.toString()}${clickedChar}` : clickedChar;
    } else {
      num2 = num2 ? `${num2}${clickedChar}` : clickedChar;
    }
    resultDisplay.textContent = num2;
  }
};

const updateDisplay = e => {
  e.preventDefault();

  let regOperator = new RegExp(/[\+\-\*\/]/g);
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
      e.key === "," ||
      e.key === "."
    )
  ) {
    return;
  }

  let clickedChar = e.key ? e.key : e.target.textContent;

  if (clickedChar === "CLEAR" || clickedChar === "Delete") {
    clearData();
    return;
  }

  if (clickedChar === "🠄" || clickedChar === "Backspace") {
    removeLastChar();
    return;
  }

  if (
    clickedChar !== "Enter" &&
    clickedChar !== "=" &&
    clickedChar !== "," &&
    clickedChar !== "."
  ) {
    addClickedChar(clickedChar);
  }

  if (clickedChar === "," || clickedChar === ".") {
    if (num1 && operator && num2) {
      if (num2.toString().includes(".") || num2.toString().includes(","))
        return;
      num2 = `${num2}.`;
      resultDisplay.textContent = num2;
    } else if (num1 && !operator) {
      if (num1.toString().includes(".") || num1.toString().includes(","))
        return;
      num1 = `${num1}.`;
      resultDisplay.textContent = num1;
    }
  }

  // fix clicking operator before clicking enter
  
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

  if (regDigits.test(clickedChar)) {
    handleDigit(clickedChar);
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
