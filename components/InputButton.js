import {
    Text,
    View
} from 'react-native';

import Style from '../Style';

const InputButton = ({value}) => {
    return (
        <View style={Style.inputButton}>
            <Text style={Style.inputButtonText}>{value}</Text>
        </View>
    )
}

export default InputButton;