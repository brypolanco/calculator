//Operations
function add(a,b){
    let result = a+b;
    result = resultRound(result);
    return result;
}

function subtract(a,b){
    let result = a-b;
    result = resultRound(result);
    return result;
}

function multiply(a,b){
    let result = a*b;
    result = resultRound(result);
    return result;
}

function divide(a,b){
    if(b==0){
        alert("Can't divide by zero. Clear calculator and try again.");
        return;
    }
    let result = a/b;
    result = resultRound(result);
    return result;
}

function resultRound(result){
    return Math.round((result + Number.EPSILON) * 100) / 100;
}

function operate(sign, a, b){
    let aFloat = parseFloat(a);
    let bFloat = parseFloat(b);

    switch(sign){
        case '+':
            return add(aFloat,bFloat);
        case '-':
            return subtract(aFloat,bFloat);
        case '*':
            return multiply(aFloat,bFloat);
        case '/':
            return divide(aFloat,bFloat);
        default:
            break;
    }
    
}


//Button Creations
function makeButtons(){
    const calculatorBody = document.querySelector('#calculator-container');
    const display = document.createElement('div');
    display.textContent = '0';
    calculatorBody.appendChild(display).id = 'display';
    const buttonContainer = document.createElement('div');
    calculatorBody.appendChild(buttonContainer).id = 'button-container';

    let allButtons = {};
    allButtons['clear'] = document.createElement('button');
    allButtons['clear'].textContent = 'AC';
    buttonContainer.appendChild(allButtons['clear']).id = 'clear';
    
    let start = 7;
    for(let row = 0; row < 4; row++){
        if(row===3){
            start = 0;
        }
        let temp = start;
        for(let col=0; col<3; col++){
            let i = temp;
            allButtons[`btn${i}`] = document.createElement('button');
            allButtons[`btn${i}`].textContent = i;
            allButtons[`btn${i}`].className = 'numButton';
            allButtons[`btn${i}`].value = i;
            buttonContainer.appendChild(allButtons[`btn${i}`]).id=`num${i}`;
            if(i===0){
                break;
            }
            temp++;
        }
        start -= 3;
    }

    const operators = {divide: '/', multiply: '*', subtract: '-', add: '+'};
    for(let btn in operators){
        allButtons[`btn${btn}`] = document.createElement('button');
        allButtons[`btn${btn}`].textContent = operators[btn];
        allButtons[`btn${btn}`].className = 'opButton';
        allButtons[`btn${btn}`].value = operators[btn];
        buttonContainer.appendChild(allButtons[`btn${btn}`]).id = btn;
    }

    allButtons['dot'] = document.createElement('button');
    allButtons['dot'].textContent = '.';
    allButtons['dot'].value = '.';
    buttonContainer.appendChild(allButtons['dot']).id = 'dot';

    allButtons['equals'] = document.createElement('button');
    allButtons['equals'].textContent = '=';
    allButtons['equals'].value = '=';
    buttonContainer.appendChild(allButtons['equals']).id = 'equals';

    return allButtons;
}
const buttons = makeButtons();


//Button Event Listeners
let currentState = {
    valA: '',
    valB: '',
    display: '',
    changeValue: false,
    result: '',
};

function displayClick(btnVal){
    currentState['display'] += btnVal.value;
    display.textContent = currentState['display'];
}

function getValB (){
    const valBArray = Array.from(currentState['display']);
    let position = valBArray.reverse().findIndex((element)=>{
        if(isNaN(element)){
            if(element!='.'){
                return isNaN(element);
            }
        }
    });

    position = valBArray.length - position - 1;
    return currentState['display'].slice(position+1);

}

function clear(...objKey){
    objKey.forEach((key)=>{
        if(typeof currentState[key]==='string'){
            currentState[key]='';
        }
        else if(typeof currentState[key]==='number'){
            currentState[key]=0;
        }
        else if(typeof currentState[key]==='boolean'){
            currentState[key]=false;
        }
        else{
            currentState[key]=null;
        }
    });
}

buttons['clear'].addEventListener('click', ()=> {
    clear('display','valA','valB','result','operator','changeValue');
    display.textContent = currentState['display'];
});

buttons['dot'].addEventListener('click', () => displayClick(buttons['dot']));

buttons['equals'].addEventListener('click',()=>{
    if(currentState['display']===''||currentState['valB']===''){
        return alert('Must have values to perform calculations');
    }
    currentState['result'] = operate(currentState['operator'],currentState['valA'],currentState['valB']).toString();
    currentState['display'] = currentState['result'];
    display.textContent = currentState['result'];
    currentState['valA']=currentState['result']
    clear('valB','result','operator','changeValue');
});

const numButtonsArray = Array.from(document.querySelectorAll('.numButton'));
numButtonsArray.forEach(btn => btn.addEventListener('click', () => {
    displayClick(btn);
    if(currentState['changeValue']===false){
        currentState['valA']=currentState['display'];
    }
    else if(currentState['changeValue']===true){
        let valB = getValB();
        currentState['valB']= valB;
    }
}));

const opButtonsArray = Array.from(document.querySelectorAll('.opButton'));
opButtonsArray.forEach(btn => btn.addEventListener('click', () => {
    if(currentState['valB']){
        currentState['changeValue']=false;
        currentState['result'] = operate(currentState['operator'],currentState['valA'],currentState['valB']).toString();
        currentState['valA'] = currentState['result'];
        clear('valB');
    }

    currentState['operator']=btn.value;
    currentState['changeValue']=true;
    displayClick(btn);
}));
