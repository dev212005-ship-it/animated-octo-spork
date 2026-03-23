import React, { useState } from 'react';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const handleNumberClick = (num) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    };

    const handleDecimalClick = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleOperationClick = (op) => {
        if (prevValue == null) {
            setPrevValue(display);
        } else if (operation) {
            const currentValue = prevValue;
            const newValue = calculate(currentValue, display, operation);
            setDisplay(String(newValue));
            setPrevValue(newValue);
        }
        setOperation(op);
        setWaitingForOperand(true);
    };

    const handleEqualsClick = () => {
        if (prevValue == null || operation == null) return;
        const newValue = calculate(prevValue, display, operation);
        setDisplay(String(newValue));
        setPrevValue(null);
        setOperation(null);
    };

    const handleClearClick = () => {
        setDisplay('0');
        setPrevValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const handleDeleteClick = () => {
        setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    };

    const handlePercentageClick = () => {
        setDisplay(String(Number(display) / 100));
    };

    const handleToggleSignClick = () => {
        setDisplay(String(-Number(display)));
    };

    const calculate = (x, y, operation) => {
        const numX = parseFloat(x);
        const numY = parseFloat(y);
        switch (operation) {
            case '+': return numX + numY;
            case '-': return numX - numY;
            case '*': return numX * numY;
            case '/': return numX / numY;
            default: return y;
        }
    };

    return (
        <div className="calculator">
            <div className="display">{display}</div>
            <div className="buttons">
                {/* Number buttons */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                    <button key={num} onClick={() => handleNumberClick(num)}>{num}</button>
                ))}
                <button onClick={handleDecimalClick}>.</button>
                <button onClick={() => handleOperationClick('+')}>+</button>
                <button onClick={() => handleOperationClick('-')}>−</button>
                <button onClick={() => handleOperationClick('*')}>×</button>
                <button onClick={() => handleOperationClick('/')}>÷</button>
                <button onClick={handleEqualsClick}>=</button>
                <button onClick={handleClearClick}>C</button>
                <button onClick={handleDeleteClick}>DEL</button>
                <button onClick={handlePercentageClick}>%</button>
                <button onClick={handleToggleSignClick}>±</button>
            </div>
        </div>
    );
};

export default Calculator;