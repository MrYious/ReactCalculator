import { Text, TouchableHighlight } from 'react-native';

import Style from '../Style';

const InputButton = ({value, onPress}) => {
    return (
        <TouchableHighlight style={Style.inputButton}
                            underlayColor="#193441"
                            onPress={onPress}>
            <Text style={Style.inputButtonText}>{value}</Text>
        </TouchableHighlight>
    )
}

export default InputButton;