import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

const IS_ANDROID = Platform.OS === 'ios' ? false : true;

class AlertProvider extends Component {
  static childContextTypes = {
    alertWithType: PropTypes.func,
    alert: PropTypes.func,
  };

  static propTypes = {
    children: PropTypes.any,
  };

  getChildContext() {
    return {
      alert: (...args) => this.dropdown.alert(...args),
      alertWithType: (...args) => this.dropdown.alertWithType(...args),
    };
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        {React.Children.only(this.props.children)}
        <DropdownAlert
          ref={(ref) => {
            this.dropdown = ref;
          }}
          defaultContainer={{ padding: 8, paddingTop: IS_ANDROID ? 20 : 0, flexDirection: 'row' }}
        />
      </View>
    );
  }
}

export default AlertProvider;