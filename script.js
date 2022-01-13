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
    if(b===0){
        alert("Can't divide by zero. Clear calculator and try again.");
        return;
    }
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
let currentState = {
    valA: '',
    valB: '',
    display: '',
    changeValue: false,
    result: 0,
};

function displayClick(value){
    currentState['display'] += value.id;
    display.textContent = currentState['display'];
}

function getValB (){
    const valBArray = Array.from(currentState['display']);
    let position = valBArray.reverse().findIndex((element)=>{
        return isNaN(element);
    });

    position = valBArray.length - position - 1;

    console.log(position)

    console.log(currentState['display'].slice(position+1));
    return currentState['display'].slice(position+1);

}

buttons['clear'].addEventListener('click', ()=> {
    currentState['display'] = '';
    currentState['valA']='';
    //currentState['valAInt']= 0;
    currentState['valB']= '';
    //currentState['valBInt']=0;
    currentState['result']=0;
    currentState['changeValue']===false;
    display.textContent = currentState['display'];
});

const numButtonsArray = Array.from(document.querySelectorAll('.numButton'));
numButtonsArray.forEach(btn => btn.addEventListener('click', () => {
    displayClick(btn);
    if(currentState['changeValue']===false){
        currentState['valA']=currentState['display'];
        //currentState['valAInt']=parseInt(currentState['valA']);

        console.log(currentState);
    }
    else if(currentState['changeValue']===true){
        let valB = getValB();
        currentState['valB']= valB;
        //currentState['valBInt']=parseInt(currentState['valB']);

        console.log(currentState);
    }
}));

const opButtonsArray = Array.from(document.querySelectorAll('.opButton'));
opButtonsArray.forEach(btn => btn.addEventListener('click', () => {
    if(currentState['valB']){
        currentState['changeValue']=false;
        currentState['result'] = operate(currentState['operator'],parseInt(currentState['valA']),parseInt(currentState['valB']));
        currentState['valA'] = currentState['result'];
        currentState['valB'] = '';
    }

    currentState['operator']=btn.id;
    currentState['changeValue']=true;

    displayClick(btn);
    console.log(currentState);
}));

buttons['equals'].addEventListener('click',()=>{
    currentState['result'] = operate(currentState['operator'],parseInt(currentState['valA']),parseInt(currentState['valB']));
    currentState['valA'] = currentState['result'];
    display.textContent = currentState['valA'];
    currentState['valB'] = '';
    currentState['changeValue']=false;
    currentState['result']='';
    console.log(currentState);
});