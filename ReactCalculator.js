import { Text, View } from 'react-native';

import InputButton from './components/InputButton';
import Style from './Style';
import { useState } from 'react';

const inputButtons = [
  ['', '', 'C', 'CE'],
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+']
];

const ReactCalculator = () => {

  const [previousInputValue, setPreviousInputValue] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [inputDecimalValue, setInputDecimalValue] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [isDecimal, setIsDecimal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const renderInputButtons = () => {
    let views = [];

    for (var r = 0; r < inputButtons.length; r ++) {
      let row = inputButtons[r];

      let inputRow = [];
      for (var i = 0; i < row.length; i ++) {
        let input = row[i];

        inputRow.push(
          <InputButton
            value={input}
            highlight={selectedSymbol === input}
            onPress={()=>{onInputButtonPressed(input)}}
            key={r + "-" + i}
          />
        );
      }

      views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
    }

    return views;
  }

  const onInputButtonPressed = (input) => {
    if (errorMessage) {
      setErrorMessage('');
    }

    switch (typeof input) {
      case 'number':
        return handleNumberInput(input);
      case 'string':
        return handleStringInput(input);
    }
  }

  const handleNumberInput = (num) => {
    if (!isDecimal) {
      setInputValue((prev) => (prev * 10) + num);
    } else {
      setInputDecimalValue((prev) => prev + num);
    }
  }

  const handleStringInput = (str) => {
    switch (str) {
      case '/':
      case '*':
      case '+':
      case '-':
        const newPreviousInputValue = parseFloat(inputValue + '.' + inputDecimalValue)
        console.log("Hold: " + newPreviousInputValue);
        setPreviousInputValue(newPreviousInputValue);
        setSelectedSymbol(str);
        setInputValue(0);
        setIsDecimal(false);
        setInputDecimalValue('');
        break;

      case '=':
        if (selectedSymbol) {
          if ( selectedSymbol === '/' && inputValue === 0 && parseInt(inputDecimalValue || 0) === 0 ) {
            handleStringInput('CE');
            setErrorMessage('Cannot Divide by Zero');
            return;
          }

          const newInputValue = parseFloat(inputValue + '.' + inputDecimalValue)
          const result = eval(previousInputValue + selectedSymbol + newInputValue);
          console.log("Current: " + newInputValue);
          console.log("Result: " + result);

          if (!Number.isInteger(result)) {
            const values = result.toString().split('.');
            setIsDecimal(true);
            setInputValue(parseInt(values.at(0)));
            setInputDecimalValue(values.at(1));
          } else {
            setIsDecimal(false);
            setInputValue(result);
            setInputDecimalValue('');
          }

          setPreviousInputValue(0);
          setSelectedSymbol(null);
        }
        break;

      case '.':
        if (isDecimal && inputDecimalValue === '') {
          setIsDecimal(false);
        } else if (!isDecimal) {
          setIsDecimal(true);
        }
        break;

      case 'C':
        if (isDecimal) {
          if (inputDecimalValue) {
            const newInputDecimalValue = inputDecimalValue.toString().slice(0, -1);
            setInputDecimalValue(newInputDecimalValue || '');
          } else {
            setIsDecimal(false);
          }
        } else if (inputValue !== 0) {
          const newInputValue = parseInt(inputValue.toString().slice(0, -1));
          setInputValue(newInputValue || 0);
        }
        break;

      case 'CE':
        setPreviousInputValue(0);
        setInputValue(0);
        setSelectedSymbol(null);
        setIsDecimal(false);
        setInputDecimalValue('');
        setErrorMessage('')
        break;
    }
  }

  return (
    <View style={Style.rootContainer}>
      <View style={Style.displayContainer}>
        <Text style={Style.displayText}>
          {inputValue + (isDecimal && '.' + inputDecimalValue)}
        </Text>
        {
          errorMessage && <Text style={Style.displayErrorMessage}>
            {errorMessage}
          </Text>
        }
      </View>
      <View style={Style.inputContainer}>
        {renderInputButtons()}
      </View>
    </View>
  );
}

export default ReactCalculator;
