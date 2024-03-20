import { Text, View } from 'react-native';

import InputButton from './components/InputButton';
import Style from './Style';

const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+']
];

const ReactCalculator = () => {

  const renderInputButtons = () => {
    let views = [];

    for (var r = 0; r < inputButtons.length; r ++) {
      let row = inputButtons[r];

      let inputRow = [];
      for (var i = 0; i < row.length; i ++) {
        let input = row[i];

        inputRow.push(
          <InputButton value={input} key={r + "-" + i} />
        );
      }

      views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
    }

    return views;
  }

  return (
    <View style={Style.rootContainer}>
      <View style={Style.displayContainer}></View>
      <View style={Style.inputContainer}>
        {renderInputButtons()}
      </View>
    </View>
  );
}

export default ReactCalculator;
