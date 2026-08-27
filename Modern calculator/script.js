let currentInput = "";
let previousInput = "";
let operator = "";

const result = document.getElementById("result");
const history = document.getElementById("history");

function appendNumber(number) {
    if (number === "." && currentInput.includes(".")) {
        return;
    }

    currentInput += number;
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === "" && previousInput === "") {
        return;
    }

    if (previousInput !== "" && currentInput !== "") {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = "";

    history.textContent = `${previousInput} ${getOperatorSymbol(operator)}`;
}

function calculate() {
    if (previousInput === "" || currentInput === "" || operator === "") {
        return;
    }

    let first = parseFloat(previousInput);
    let second = parseFloat(currentInput);
    let answer;

    switch (operator) {
        case "+":
            answer = first + second;
            break;

        case "-":
            answer = first - second;
            break;

        case "*":
            answer = first * second;
            break;

        case "/":
            if (second === 0) {
                result.textContent = "Error";
                return;
            }
            answer = first / second;
            break;
    }

    answer = parseFloat(answer.toFixed(10));

    history.textContent =
        `${previousInput} ${getOperatorSymbol(operator)} ${currentInput} =`;

    currentInput = answer.toString();
    previousInput = "";
    operator = "";

    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";

    result.textContent = "0";
    history.textContent = "";
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);

    if (currentInput === "") {
        result.textContent = "0";
    } else {
        result.textContent = currentInput;
    }
}

function percentage() {
    if (currentInput === "") return;

    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function updateDisplay() {
    result.textContent = currentInput || "0";
}

function getOperatorSymbol(op) {
    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return symbols[op];
}


// Keyboard Support
document.addEventListener("keydown", function (event) {

    if (!isNaN(event.key) || event.key === ".") {
        appendNumber(event.key);
    }

    if (["+", "-", "*", "/"].includes(event.key)) {
        chooseOperator(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteLast();
    }

    if (event.key === "Escape") {
        clearDisplay();
    }

    if (event.key === "%") {
        percentage();
    }
});