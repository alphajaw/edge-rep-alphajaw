import { emiCalculator } from '../../scripts/aem.js';

document.addEventListener('DOMContentLoaded', function() {

    // VARIABLES
    var amount, percent, result;
    var calculator = document.querySelector('.calculator');
    var calculatorBill = calculator.querySelector('.calculator__bill');
    var calculatorTip = calculator.querySelector('.calculator__tip');
    var calculatorResult = calculator.querySelector('.calculator__result');
    var tipAmount = calculator.querySelector('.tip-amount');

    // INIT BILL
    tipAmount.textContent = calculatorTip.value + '%';
    amount = parseFloat(calculatorBill.value || 0);
    percent = parseFloat(calculatorTip.value || 0);
    result = amount + (amount * (percent / 100));
    calculatorResult.textContent = result.toFixed(2) + '$';

    // RANGE FUNCTION
    calculatorTip.addEventListener('input', function() {
        if (calculatorBill.value === '' || isNaN(calculatorBill.value)) {
            alert('Enter bill amount, please!');
        } else {
            amount = parseFloat(calculatorBill.value || 0);
        }

        tipAmount.textContent = calculatorTip.value + '%';
        percent = parseFloat(calculatorTip.value || 0);
        result = amount + (amount * (percent / 100));
        calculatorResult.textContent = result.toFixed(2) + '$';
    });

});
