import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from './Select';
import './form.css';

class Form extends React.Component {
  renderSubmitBtn(isDisabled, editor, confirmEditAndUpdateExpenses, handleClick) {
    if (editor) {
      return (
        <button
          type="button"
          className="edit-btn"
          onClick={ confirmEditAndUpdateExpenses }
          disabled={ isDisabled }
        >
          Editar despesa
        </button>
      );
    }
    return (
      <button
        type="button"
        className="add-btn"
        onClick={ handleClick }
        disabled={ isDisabled }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { renderSubmitBtn } = this;
    const { handleChange, handleClick, confirmEditAndUpdateExpenses } = this.props;
    const { value, description, currency, method, tag, isDisabled } = this.props;
    const { wallet: { currencies, editor } } = this.props;
    const methodArray = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagArray = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <section className="form-section">
        <form method="get" className="form">
          <div className="mb-3">
            <label htmlFor="value-input">
              Valor:
              <input
                type="number"
                id="value-input"
                className="form-control value-input"
                name="value"
                value={ value }
                data-testid="value-input"
                placeholder="00.00"
                onChange={ handleChange }
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="description-input">
              Descrição:
              <input
                type="text"
                id="description-input"
                className="form-control"
                name="description"
                value={ description }
                data-testid="description-input"
                placeholder="Sorvete de chocolate"
                onChange={ handleChange }
              />
            </label>
          </div>
          <Select
            id="currencies-select"
            testid="currency-input"
            title="Moeda:"
            name="currency"
            value={ currency }
            array={ currencies }
            handleChange={ handleChange }
          />
          <Select
            id="method-select"
            testid="method-input"
            title="Método de Pagamento:"
            name="method"
            value={ method }
            array={ methodArray }
            handleChange={ handleChange }
          />
          <Select
            id="tag-select"
            testid="tag-input"
            title="Categoria:"
            name="tag"
            value={ tag }
            array={ tagArray }
            handleChange={ handleChange }
          />
          {renderSubmitBtn(isDisabled, editor, confirmEditAndUpdateExpenses, handleClick)}
        </form>
      </section>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Form);
