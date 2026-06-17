let parent = document.querySelector('.parent');
let history = document.querySelector('.inp_div2');
let input = document.querySelector('input');

let expression = '';

parent.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    let value = e.target.textContent;

    if (value === 'C') {
        expression = expression.slice(0, -1);
        input.value = expression;
        return;
    }

    if (value === 'Clear') {
        expression = '';
        input.value = '';
        history.textContent = '';
        return;
    }
    if (value === '=') {
        try {
            let exp = expression.replace(/X/g, '*');
            let operators = ['+', '-', '*', '/', '%'];
            let operator = '';

            for (let op of operators) {
                if (exp.includes(op)) {
                    operator = op;
                    break;
                }
            }
            if (!operator) return;
            let parts = exp.split(operator);
            let num1 = Number(parts[0]);
            let num2 = Number(parts[1]);
            let result;
            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
                case '%':
                    result = num1 % num2;
                    break;
            }
            history.textContent = result; 
            input.value = '';            
            expression = '';            
        } catch {
            input.value = 'Error';
        }
        return;
    }
    expression += value;
    input.value = expression;
});