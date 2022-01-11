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


const display = document.querySelector('#display');
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


let displayArray = [];
function buttonClick(e){
    if (displayArray[0] == null){
        displayArray[0] = e.target.id;
        display.textContent = displayArray[0];
    }
    else if(displayArray){
        displayArray.push(e.target.id);
        display.textContent = displayArray.join("");
    }

    if(e.target.className === 'numButton'){
        let value1 = Number(e.target.id);
        console.log('value '+value1);
    }
    console.log(displayArray);
}

for (btn in allButtons){
    allButtons[btn].addEventListener('click', buttonClick);
}
