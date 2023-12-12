class Cal {
    constructor(previousOperandTextElement,currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;

    }

    delete () {

    }

    appendNumber (n) {
        this.currentOperand = n
    }
    
    operationChoice (operation) {

    }

    total () {

    }

    updateDisplay () {
        this.currentOperandTextElement.innerText = this.currentOperand
    }


}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const  calculator = new Cal(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Number button clicked');
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

