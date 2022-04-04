import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { id, testid, title, name, value, array, handleChange } = this.props;
    return (
      <div className="mb-3">
        <label htmlFor={ id }>{title}</label>
        <select
          id={ id }
          data-testid={ testid }
          name={ name }
          className="form-control"
          value={ value }
          onChange={ handleChange }
        >
          {array.map((e) => <option key={ e }>{e}</option>)}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  array: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default Select;
