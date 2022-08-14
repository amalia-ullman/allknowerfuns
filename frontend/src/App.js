import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);
  const [prices, setPrices] = React.useState(null);
  React.useEffect(() => {
    fetch("/test")
    .then((res) => res.json())
    .then((data) => setData(data.message))
  })
  React.useEffect(() => {
    fetch("/getPrices")
    .then((res) => res.json())
    .then((prices) => setPrices(prices.data))
    //.then((prices) => console.log(prices.data[0].symbol))
  })
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {(!data ? 'loading' : data)}
        </p>
        {prices &&
        <div>{Object.keys(prices).map((index) => 
          (<p key={index}>{prices[index].symbol} | ${prices[index].price_usd} | 1 hour: {prices[index].percent_change_1h} |
          &nbsp;24 hours: {prices[index].percent_change_24h} | 7 sets of 24 hours: {prices[index].percent_change_7d}</p>))}</div>
        }
      </header>
    </div>
  );
}

export default App;
