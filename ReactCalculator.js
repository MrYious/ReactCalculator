import { Text, View } from 'react-native';

import Style from './Style';

const ReactCalculator = () => {

  return (
    <View style={Style.rootContainer}>
      <View style={Style.displayContainer}></View>
      <View style={Style.inputContainer}></View>
    </View>
  );
}

export default ReactCalculator;
