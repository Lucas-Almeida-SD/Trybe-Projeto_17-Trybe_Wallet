import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseAction } from '../actions';
import saveAtLocalStorage from '../helpers/saveAtLocalStorage';
import './table.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.renderTableRows = this.renderTableRows.bind(this);
    this.removeAndSaveAtStorage = this.removeAndSaveAtStorage.bind(this);
  }

  getExpenseInfo(expense) {
    const { value, description, currency, method, tag, exchangeRates } = expense;
    const newValue = parseFloat(value).toFixed(2);
    const currencyName = exchangeRates[currency].name;
    const exchangeUsed = parseFloat(exchangeRates[currency].ask);
    const newExchangeUsed = parseFloat(exchangeUsed).toFixed(2);
    const conversionCurrency = 'Real';
    const convertedValue = (parseFloat(value) * exchangeUsed).toFixed(2);
    return [
      description,
      tag,
      method,
      newValue,
      currencyName,
      newExchangeUsed,
      convertedValue,
      conversionCurrency,
    ];
  }

  convertToBrCurrency = (value) => {
    const newValue = parseFloat(value);
    return (
      newValue
        .toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    );
  };

  async removeAndSaveAtStorage(index) {
    const { removeExpense } = this.props;
    await removeExpense(index);
    saveAtLocalStorage(this.props);
  }

  renderTableRows() {
    const { getExpenseInfo, convertToBrCurrency, removeAndSaveAtStorage } = this;
    const { expenses, editor, idToEdit, changeThisStateToEdit,
    } = this.props;
    const n3 = 3; const n5 = 5; const n6 = 6;
    const moneyPosition = [n3, n5, n6];
    return (
      expenses.map((expense, index) => {
        const expenseInfo = getExpenseInfo(expense);
        return (
          <tr
            key={ expense.id }
            className={ (editor && idToEdit === index) ? 'selected' : null }
          >
            {expenseInfo.map((e, i) => (
              <td key={ e }>
                {(moneyPosition.includes(i)) ? `${convertToBrCurrency(e)}` : e}
              </td>))}
            <td className="td-btn">
              {(!editor) ? (
                <>
                  <button
                    type="button"
                    className="edit-btn"
                    data-testid="edit-btn"
                    onClick={ () => changeThisStateToEdit(expense, index) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="remove-btn"
                    data-testid="delete-btn"
                    onClick={ () => removeAndSaveAtStorage(index) }
                  >
                    Excluir
                  </button>
                </>) : null}
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    const { renderTableRows } = this;
    const { errorCurrencyApi } = this.props;
    const tHead = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <section className="table-section">
        <table border="1">
          <thead>
            <tr>
              {tHead.map((e) => <th key={ e }>{e}</th>)}
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
        {(errorCurrencyApi) ? (
          <p className="erro-currency-api">Ops, ocorreu um erro. Tente novamente!</p>)
          : null}
      </section>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
