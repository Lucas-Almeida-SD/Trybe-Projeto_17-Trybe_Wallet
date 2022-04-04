import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAction } from '../actions';
import logo from '../imgs/money.png';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { validateUser } = this;
      const { email, senha } = this.state;
      this.setState({ isDisabled: !validateUser(email, senha) });
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/Trybe-Projeto_17-Trybe_Wallet/carteira');
  }

  validateUser(email, senha) {
    const regex = /\S+@\S+\.\S+/;
    const n6 = 6;
    const validateEmail = regex.test(email);
    const validateSenha = senha.length >= n6;
    return (validateEmail && validateSenha);
  }

  render() {
    const { handleChange, handleClick } = this;
    const { email, senha, isDisabled } = this.state;
    return (
      <section className="login-section">
        <form method="get">
          <div className="logo-div">
            <h1>Trybe Wallet</h1>
            <img src={ logo } alt="money-logo" />
          </div>
          <div className="mb-3">
            <input
              data-testid="email-input"
              className="form-control"
              type="text"
              value={ email }
              name="email"
              placeholder="Email"
              onChange={ handleChange }
            />
          </div>
          <div className="mb-3">
            <input
              data-testid="password-input"
              className="form-control"
              type="password"
              value={ senha }
              name="senha"
              placeholder="Senha"
              onChange={ handleChange }
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={ handleClick }
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </div>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(userAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
