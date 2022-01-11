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
    allButtons['clear'] = document.createElement('button');
    allButtons['clear'].textContent = 'Clear';
    calculatorBody.appendChild(allButtons['clear']).id = 'clear';

    for(let i = 1; i <= 10; i++){
        allButtons[`btn${i}`] = document.createElement('button');
        allButtons[`btn${i}`].textContent = i;
        allButtons[`btn${i}`].className = 'numButton';
        calculatorBody.appendChild(allButtons[`btn${i}`]).id=i;
        if(i===10){
            allButtons[`btn${i}`].textContent=0;
            allButtons[`btn${i}`].id=0;
        }
    }

    const operators = ['+', '-', '*', '/', '='];
    operators.forEach(btn =>{
        allButtons[`btn${btn}`] = document.createElement('button');
        allButtons[`btn${btn}`].textContent = btn;
        allButtons[`btn${btn}`].className = 'opButton';
        calculatorBody.appendChild(allButtons[`btn${btn}`]).id = btn;
    });
}

makeButtons();

function buttonClick(){
    const display = document.querySelector('#display');
    display.textContent = Math.random();
}

for (btn in allButtons){
    allButtons[btn].addEventListener('click', buttonClick);
}
