import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView }  from 'react-native';
import { connect } from 'react-redux';

import { Logo }             from '../components/Logo';
import { ClearButton }      from '../components/Button';
import { Container }        from '../components/Container';
import { InputWithButton }  from '../components/TextInput';
import { LastConverted }    from '../components/Text';
import { Header }           from '../components/Header';
import { connectAlert }     from '../components/Alert';

import { swapCurrency, changeCurrencyAmount, getInitialConversion }     from '../actions/currencies';

class Home extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        amount: PropTypes.number,
        quotePrice: PropTypes.number,
        isFetching: PropTypes.bool,
        lastConvertedDate: PropTypes.object,
        primaryColor: PropTypes.string,
        alertWithType: PropTypes.func,
        currencyError: PropTypes.string
    }

    componentDidMount() {
        this.props.dispatch(getInitialConversion());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currencyError && !this.props.currencyError) {
          this.props.alertWithType('error', 'Error', nextProps.currencyError);
        }
    }

    handlePressBaseCurrency = () => {
        this.props.navigation.navigate('CurrencyList', {title: 'Base Currency', type: 'base'});
    };

    handlePressQuoteCurrency = () => {
        this.props.navigation.navigate('CurrencyList', {title: 'Quote Currency', type: 'quote'});
    };

    handleTextChange = (amount) => {
        this.props.dispatch(changeCurrencyAmount(amount));
    }

    handleSwap = () => {
        this.props.dispatch(swapCurrency());
    }

    handleOptionsPress = () => {
        this.props.navigation.navigate('Options');
    }

    render() {
        let quotePrice = '';
        if(!this.props.isFetching) {
            quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
        }


        return (
            <Container backgroundColor={this.props.primaryColor}>
                <StatusBar translucent={false} barStyle="light-content" />
                <Header onPress={this.handleOptionsPress}/>
                <KeyboardAvoidingView behavior="padding">
                    <Logo tintColor={this.props.primaryColor}/>
                    <InputWithButton
                        buttonText={this.props.baseCurrency}
                        onPress={this.handlePressBaseCurrency}
                        defaultValue={this.props.amount.toString()}
                        keyboardType="numeric"
                        onChangeText={this.handleTextChange}
                        textColor={this.props.primaryColor}
                    />
                    <InputWithButton
                        buttonText={this.props.quoteCurrency}
                        onPress={this.handlePressQuoteCurrency}
                        editable={false}
                        value={quotePrice}
                        textColor={this.props.primaryColor}
                    />
                    <LastConverted
                        base={this.props.baseCurrency}
                        quote={this.props.quoteCurrency}
                        date={this.props.lastConvertedDate}
                        conversionRate={this.props.conversionRate}
                    />
                    <ClearButton text="Flippeti flop" onPress={this.handleSwap}/>
                </KeyboardAvoidingView>
            </Container>
        )
    }
}

mapStateToProps = (state) => {
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;
    const conversionSelector = state.currencies.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};

    return {
        baseCurrency,
        quoteCurrency,
        amount: state.currencies.amount,
        conversionRate: rates[quoteCurrency] || 0,
        isFetching: conversionSelector.isFetching,
        lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
        primaryColor: state.theme.primaryColor,
        currencyError: state.currencies.error,
    }
}

export default connect(mapStateToProps)(connectAlert(Home));