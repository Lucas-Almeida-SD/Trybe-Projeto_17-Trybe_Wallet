// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  LOCAL_STORAGE,
  REQUEST_API,
  GET_API,
  FAILED_API,
  UPDATE_EXPENSES,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  CONFIRM_EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  currencies: [],
  expenses: [],
  idToEdit: 0,
  editor: false,
  error: false,
};

function removeExpensesFromState(state, index) {
  const newExpenses = state.expenses.filter((_e, i) => i !== parseInt(index, 10));
  return newExpenses;
}

function editExpenseFromState(expenses, index, payload) {
  return expenses.map((e, i) => ((i === index) ? { ...e, ...payload } : e));
}

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOCAL_STORAGE:
    return { ...state, expenses: action.payload }
  case REQUEST_API:
    return { ...state, isFetching: action.payload };
  case GET_API:
    return { ...state, currencies: action.payload, isFetching: false, error: false };
  case FAILED_API:
    return { ...state, isFetching: false, error: true };
  case UPDATE_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVE_EXPENSE:
    return { ...state, expenses: removeExpensesFromState(state, action.payload) };
  case EDIT_EXPENSE:
    return { ...state, editor: true, idToEdit: action.payload };
  case CONFIRM_EDIT_EXPENSE:
    return {
      ...state,
      expenses:
        editExpenseFromState(state.expenses, state.idToEdit, action.payload),
      editor: false,
      idToEdit: null,
    };
  default:
    return state;
  }
};

export default wallet;
