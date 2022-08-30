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
  let regDigit = new RegExp(/[\d]/);
  let regDigitEnd = new RegExp(/[\d]$/);
  let clickedChar = e.target.textContent;

  if (clickedChar === "CLEAR") {
    display.textContent = "";
  } else if (regOperatorEnd.test(clickedChar)) {
    if (regOperatorEnd.test(display.textContent)) {
      replaceOperator(regOperatorEnd, clickedChar);
    } else if (
      regDigitEnd.test(display.textContent) &&
      !regOperator.test(display.textContent)
    ) {
      addClickedChar(clickedChar);
    }
  } else if (
    clickedChar === "=" &&
    regDigitEnd.test(display.textContent) &&
    regOperator.test(display.textContent)
  ) {
    let numbers = display.textContent.split(regOperator);
    let operator = display.textContent.match(regOperator);
    const operations = {
      '+': 'add',
      '-': 'substract',
      '*': 'multiply',
      '/': 'divide'
    }
    display.textContent = operate(
      operations[operator],
      Number(numbers[0]),
      Number(numbers[1])
    );
  } else if (regDigit.test(clickedChar) || clickedChar === ".") {
    addClickedChar(clickedChar);
  } else if (clickedChar === "🠄") {
    removeLastChar();
  }
};

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("mouseup", updateDisplay);
});
