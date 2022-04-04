const currencyApi = () => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => false)
);

export default currencyApi;
