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

const calculatorBody = document.querySelector('#calculator-container');

function makeButtons(){
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    calculatorBody.appendChild(clearButton).id = 'clear';

    for(let i = 1; i <= 10; i++){
        const numButton = document.createElement('button');
        numButton.textContent = i;
        calculatorBody.appendChild(numButton).value=i;
        if(i===10){
            numButton.textContent=0;
            numButton.value=0;
        }
    }

    const operators = ['+', '-', '*', '/', '='];
    operators.forEach(btn =>{
        const opButton = document.createElement('button');
        opButton.textContent = btn;
        calculatorBody.appendChild(opButton).id = btn;
    });
}

makeButtons();

console.log(operate(divide, 4, 4));