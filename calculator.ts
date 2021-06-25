const powerOffOn = document.querySelector('.r_back'),
switchBtn = document.querySelectorAll('.switch'),
operation = document.querySelectorAll('.operation'),
operationDisplay: any = document.querySelector('.calculator-upper-screen-sign'),
screenFirstSign: any = document.querySelector('.calculator-upper-screen-sign-first'),
screenSecondSign: any = document.querySelector('.calculator-upper-screen-sign-second'),
firstDisplay: any = document.querySelector('.calculator-upper-screen-first'),
secondDisplay: any = document.querySelector('.calculator-upper-screen-second'),
firstRootSign: any = document.getElementById('firstRootSign'),
secondRootSign: any = document.getElementById('secondRootSign'),
mainDisplay: any = document.getElementById('mainDisplay'),
secondaryDisplay: any = document.getElementById('secondaryDisplay'),
mainSignDisplay: any = document.getElementById('mainSignDisplay'),
secondarySignDisplay: any = document.getElementById('secondarySignDisplay'),
tooltipContent: any = document.getElementById('tooltipContent');

var math_operation: string = '';
var first_sign_icon: string = '';
var second_sign_icon: string = '';
var firstRootLine: string = 'firstRootLine';
var secondRootLine: string = 'secondRootLine';
var tooltip_content: string = 'tooltip-content';
var rootLineWidth: number = 0.5;
var powerMove: number = 10;
var setRootLineWidth: number = 0;
var getLength: number = 0;
var setLength: number = 0;
var length: number = 0;


const mathOperations = [
  'fa-divide',
  'fa-times',
  'fa-minus',
  'fa-plus'
];

const firstScreenOperations = [
  'firstTwoInPower',
  'firstRootSign',
  'firstAbsSign'
];

const secondScreenOperations = [
  'secondTwoInPower',
  'secondRootSign',
  'secondAbsSign'
];

// window.addEventListener("load", () => {
//   powerOffOn?.classList.remove("r_backOn");
// })


switchBtn.forEach((items) => {
  items.addEventListener('click', () => {
    if (items.textContent?.match('off')) { 
      powerOffOn?.classList.remove('r_backOn'); clearEverything(); 
      firstDisplay.textContent = null;
  }

    else { powerOffOn?.classList.add('r_backOn'); firstDisplay.textContent = '0';}
  });
});

operation.forEach((items: any) => {
  items.addEventListener('click', (e: any) => {
    e.preventDefault();
    let data_id: any = items; data_id = parseInt(data_id.dataset.id);

    if (powerOffOn?.classList.contains('r_backOn')) {
      if (data_id <= 1) {
        if (items.textContent?.match("clr")) clearEverything();

        else if (length > 0) {
          if (length - 1 == 0) { 
            length = 0; firstDisplay.textContent = '0'; 
            if(first_sign_icon?.match('firstRootSign')){
              rootLineWidth = 1.6;
              firstRootSign.style.width = `${rootLineWidth}rem`;
            }
          }
          else { 
            length--; 
            if(firstDisplay.textContent[firstDisplay.textContent.length - 1]?.match('') == true) {
              rootLineWidth += 0.4; rootSignUnshift();
            }
            else if(first_sign_icon?.match('firstRootSign')){
              rootSignUnshift();
            }
            firstDisplay.textContent = firstDisplay.textContent.slice(0, -1); 
          }

          if (tooltipContent?.classList?.contains(tooltip_content)) removeClass(tooltipContent, tooltip_content);
        }
      }

      else if (data_id >= 2 && data_id <= 11) {
        if (length == 0 && items.textContent != '0') { 
          firstDisplay.textContent = items.textContent; length++; 
        }
        else if (length > 0 && length < 20) {
          firstDisplay.textContent += items.textContent; length++;
          if (first_sign_icon?.match("firstRootSign")) rootSignShift();
        }

        if (parseInt(firstDisplay.textContent.length) == 20) { 
          addClass(tooltipContent, tooltip_content);
        }

      }

      else if (data_id >= 12 && data_id <= 15) {
        let operationNumber = data_id - 12;
        removeClass(operationDisplay, math_operation);
        addClass(operationDisplay, mathOperations[operationNumber]); 
        if (secondDisplay.textContent.length == 0) { 
          changeDisplay(operationNumber); 
          if (tooltipContent?.classList?.contains(tooltip_content)) removeClass(tooltipContent, tooltip_content); }
        math_operation = mathOperations[operationNumber];
      }

      else if (data_id >= 16 && data_id <= 18) {
        let operationNumber = data_id - 16;
        if (first_sign_icon?.match(firstScreenOperations[operationNumber])) {
          removeFirstClasses(); first_sign_icon = '';
        }

        else {
          removeFirstClasses();
          if (firstScreenOperations[operationNumber].match('firstTwoInPower')) addClass(firstDisplay, firstScreenOperations[operationNumber]);
          else addClass(mainSignDisplay, firstScreenOperations[operationNumber]);
          first_sign_icon = firstScreenOperations[operationNumber];
        }
      }

      else {
        if (data_id == 19) {
          if (secondDisplay.textContent?.match('') == false) {
            let Fnumber = parseFloat(secondaryDisplay.textContent);
            let Snumber = parseFloat(firstDisplay.textContent);
            let percentage = (Snumber * Fnumber) / 100;
            secondDisplay.textContent = percentage;
            removeFirstClasses(); firstDisplay.textContent = '0';
            removeSecondClases(); length = 0;
          }
          else { 
            firstDisplay.textContent = '0'; length = 0; 
          }
          if(first_sign_icon?.match("firstRootSign")) {
            rootLineWidth = 1.6;
            firstRootSign.style.width = `${rootLineWidth}rem`;
          }
          
        }
        else if (data_id == 20 && firstDisplay.textContent.includes('.') == false && length < 20) {
          firstDisplay.textContent += items.textContent;
          length++; rootLineWidth -= 0.4;
          rootSignShift();
        }
        else if (data_id == 21 && secondDisplay.textContent?.match('') == false) { 
          displayResult(); 
          if (tooltipContent?.classList?.contains(tooltip_content)) removeClass(tooltipContent, tooltip_content);
        }
      }
    }
  })
})

function clearEverything() {
  if (math_operation.length > 0) { removeClass(operationDisplay, math_operation); math_operation = ''; }
  if (first_sign_icon.length > 0) { removeFirstClasses(); first_sign_icon = ''; }
  if (second_sign_icon.length > 0) { removeSecondClases(); second_sign_icon = ''; }
  if (firstDisplay.textContent.length > 0) firstDisplay.textContent = '0';
  if (secondDisplay.textContent.length > 0) secondDisplay.textContent = null;
  if (tooltipContent?.classList?.contains(tooltip_content)) removeClass(tooltipContent, tooltip_content);
  length = 0;
  rootLineWidth = 1;
}

function removeClass(block: any, operation: string) {
  if (block?.classList?.contains(operation) == true) {
    if (operation?.match('firstRootSign')) {
      firstRootSign.classList.remove(firstRootLine);
    }
    else if (operation?.match('secondRootSign')) {
      secondRootSign.classList.remove(secondRootLine);
    }
    block.classList.remove(operation);
  }

}

function addClass(block: any, operation: string) {
  if (operation?.match('firstRootSign')) {
    firstRootSign.classList.add(firstRootLine);
    shiftOperation(operation, 1.15);
  }
  else if (operation?.match('secondRootSign')) {
    secondRootSign.classList.add(secondRootLine);
    shiftOperation(operation, 0.85);
  }
  block?.classList?.add(operation);
}

function shiftOperation(operation: string, width: number) {
  if (firstDisplay.textContent.length != 0) getLength = parseInt(firstDisplay.textContent.length);
  else getLength = 0;
  let setLineWidth = ((10 * 0.5) + (10 * (width * getLength))) / 10;
  if (operation?.match('firstRootSign')) {
    if (setLength != getLength) { rootLineWidth = setLineWidth; setLength = getLength; }
    firstRootSign.style.width = `${rootLineWidth}rem`;
  }
  else if (operation?.match('secondRootSign')) {
    secondRootSign.style.width = `${setLineWidth}rem`;
  }
}

function rootSignShift() {
  rootLineWidth += 1.15;
  firstRootSign.style.width = `${rootLineWidth}rem`;
}

function rootSignUnshift() {
  rootLineWidth -= 1.15;
  firstRootSign.style.width = `${rootLineWidth}rem`;
}

function changeDisplay(operation: number) {
  secondDisplay.textContent = firstDisplay.textContent;
  if (secondDisplay.textContent[secondDisplay.textContent.length - 1] == '.') secondDisplay.textContent = secondDisplay.textContent.slice(0, -1);
  if (first_sign_icon.length > 0) {
    let operationNumber = findIndex(firstScreenOperations);
    removeFirstClasses();
    if (secondScreenOperations[operationNumber].match('secondTwoInPower')) addClass(secondDisplay, secondScreenOperations[operationNumber]);
    else addClass(secondarySignDisplay, secondScreenOperations[operationNumber]);
    second_sign_icon = secondScreenOperations[operationNumber];
    first_sign_icon = '';
  }
  firstDisplay.textContent = '0'; length = 0;
}

function findIndex(operation: Array<string>) {
  for (let i: number = 0; i < operation.length; i++) {
    if (operation[i]?.match(first_sign_icon)) return i;
  }
  return operation.length;
}

function performOperations(number: string, operation: string) {
  var newNumber : any = 0;
  if(operation?.match('firstTwoInPower') || operation?.match('secondTwoInPower')) {
    newNumber = parseFloat(number);
    newNumber **= 2;
  }
  else if(operation?.match('firstRootSign') || operation?.match('secondRootSign')) {
    newNumber = parseFloat(number);
    newNumber = Math.sqrt(newNumber)
  }
  else if(operation?.match('firstAbsSign') || operation?.match('secondAbsSign')) {
    newNumber = parseFloat(number);
    newNumber = newNumber - (newNumber * 2);
  }
  else newNumber = parseFloat(number);

  return newNumber
}

function performResult(Fnumber: number, Snumber: number, operation: string) {
  let result : number = 0;
  if(operation?.match('fa-divide')) result = Snumber / Fnumber;
  else if(operation?.match('fa-times')) result = Snumber * Fnumber;
  else if(operation?.match('fa-minus')) result = Snumber - Fnumber;
  else if(operation?.match('fa-plus')) result = Snumber + Fnumber;
  return result;
}

function displayResult() {
  let firstNumber = performOperations(firstDisplay.textContent, first_sign_icon);
  let secondNumber = performOperations(secondDisplay.textContent, second_sign_icon);
  let result = performResult(firstNumber, secondNumber, math_operation);
  removeFirstClasses(); removeSecondClases(); removeClass(operationDisplay, math_operation);
  first_sign_icon = second_sign_icon = '';
  if(isFinite(result) == false) {
    secondDisplay.textContent = '';
    firstDisplay.textContent = 'Your result is infinite';
    setTimeout(() => firstDisplay.textContent = '0', 1000);
  }
  else { 
  secondDisplay.textContent = result?.toString();
  if(secondDisplay.textContent.length > 20) secondDisplay.textContent = secondDisplay.textContent.slice(0, 20 - secondDisplay.textContent.length);
  firstDisplay.textContent = '0';
  } 
  length = 0; rootLineWidth = 1;
}

function removeFirstClasses() {
  removeClass(firstDisplay, first_sign_icon);
  removeClass(screenFirstSign, first_sign_icon);
  removeClass(mainSignDisplay, first_sign_icon);
}

function removeSecondClases() {
  removeClass(secondDisplay, second_sign_icon);
  removeClass(screenSecondSign, second_sign_icon);
  removeClass(secondarySignDisplay, second_sign_icon);
}



