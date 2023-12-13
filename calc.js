// Create a class that will hold all the different objects that will be part of the calculator.
class Cal {
    constructor(previousOperandTextElement,currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    // This function is used to be able to call it and clear anything that is display,
    // previous operation and current operation.
    clear () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;

    }
    // Function for the delete button
    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }
    // Use to append numbers into the display.
    appendNumber (n) {
        // Prevents from adding multiple periods.
        if (n === '.' && this.currentOperand.includes('.')) return;
        // This allows us to append multiple numbers within one line, we use toString so JS doesnt actually add.
        this.currentOperand = this.currentOperand.toString() + n.toString();
    }
    // Checks for the operation choice, what operation was was clicked/chosen.
    operationChoice (operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') { // Check if there is already a number before then we can just call total func.
            this.total();
        };
        this.operation = operation; // Set the operation = to the operation passed in; it will know which operation to use.
        this.previousOperand = this.currentOperand; 
        this.currentOperand = '';

    }

    total () {
        let computation;
        // These two prev and current get turned from strings into numbers.
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // Check if prev or current is a number; allows us to not allow the user to click = when there is no number/s.
        if (isNaN(prev) || isNaN(current)) return;
        // Switch allows us to take a shortcut from having multiple functions and if statements that will
        // check if we want to add, subtract, multiply etc...
        // checking for whatever value of operation from our operationChoice func.
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default: // See as a else statement.
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }    
    // Adds the comma, into the numbers making it look more professional.
    addComma (n) {
        const stringN = n.toString();
        const intNums = parseFloat(stringN.split('.')[0]);
        const decimalNums = stringN.split('.')[1];
        let intDisplay;
        if (isNaN(intNums)) {
            intDisplay = ''
        } else {
            intDisplay = intNums.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalNums != null) {
            return `${intDisplay}.${decimalNums}`;
        } else {
            return intDisplay;
        }
    }
    // Whatever changes/updates we want to make to the display container goes through here.
    updateDisplay () {
        this.currentOperandTextElement.innerText = this.addComma(this.currentOperand);
        this.previousOperandTextElement.innerText = this.previousOperand;

    }


}

// Query select all of our elements from our HTML so we are able to use them in a JavaScript.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// This line of code creates a new instance of the Cal class and assigns it to the var calculator.
const  calculator = new Cal(previousOperandTextElement, currentOperandTextElement);

// For each button we add an eventListener; we listen for a click. Takes parameter arrow function, button.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText); // We call our appendNumber func and append button.inner
        // to its parameter value (n).
        calculator.updateDisplay();
    })
});

// Same as we did above for numberButtons, but this time for operations.
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationChoice(button.innerText); 
        calculator.updateDisplay();
    })
});
// All the event listeners down below are pretty self explanatory; just event listeners,
// that check when that specific button is 'clicked'.
equalsButton.addEventListener('click', () => {
    calculator.total();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

