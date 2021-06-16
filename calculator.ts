const powerOffOn = document.querySelector('.r_back'),
number =  document.querySelectorAll('.number'),
switchBtn = document.querySelectorAll('.switch'),
operation = document.querySelectorAll('.operation'),
mainScreen = document.querySelector('.calculator-upper-screen'),
screenSign : any = document.querySelector('.calculator-screen-sign'),
numberDisplay : any = document.querySelector('.calculator-upper-screen-second'),
operationDisplay : any = document.querySelector(".calculator-upper-screen-sign");

var operation_icons : string[] = [];
var sign_icons : string[] = [];


const mathOperations = [ 
  "fa-divide", 
  "fa-times", 
  "fa-minus", 
  "fa-plus"
];

const screenOperations = [
  "rootSign",
  "raiseToPower",
  "absSign"
];

window.addEventListener("load", () => {
  powerOffOn?.classList.remove("r_backOn");
})


switchBtn.forEach((item) => {
  item.addEventListener('click', ()=> {
    if(item.textContent?.match('off')) { powerOffOn?.classList.remove('r_backOn'); }

    else { powerOffOn?.classList.add('r_backOn'); }
  });
});

operation.forEach((items) => {
  items.addEventListener('click', (e) => {
    e.preventDefault();
    let data : any = items; data = data.dataset.id;
    if(powerOffOn?.classList.contains('r_backOn')) {
      if(parseInt(data) <= 1) {
        if(items.textContent?.match("clr")) {
        }
      }
      else if(parseInt(data) >= 2 && parseInt(data) <= 11) {
        numberDisplay.textContent += items.textContent;
        //if(parseInt(numberDisplay.textContent) > 20) {}
      }
      else if(parseInt(data) >= 12 && parseInt(data) <= 15 && numberDisplay.textContent.length !== '') {
        let operationNumber = parseInt(data) - 12;
        if(operation_icons.length > 0) removeClass(operationDisplay, operation_icons.pop());
        addClass(operationDisplay, mathOperations[operationNumber]);
        operation_icons.push(mathOperations[operationNumber]);
      }
      else if(parseInt(data) >= 16 && parseInt(data) <= 18) {
        let operationNumber = parseInt(data) - 16;
        if(sign_icons.length > 0) {
          if(sign_icons[0].match(screenOperations[operationNumber])) removeClass(screenSign, sign_icons.pop());

          else {
          removeClass(screenSign, sign_icons.pop());
          addClass(screenSign, screenOperations[operationNumber]); 
          sign_icons.push(screenOperations[operationNumber]);
          }
        }
        else if (sign_icons.length === 0) { 
          addClass(screenSign, screenOperations[operationNumber]);
          sign_icons.push(screenOperations[operationNumber]);
        }
      }
      else {
          
      }
    }
  })
})

function removeClass(block: any, operation : any) {
  block.classList.remove(operation);
}

function addClass(block: any, operation : string) {
  block.classList.add(operation);
}




