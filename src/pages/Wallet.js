import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fecthAction,
  requestAction,
  updateExpensesAction,
  editExpenseAction,
  confirmEditExpenseAction,
} from '../actions';
import currencyApi from '../helpers/api';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';
import './wallet.css';

const ALIMENTACAO_TEXT = 'Alimentação';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO_TEXT,
      isDisabled: true,
      errorCurrencyApi: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.changeThisStateToEdit = this.changeThisStateToEdit.bind(this);
    this.confirmEditAndUpdateExpenses = this.confirmEditAndUpdateExpenses.bind(this);
  }

  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.validateForm());
  }

  validateForm() {
    const { value, description } = this.state;
    const newValue = parseFloat(value);
    const regex1 = /\S+\.\S+/;
    const regex2 = /\S+/;
    const condition1 = description.length >= 2;
    const condition2 = (regex1.test(newValue) || regex2.test(newValue)) && newValue > 0;
    this.setState({ isDisabled: !((condition1 && condition2)) });
  }

  async handleClick() {
    const { updateExpenses, wallet: { expenses }, requestApi } = this.props;
    const { value, description, currency, method, tag } = this.state;
    requestApi(true);
    const exchangeRates = await currencyApi();
    if (exchangeRates) {
      const newValue = parseFloat(value).toFixed(2);
      const id = expenses.length;
      updateExpenses({
        id, value: newValue, description, currency, method, tag, exchangeRates });
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: ALIMENTACAO_TEXT,
        isDisabled: true,
        errorCurrencyApi: false,
      });
    } else { this.setState({ errorCurrencyApi: true }); }
    requestApi(false);
  }

  changeThisStateToEdit(expense, index) {
    const { editExpense } = this.props;
    const { value, description, currency, method, tag } = expense;
    const inputValue = document.getElementById('value-input');
    editExpense(index);
    this.setState({ value, description, currency, method, tag },
      () => inputValue.focus());
  }

  confirmEditAndUpdateExpenses() {
    const { confirmEditExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newValue = parseFloat(value).toFixed(2);
    confirmEditExpense({ value: newValue, description, currency, method, tag });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO_TEXT,
      isDisabled: true,
    });
  }

  backToLogin(email, history) {
    if (email === '') {
      history.push('/Trybe-Projeto_17-Trybe_Wallet');
    }
  }

  render() {
    const {
      handleChange,
      handleClick,
      changeThisStateToEdit,
      confirmEditAndUpdateExpenses,
      backToLogin,
    } = this;
    const { email, wallet: { isFetching, error }, history } = this.props;
    const { value, description, currency, method, tag, isDisabled, errorCurrencyApi,
    } = this.state;
    return (
      <div className="wallet-section">
        {backToLogin(email, history)}
        <Header />
        {(!isFetching && !error) ? (
          <>
            <Form
              value={ value }
              description={ description }
              currency={ currency }
              method={ method }
              tag={ tag }
              isDisabled={ isDisabled }
              handleChange={ handleChange }
              handleClick={ handleClick }
              confirmEditAndUpdateExpenses={ confirmEditAndUpdateExpenses }
            />
            <Table
              changeThisStateToEdit={ changeThisStateToEdit }
              errorCurrencyApi={ errorCurrencyApi }
            />
          </>) : <p className="loading">Carregando...</p>}
        {(error) ? (
          <h2 className="erro-api">Ops, ocorreu um erro. Recarregue sua página!</h2>)
          : null}
      </div>
    );
  }
}

Wallet.propTypes = {
  fetchApi: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  email: state.user.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fecthAction()),
  requestApi: (value) => dispatch(requestAction(value)),
  updateExpenses: (expense) => dispatch(updateExpensesAction(expense)),
  editExpense: (index) => dispatch(editExpenseAction(index)),
  confirmEditExpense: (expense) => dispatch(confirmEditExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
