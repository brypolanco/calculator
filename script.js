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
    for(let i = 0; i < 10; i++){
        const numButton = document.createElement('button');
        calculatorBody.appendChild(numButton).value=i;
    }
}

makeButtons();

console.log(operate(divide, 4, 4));