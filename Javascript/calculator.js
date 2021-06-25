"use strict";
var powerOffOn = document.querySelector('.r_back'), switchBtn = document.querySelectorAll('.switch'), operation = document.querySelectorAll('.operation'), operationDisplay = document.querySelector('.calculator-upper-screen-sign'), screenFirstSign = document.querySelector('.calculator-upper-screen-sign-first'), screenSecondSign = document.querySelector('.calculator-upper-screen-sign-second'), firstDisplay = document.querySelector('.calculator-upper-screen-first'), secondDisplay = document.querySelector('.calculator-upper-screen-second'), firstRootSign = document.getElementById('firstRootSign'), secondRootSign = document.getElementById('secondRootSign'), mainDisplay = document.getElementById('mainDisplay'), secondaryDisplay = document.getElementById('secondaryDisplay'), mainSignDisplay = document.getElementById('mainSignDisplay'), secondarySignDisplay = document.getElementById('secondarySignDisplay'), tooltipContent = document.getElementById('tooltipContent');
var math_operation = '';
var first_sign_icon = '';
var second_sign_icon = '';
var firstRootLine = 'firstRootLine';
var secondRootLine = 'secondRootLine';
var tooltip_content = 'tooltip-content';
var rootLineWidth = 0.5;
var powerMove = 10;
var setRootLineWidth = 0;
var getLength = 0;
var setLength = 0;
var length = 0;
var mathOperations = [
    'fa-divide',
    'fa-times',
    'fa-minus',
    'fa-plus'
];
var firstScreenOperations = [
    'firstTwoInPower',
    'firstRootSign',
    'firstAbsSign'
];
var secondScreenOperations = [
    'secondTwoInPower',
    'secondRootSign',
    'secondAbsSign'
];
switchBtn.forEach(function (items) {
    items.addEventListener('click', function () {
        var _a;
        if ((_a = items.textContent) === null || _a === void 0 ? void 0 : _a.match('off')) {
            powerOffOn === null || powerOffOn === void 0 ? void 0 : powerOffOn.classList.remove('r_backOn');
            clearEverything();
            firstDisplay.textContent = null;
        }
        else {
            powerOffOn === null || powerOffOn === void 0 ? void 0 : powerOffOn.classList.add('r_backOn');
            firstDisplay.textContent = '0';
        }
    });
});
operation.forEach(function (items) {
    items.addEventListener('click', function (e) {
        var _a, _b, _c, _d, _e, _f;
        e.preventDefault();
        var data_id = items;
        data_id = parseInt(data_id.dataset.id);
        if (powerOffOn === null || powerOffOn === void 0 ? void 0 : powerOffOn.classList.contains('r_backOn')) {
            if (data_id <= 1) {
                if ((_a = items.textContent) === null || _a === void 0 ? void 0 : _a.match("clr"))
                    clearEverything();
                else if (length > 0) {
                    if (length - 1 == 0) {
                        length = 0;
                        firstDisplay.textContent = '0';
                        if (first_sign_icon === null || first_sign_icon === void 0 ? void 0 : first_sign_icon.match('firstRootSign')) {
                            rootLineWidth = 1.6;
                            firstRootSign.style.width = rootLineWidth + "rem";
                        }
                    }
                    else {
                        length--;
                        if (((_b = firstDisplay.textContent[firstDisplay.textContent.length - 1]) === null || _b === void 0 ? void 0 : _b.match('')) == true) {
                            rootLineWidth += 0.4;
                            rootSignUnshift();
                        }
                        else if (first_sign_icon === null || first_sign_icon === void 0 ? void 0 : first_sign_icon.match('firstRootSign')) {
                            rootSignUnshift();
                        }
                        firstDisplay.textContent = firstDisplay.textContent.slice(0, -1);
                    }
                    if ((_c = tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.classList) === null || _c === void 0 ? void 0 : _c.contains(tooltip_content))
                        removeClass(tooltipContent, tooltip_content);
                }
            }
            else if (data_id >= 2 && data_id <= 11) {
                if (length == 0 && items.textContent != '0') {
                    firstDisplay.textContent = items.textContent;
                    length++;
                }
                else if (length > 0 && length < 20) {
                    firstDisplay.textContent += items.textContent;
                    length++;
                    if (first_sign_icon === null || first_sign_icon === void 0 ? void 0 : first_sign_icon.match("firstRootSign"))
                        rootSignShift();
                }
                if (parseInt(firstDisplay.textContent.length) == 20) {
                    addClass(tooltipContent, tooltip_content);
                }
            }
            else if (data_id >= 12 && data_id <= 15) {
                var operationNumber = data_id - 12;
                removeClass(operationDisplay, math_operation);
                addClass(operationDisplay, mathOperations[operationNumber]);
                if (secondDisplay.textContent.length == 0) {
                    changeDisplay(operationNumber);
                    if ((_d = tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.classList) === null || _d === void 0 ? void 0 : _d.contains(tooltip_content))
                        removeClass(tooltipContent, tooltip_content);
                }
                math_operation = mathOperations[operationNumber];
            }
            else if (data_id >= 16 && data_id <= 18) {
                var operationNumber = data_id - 16;
                if (first_sign_icon === null || first_sign_icon === void 0 ? void 0 : first_sign_icon.match(firstScreenOperations[operationNumber])) {
                    removeFirstClasses();
                    first_sign_icon = '';
                }
                else {
                    removeFirstClasses();
                    if (firstScreenOperations[operationNumber].match('firstTwoInPower'))
                        addClass(firstDisplay, firstScreenOperations[operationNumber]);
                    else
                        addClass(mainSignDisplay, firstScreenOperations[operationNumber]);
                    first_sign_icon = firstScreenOperations[operationNumber];
                }
            }
            else {
                if (data_id == 19) {
                    if (secondDisplay.textContent.length > 0) {
                        var Fnumber = parseFloat(secondaryDisplay.textContent);
                        var Snumber = parseFloat(firstDisplay.textContent);
                        var percentage = (Snumber * Fnumber) / 100;
                        secondDisplay.textContent = percentage;
                        removeFirstClasses();
                        firstDisplay.textContent = '0';
                        removeSecondClases();
                        length = 0;
                    }
                    else {
                        firstDisplay.textContent = '0';
                        length = 0;
                    }
                    if (first_sign_icon === null || first_sign_icon === void 0 ? void 0 : first_sign_icon.match("firstRootSign")) {
                        rootLineWidth = 1.6;
                        firstRootSign.style.width = rootLineWidth + "rem";
                    }
                }
                else if (data_id == 20 && firstDisplay.textContent.includes('.') == false && length < 20) {
                    firstDisplay.textContent += items.textContent;
                    length++;
                    rootLineWidth -= 0.4;
                    rootSignShift();
                }
                else if (data_id == 21 && ((_e = secondDisplay.textContent) === null || _e === void 0 ? void 0 : _e.match('')) == false) {
                    displayResult();
                    if ((_f = tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.classList) === null || _f === void 0 ? void 0 : _f.contains(tooltip_content))
                        removeClass(tooltipContent, tooltip_content);
                }
            }
        }
    });
});
function clearEverything() {
    var _a;
    if (math_operation.length > 0) {
        removeClass(operationDisplay, math_operation);
        math_operation = '';
    }
    if (first_sign_icon.length > 0) {
        removeFirstClasses();
        first_sign_icon = '';
    }
    if (second_sign_icon.length > 0) {
        removeSecondClases();
        second_sign_icon = '';
    }
    if (firstDisplay.textContent.length > 0)
        firstDisplay.textContent = '0';
    if (secondDisplay.textContent.length > 0)
        secondDisplay.textContent = null;
    if ((_a = tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.classList) === null || _a === void 0 ? void 0 : _a.contains(tooltip_content))
        removeClass(tooltipContent, tooltip_content);
    length = 0;
    rootLineWidth = 1;
}
function removeClass(block, operation) {
    var _a;
    if (((_a = block === null || block === void 0 ? void 0 : block.classList) === null || _a === void 0 ? void 0 : _a.contains(operation)) == true) {
        if (operation === null || operation === void 0 ? void 0 : operation.match('firstRootSign')) {
            firstRootSign.classList.remove(firstRootLine);
        }
        else if (operation === null || operation === void 0 ? void 0 : operation.match('secondRootSign')) {
            secondRootSign.classList.remove(secondRootLine);
        }
        block.classList.remove(operation);
    }
}
function addClass(block, operation) {
    var _a;
    if (operation === null || operation === void 0 ? void 0 : operation.match('firstRootSign')) {
        firstRootSign.classList.add(firstRootLine);
        shiftOperation(operation, 1.15);
    }
    else if (operation === null || operation === void 0 ? void 0 : operation.match('secondRootSign')) {
        secondRootSign.classList.add(secondRootLine);
        shiftOperation(operation, 0.85);
    }
    (_a = block === null || block === void 0 ? void 0 : block.classList) === null || _a === void 0 ? void 0 : _a.add(operation);
}
function shiftOperation(operation, width) {
    if (firstDisplay.textContent.length != 0)
        getLength = parseInt(firstDisplay.textContent.length);
    else
        getLength = 0;
    var setLineWidth = ((10 * 0.5) + (10 * (width * getLength))) / 10;
    if (operation === null || operation === void 0 ? void 0 : operation.match('firstRootSign')) {
        if (setLength != getLength) {
            rootLineWidth = setLineWidth;
            setLength = getLength;
        }
        firstRootSign.style.width = rootLineWidth + "rem";
    }
    else if (operation === null || operation === void 0 ? void 0 : operation.match('secondRootSign')) {
        secondRootSign.style.width = setLineWidth + "rem";
    }
}
function rootSignShift() {
    rootLineWidth += 1.15;
    firstRootSign.style.width = rootLineWidth + "rem";
}
function rootSignUnshift() {
    rootLineWidth -= 1.15;
    firstRootSign.style.width = rootLineWidth + "rem";
}
function changeDisplay(operation) {
    secondDisplay.textContent = firstDisplay.textContent;
    if (secondDisplay.textContent[secondDisplay.textContent.length - 1] == '.')
        secondDisplay.textContent = secondDisplay.textContent.slice(0, -1);
    if (first_sign_icon.length > 0) {
        var operationNumber = findIndex(firstScreenOperations);
        removeFirstClasses();
        if (secondScreenOperations[operationNumber].match('secondTwoInPower'))
            addClass(secondDisplay, secondScreenOperations[operationNumber]);
        else
            addClass(secondarySignDisplay, secondScreenOperations[operationNumber]);
        second_sign_icon = secondScreenOperations[operationNumber];
        first_sign_icon = '';
    }
    firstDisplay.textContent = '0';
    length = 0;
}
function findIndex(operation) {
    var _a;
    for (var i = 0; i < operation.length; i++) {
        if ((_a = operation[i]) === null || _a === void 0 ? void 0 : _a.match(first_sign_icon))
            return i;
    }
    return operation.length;
}
function performOperations(number, operation) {
    var newNumber = 0;
    if ((operation === null || operation === void 0 ? void 0 : operation.match('firstTwoInPower')) || (operation === null || operation === void 0 ? void 0 : operation.match('secondTwoInPower'))) {
        newNumber = parseFloat(number);
        newNumber = Math.pow(newNumber, 2);
    }
    else if ((operation === null || operation === void 0 ? void 0 : operation.match('firstRootSign')) || (operation === null || operation === void 0 ? void 0 : operation.match('secondRootSign'))) {
        newNumber = parseFloat(number);
        newNumber = Math.sqrt(newNumber);
    }
    else if ((operation === null || operation === void 0 ? void 0 : operation.match('firstAbsSign')) || (operation === null || operation === void 0 ? void 0 : operation.match('secondAbsSign'))) {
        newNumber = parseFloat(number);
        newNumber = newNumber - (newNumber * 2);
    }
    else
        newNumber = parseFloat(number);
    return newNumber;
}
function performResult(Fnumber, Snumber, operation) {
    var result = 0;
    if (operation === null || operation === void 0 ? void 0 : operation.match('fa-divide'))
        result = Snumber / Fnumber;
    else if (operation === null || operation === void 0 ? void 0 : operation.match('fa-times'))
        result = Snumber * Fnumber;
    else if (operation === null || operation === void 0 ? void 0 : operation.match('fa-minus'))
        result = Snumber - Fnumber;
    else if (operation === null || operation === void 0 ? void 0 : operation.match('fa-plus'))
        result = Snumber + Fnumber;
    return result;
}
function displayResult() {
    var firstNumber = performOperations(firstDisplay.textContent, first_sign_icon);
    var secondNumber = performOperations(secondDisplay.textContent, second_sign_icon);
    var result = performResult(firstNumber, secondNumber, math_operation);
    removeFirstClasses();
    removeSecondClases();
    removeClass(operationDisplay, math_operation);
    first_sign_icon = second_sign_icon = '';
    if (isFinite(result) == false) {
        secondDisplay.textContent = '';
        firstDisplay.textContent = 'Your result is infinite';
        setTimeout(function () { return firstDisplay.textContent = '0'; }, 1000);
    }
    else {
        secondDisplay.textContent = result === null || result === void 0 ? void 0 : result.toString();
        if (secondDisplay.textContent.length > 20)
            secondDisplay.textContent = secondDisplay.textContent.slice(0, 20 - secondDisplay.textContent.length);
        firstDisplay.textContent = '0';
    }
    length = 0;
    rootLineWidth = 1;
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
//# sourceMappingURL=calculator.js.map