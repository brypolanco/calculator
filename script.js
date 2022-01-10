function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(sign, a, b){
    switch(sign){
        case add:
            return add(a,b);
        case subtract:
            return subtract(a,b);
        case multiply:
            return multiply(a,b);
        case divide:
            return divide(a,b);
        default:
            break;
    }
    
}

let allButtons = {};
const calculatorBody = document.querySelector('#calculator-container');

function makeButtons(){
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    calculatorBody.appendChild(clearButton).id = 'clear';

    for(let i = 1; i <= 10; i++){
        allButtons[`btn${i}`] = document.createElement('button');
        allButtons[`btn${i}`].textContent = i;
        calculatorBody.appendChild(allButtons[`btn${i}`]).value=i;
        if(i===10){
            allButtons[`btn${i}`].textContent=0;
            allButtons[`btn${i}`].value=0;
        }
    }

    const operators = ['+', '-', '*', '/', '='];
    operators.forEach(btn =>{
        allButtons[`btn${btn}`] = document.createElement('button');
        allButtons[`btn${btn}`].textContent = btn;
        calculatorBody.appendChild(allButtons[`btn${btn}`]).id = btn;
    });
}

makeButtons();

console.log(allButtons);

