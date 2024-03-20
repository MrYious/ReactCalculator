import { Text, TouchableHighlight } from 'react-native';

import Style from '../Style';

const InputButton = ({value, onPress, highlight}) => {
    return (
        <TouchableHighlight style={[Style.inputButton, highlight ? Style.inputButtonHighlighted : null]}
                            underlayColor="#193441"
                            onPress={onPress}>
            <Text style={Style.inputButtonText}>{value}</Text>
        </TouchableHighlight>
    )
}

export default InputButton;