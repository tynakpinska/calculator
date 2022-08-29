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
  let regOperator = new RegExp(/[\+\-\*\/]/);
  let regOperatorEnd = new RegExp(/[\+\-\*\/]$/);
  let regDigit = new RegExp(/[\d]/);
  let regDigitEnd = new RegExp(/[\d]$/);

  if (e.target.textContent === "CLEAR") {
    display.textContent = "";
  } else if (regOperatorEnd.test(e.target.textContent)) {
    if (regOperatorEnd.test(display.textContent)) {
      // IF THERE IS AN OPERATOR - REPLACE IT
      display.textContent = display.textContent.replace(
        regOperatorEnd,
        e.target.textContent
      );
    } else if (
      regDigitEnd.test(display.textContent) &&
      !regOperator.test(display.textContent)
    ) {
      // IF THERE IS NO OPERATOR AND THERE IS A DIGIT - ADD OPERATOR
      display.textContent = display.textContent + e.target.textContent;
    }
  } else if (
    e.target.textContent === "=" &&
    regDigitEnd.test(display.textContent) &&
    regOperator.test(display.textContent)
  ) {
    display.textContent = operate("add", 1, 1);
  } else if (regDigit.test(e.target.textContent)) {
    display.textContent = display.textContent + e.target.textContent;
  }

  displayValue = display.textContent;
};

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("mouseup", updateDisplay);
});
