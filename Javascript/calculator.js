"use strict";
var powerOffOn = document.querySelector('.r_back'), number = document.querySelectorAll('.number'), switchBtn = document.querySelectorAll('.switch'), operation = document.querySelectorAll('.operation'), mainScreen = document.querySelector('.calculator-upper-screen'), screenSign = document.querySelector('.calculator-screen-sign'), numberDisplay = document.querySelector('.calculator-upper-screen-second'), operationDisplay = document.querySelector(".calculator-upper-screen-sign");
var operation_icons = [];
var sign_icons = [];
var mathOperations = [
    "fa-divide",
    "fa-times",
    "fa-minus",
    "fa-plus"
];
var screenOperations = [
    "rootSign",
    "raiseToPower",
    "absSign"
];
window.addEventListener("load", function () {
    powerOffOn === null || powerOffOn === void 0 ? void 0 : powerOffOn.classList.remove("r_backOn");
});
switchBtn.forEach(function (item) {
    item.addEventListener('click', function () {
        var _a;
        if ((_a = item.textContent) === null || _a === void 0 ? void 0 : _a.match('off')) {
            powerOffOn === null || powerOffOn === void 0 ? void 0 : powerOffOn.classList.remove('r_backOn');
        }
        else {
            powerOffOn === null || powerOffOn === void 0 ? void 0 : powerOffOn.classList.add('r_backOn');
        }
    });
});
operation.forEach(function (items) {
    items.addEventListener('click', function (e) {
        var _a;
        e.preventDefault();
        var data = items;
        data = data.dataset.id;
        if (powerOffOn === null || powerOffOn === void 0 ? void 0 : powerOffOn.classList.contains('r_backOn')) {
            if (parseInt(data) <= 1) {
                if ((_a = items.textContent) === null || _a === void 0 ? void 0 : _a.match("clr")) {
                }
            }
            else if (parseInt(data) >= 2 && parseInt(data) <= 11) {
                numberDisplay.textContent += items.textContent;
                //if(parseInt(numberDisplay.textContent) > 20) {}
            }
            else if (parseInt(data) >= 12 && parseInt(data) <= 15 && numberDisplay.textContent.length !== '') {
                var operationNumber = parseInt(data) - 12;
                if (operation_icons.length > 0)
                    removeClass(operationDisplay, operation_icons.pop());
                addClass(operationDisplay, mathOperations[operationNumber]);
                operation_icons.push(mathOperations[operationNumber]);
            }
            else if (parseInt(data) >= 16 && parseInt(data) <= 18) {
                var operationNumber = parseInt(data) - 16;
                if (sign_icons.length > 0) {
                    if (sign_icons[0].match(screenOperations[operationNumber]))
                        removeClass(screenSign, sign_icons.pop());
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
    });
});
function removeClass(block, operation) {
    block.classList.remove(operation);
}
function addClass(block, operation) {
    block.classList.add(operation);
}
//# sourceMappingURL=calculator.js.map