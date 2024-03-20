import {
    Text,
    View
} from 'react-native';

import Style from '../Style';

export const InputButton = () => {
    return (
        <View style={Style.inputButton}>
            <Text style={Style.inputButtonText}>{this.props.value}</Text>
        </View>
    )
}