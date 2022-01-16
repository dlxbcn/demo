import React from 'react';
import logo from "../assets/logo.png";
import close from "../assets/close.png";
import calendar from "../assets/calendar.png";

export interface ExchangeData {
    title: string;
    amount: string;
    currency: string;
    date: string;
    currencyList: Array<string>;
    close: any;
    submit: any;
}

export default class Exchange extends React.Component<ExchangeData> {
    private title: React.RefObject<HTMLInputElement> = React.createRef();
    private amount: React.RefObject<HTMLInputElement> = React.createRef();
    state = {
        title: this.props.title,
        date: this.props.date,
        currency: this.props.currency,
        amount: this.props.amount,
        errField: ''
    }

    render() {
        return (
            <div className="dialog">
                <div className="head">
                    <img src={logo} className="logo" alt="logo"/>
                    <div className="title">Submit Expense</div>
                    <img src={close} className="close" onClick={this.props.close} alt="close"/>
                </div>
                <div>
                    <div className="field">
                        <div className="field-title">Title</div>
                        <input className={`input-title ${this.state.errField === 'title' ? 'err' : ''}`}
                            ref={this.title}
                            placeholder="Expense Title"
                            value={this.state.title}
                            onChange={this.onTitleChange}
                        />
                        <div className="desc">Give this expense a title to be easily identified</div>
                    </div>
                    <div className="field date">
                        <div className="field-title">Purchase Date</div>
                        <input className="input-title" placeholder="Expense Title" value={this.state.date}
                               readOnly={true}/>
                        <img src={calendar} className="calendar" alt="calendar" onClick={this.showCalendar}/>
                    </div>
                    <div className="field cur-frame">
                        <div className="field-title inline">Currency</div>
                        {this.renderCurrencyList()}
                    </div>
                    <div className="field">
                        <div className="field-title">Amount</div>
                        <input className={`input-title ${this.state.errField === 'amount' ? 'err' : ''}`}
                               ref={this.amount}
                               type="number"
                               placeholder="Total Amount"
                               value={this.state.amount}
                               onBlur={this.onAmountBlur}
                               onChange={this.onAmountChange}/>
                    </div>
                </div>
                <div className="action">
                    <button className="btn-cancel" onClick={this.props.close}>Cancel</button>
                    <button className="btn-next" onClick={this.onSubmit}>Next</button>
                </div>
            </div>
        )
    }

    renderCurrencyList = () => {
        return (<select className="cur" value={this.state.currency} onChange={this.onCurrencyChange}>
            {this.props.currencyList.map((currency: string, index: number) => {
                return (<option key={index} value={currency}>{currency}</option>)
            })}
        </select>)
    }
    onTitleChange = (e: any) => {
        this.setState({title: e.target.value})
    }
    showCalendar = () => {
        alert('demo')
    }
    onCurrencyChange = (e: any) => {
        this.setState({currency: e.target.value})
    }
    onAmountChange = (e: any) => {
        this.setState({amount: e.target.value});
    }
    onAmountBlur = (e: any) => {
        if (e.target.value.trim() !== "") {
            let num = parseFloat(e.target.value).toFixed(2);
            this.setState({amount: num});
        }
    }
    onSubmit = () => {
        if (this.state.title.trim() === '') {
            this.title.current?.focus();
            this.setState({errField: 'title'});
            return;
        }
        if (+this.state.amount <= 0) {
            this.amount.current?.focus();
            this.setState({errField: 'amount'});
            return;
        }
        this.setState({errField: ''});
        this.props.submit({
            title: this.state.title,
            date: this.state.date,
            currency: this.state.currency,
            amount: this.state.amount
        })
    }
}

