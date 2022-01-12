//Operations
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
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        default:
            break;
    }
    
}


//Button Creations
const display = document.querySelector('#display');
const calculatorBody = document.querySelector('#calculator-container');

function makeButtons(){
    let allButtons = {};
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

    allButtons['equals'] = document.createElement('button');
    allButtons['equals'].textContent = '=';
    calculatorBody.appendChild(allButtons['equals']).id = '=';

    const operators = ['+', '-', '*', '/'];
    operators.forEach(btn =>{
        allButtons[`btn${btn}`] = document.createElement('button');
        allButtons[`btn${btn}`].textContent = btn;
        allButtons[`btn${btn}`].className = 'opButton';
        calculatorBody.appendChild(allButtons[`btn${btn}`]).id = btn;
    });

    return allButtons;
}
const buttons = makeButtons();


//Button Event Listeners
//let displayArray = [];
let currentState = {
    valueA: [],
    valueB: [],
    display: '',
};

function buttonClick(value){
    currentState['display'] += String(value.id);
    display.textContent = currentState['display'];
    console.log(currentState['display']);
}

buttons['clear'].addEventListener('click', ()=> {
    currentState['display'] = '';
    display.textContent = currentState['display'];
});

const numButtonsArray = Array.from(document.querySelectorAll('.numButton'));
numButtonsArray.forEach(btn => btn.addEventListener('click', () => buttonClick(btn)));

const opButtonsArray = Array.from(document.querySelectorAll('.opButton'));
opButtonsArray.forEach(btn => btn.addEventListener('click', () => {
    buttonClick(btn);
    currentState['operator']=btn.id;
}));

console.log(opButtonsArray);