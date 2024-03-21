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
  const [selectedSymbol, setSelectedSymbol] = useState(null)

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
    switch (typeof input) {
      case 'number':
        return handleNumberInput(input);
      case 'string':
        return handleStringInput(input);
    }
  }

  const handleNumberInput = (num) => {
    setInputValue((prev) => (prev * 10) + num);
  }

  const handleStringInput = (str) => {
    switch (str) {
      case '/':
      case '*':
      case '+':
      case '-':
        setSelectedSymbol(str);
        setPreviousInputValue(inputValue);
        setInputValue(0);
        break;
      case '=':
        if (!selectedSymbol) {
          return;
        }
        setPreviousInputValue(0);
        setInputValue(eval(previousInputValue + selectedSymbol + inputValue));
        setSelectedSymbol(null);
        break;
      case 'C':
        setInputValue((prev) => (prev - (prev % 10)) / 10);
        break;
      case 'CE':
        setPreviousInputValue(0);
        setInputValue(0);
        setSelectedSymbol(null);
        break;
   }
  }

  return (
    <View style={Style.rootContainer}>
      <View style={Style.displayContainer}>
        <Text style={Style.displayText}>{inputValue}</Text>
      </View>
      <View style={Style.inputContainer}>
        {renderInputButtons()}
      </View>
    </View>
  );
}

export default ReactCalculator;
