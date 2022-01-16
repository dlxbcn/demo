import React from 'react';
import './App.css';
import Exchange from "./components/Exchange";

export default class App extends React.Component {
    state = {
        exchange: {
            ifShow: false,
            title: '',
            date: new Date().toLocaleDateString(),
            currency: '',
            amount: ''
        },
        currencyList: [
            'ERU', 'USD', 'CNY'
        ]
    }

    render() {
        let props = this.state.exchange;
        const exchange = () => {
            if (props.ifShow) {
                let exchange = this.state.exchange;
                return <Exchange
                    currencyList={this.state.currencyList}
                    title={exchange.title}
                    date={exchange.date}
                    currency={exchange.currency}
                    amount={exchange.amount}
                    submit={this.submit}
                    close={this.closeExchange}
                />;
            } else {
                return null;
            }
        }
        return <div className="app">
            <a href="https://github.com/dlxbcn/demo" target="_blank">https://github.com/dlxbcn/demo</a>
            <button className="btn" onClick={this.switchExchangeState}>show</button>
            {exchange()}
        </div>
    }

    switchExchangeState = () => {
        if (this.state.exchange.ifShow) {
            this.closeExchange()
        } else {
            this.showExchange()
        }
    }
    showExchange = () => {
        let exchange = this.state.exchange;
        exchange.ifShow = true;
        this.setState({
            exchange
        })
    }
    closeExchange = () => {
        let exchange = this.state.exchange;
        exchange.ifShow = false;
        this.setState({
            exchange
        })
    }

    submit = (data: any) => {
        console.log('submit data=', data);
    }
}
