const saveAtLocalStorage = (props) => {
  const { wallet: { expenses } } = props;
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

export default saveAtLocalStorage;
