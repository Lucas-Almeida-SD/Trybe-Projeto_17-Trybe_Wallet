// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const CURRENCY = 'CURRENCY';
export const REQUEST_API = 'REQUEST_API';
export const GET_API = 'GET_API';
export const FAILED_API = 'FAILED_API';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CONFIRM_EDIT_EXPENSE = 'CONFIRM_EDIT_EXPENSE';

export const userAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const currenciesAction = (payload) => ({
  type: CURRENCY,
  payload,
});

export const requestAction = (payload) => ({
  type: REQUEST_API,
  payload,
});

export const getAction = (payload) => ({
  type: GET_API,
  payload,
});

export const failedAction = (payload) => ({
  type: FAILED_API,
  payload,
});

export const fecthAction = () => (
  (dispatch) => {
    dispatch(requestAction(true));
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const keys = Object.keys(data);
        const filterKeys = keys.filter((e) => e !== 'USDT');
        return dispatch(getAction(filterKeys));
      })
      .catch(() => dispatch(failedAction(true)));
  }
);

export const updateExpensesAction = (payload) => ({
  type: UPDATE_EXPENSES,
  payload,
});

export const removeExpenseAction = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export const editExpenseAction = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const confirmEditExpenseAction = (payload) => ({
  type: CONFIRM_EDIT_EXPENSE,
  payload,
});
