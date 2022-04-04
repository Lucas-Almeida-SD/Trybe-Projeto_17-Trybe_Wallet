import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../imgs/money.png';
import './header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.sumExpenseValues = this.sumExpenseValues.bind(this);
  }

  sumExpenseValues() {
    const { wallet: { expenses } } = this.props;
    const n3 = 3;
    let total = expenses.reduce((acc, e) => {
      const { value, currency, exchangeRates } = e;
      const { [currency]: { ask } } = exchangeRates;
      return acc + (parseFloat(value) * parseFloat(ask));
    }, 0);
    total = total
      .toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const newTotal = total.split('.');
    newTotal.splice(0, 1);
    newTotal.splice(newTotal.length - 1, 1);
    if (newTotal.length > n3) {
      total = `${total.split('.')[0]} x 10^${newTotal.length * n3 + n3} +`;
    }
    return total;
  }

  render() {
    const { sumExpenseValues } = this;
    const { email } = this.props;
    return (
      <header>
        <div className="logo-div">
          <img src={ logo } alt="money-logo" />
          <h1>Trybe Wallet</h1>
        </div>
        <div className="email-and-expenses-value-div">
          <p data-testid="email-field" className="email-field">{email}</p>
          <div className="sum-value-div">
            <p>{'Despesa Total: '}</p>
            <p data-testid="total-field" className="sum">{`R$${sumExpenseValues()}`}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.user.email,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);
