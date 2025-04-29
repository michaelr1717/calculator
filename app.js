let firstNumber = null
let operator = null
let secondNumber = null

const calc_buttons = document.querySelector('#calc-buttons')
const screen = document.querySelector('#calc-screen')


function add(num1, num2) {
    return parseFloat(((Number(num1) + Number(num2)).toFixed(3))).toString()
}

function minus(num1, num2) {
    return parseFloat(((Number(num1) - Number(num2)).toFixed(3))).toString() 
}

function multiply(num1, num2) {
    return parseFloat(((Number(num1) * Number(num2)).toFixed(3))).toString()
}

function divide(num1, num2) {
    return parseFloat(((Number(num1) / Number(num2)).toFixed(3))).toString() 
}

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2)
    } else if(operator === '-') {
        return minus(num1, num2)
    } else if (operator === '*') {
        return multiply(num1, num2)
    } else if (operator === '/') {
        if (num2 === '0') {
            console.log("Don't you dare divide by zero!")
            return "ILLEGAL"
        } else {
            return divide(num1, num2)
        }
    }
}


function special_buttons(character) {
    if (character === 'AC') {
        firstNumber = null
        operator = null
        secondNumber = null
        screen.textContent = '0'
    } else if (character == '+/-') {
        if (firstNumber && !operator) {
            if (firstNumber.at(0) === '-') {
                firstNumber = firstNumber.slice(1)
                screen.textContent = firstNumber
            } else {
                screen.textContent = '-' + firstNumber
                firstNumber = screen.textContent
            }
        } else if (firstNumber && operate && secondNumber) {
            if (secondNumber.at(0) === '-') {
                secondNumber = secondNumber.slice(1)
                screen.textContent = secondNumber
            } else {
                screen.textContent = '-' + secondNumber
                secondNumber = screen.textContent
            }
        }
    }
}

calc_buttons.addEventListener('click', (e) => {
    if (e.target.className === 'numbers') {
        console.log('numbers')
        if (e.target.id == 'decimal') {
            console.log("Update the decimal button")
        } else {
            if (firstNumber === null) {
                screen.textContent = e.target.textContent
                firstNumber = screen.textContent
            } else if (firstNumber !== null && operator === null) {
                screen.textContent = screen.textContent + '' + e.target.textContent
                firstNumber = screen.textContent
            } else if (firstNumber !== null && operator !== null && secondNumber === null){
                screen.textContent = e.target.textContent
                secondNumber = screen.textContent
            } else if (firstNumber !== null && operator !== null && secondNumber !== null){
                screen.textContent = screen.textContent + '' + e.target.textContent
                secondNumber = screen.textContent
            }
        }
    } else if (e.target.className === 'symbols') {
        console.log('symbols')
        if (e.target.textContent === '=') {
            console.log(`${firstNumber} and ${secondNumber} and ${operator}`)
            if (firstNumber && operator && secondNumber) {
                // We have enough to evalue the expression
                screen.textContent = operate(operator, firstNumber, secondNumber)
                firstNumber = screen.textContent
                operator = null
                secondNumber = null
            }
            console.log("Handle the evaluation")
        } else {
            if (firstNumber && !operator) {
                console.log(e.target.textContent)
                screen.textContent = e.target.textContent
                operator = screen.textContent
            } else {
                console.log('Do nothing here because we need a number to be inputed')
            }
        }
    } else if (e.target.className === 'operators') {
        console.log('operators')
        special_buttons(e.target.textContent)
    }
})

