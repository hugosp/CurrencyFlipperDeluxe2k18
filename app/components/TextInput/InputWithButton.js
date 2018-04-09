import React from 'react';
import { PropTypes } from 'prop-types';
import color from 'color';

import { View, Text, TouchableHighlight, TextInput } from 'react-native';

import styles from './styles';


const InputWithButton = (props) => {
    const { onPress, buttonText, editable = true } = props;

    const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
        styles.$buttonBackgroundColorModifier,
    );

    const containerStyles = [styles.container];

    if (props.editable === false) {
        containerStyles.push(styles.containerDisabled);
    }

    const buttonTextStyles = [styles.buttonText];
    if(props.textColor) {
        buttonTextStyles.push({color: props.textColor});
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight underlayColor={underlayColor} style={styles.buttonContainer} onPress={onPress}>
                <Text style={buttonTextStyles}>{ buttonText }</Text>
            </TouchableHighlight>
            <View style={styles.border}>
                <TextInput style={styles.input} {...props}/>
            </View>
        </View>
    );
};

InputWithButton.propTypes = {
    onPress: PropTypes.func,
    buttonText: PropTypes.string,
    textColor: PropTypes.string,
    editable: PropTypes.bool,
}

export default InputWithButton;