import React from 'react'
import '../style/tw.css'
import Banner from '../components/Banner';
import Footer from '../components/Footer';

function Crypto() {
    const [data, setData] = React.useState(null);
    const [prices, setPrices] = React.useState(null);
    const [conversion, setConversion] = React.useState(null);
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
    React.useEffect(() => {
        fetch("/usdca")
        .then((res) => res.json())
        .then((conversion) => setConversion(conversion.observations[0].FXUSDCAD.v))
        .then(console.log(conversion))
    },[])
    return (
        <div className='bg-red-100'>
            <Banner />
            <p>
                {(!data ? 'loading' : data)}
                {(!conversion ? 'loadingconversion' : conversion)}
            </p>
                {prices &&
            <div>{Object.keys(prices).map((index) => 
                (<p key={index}>{prices[index].symbol} | USD: ${prices[index].price_usd} | CAD: ${parseFloat(prices[index].price_usd * conversion).toFixed(4)} | 1 hour: {prices[index].percent_change_1h} |
                &nbsp;24 hours: {prices[index].percent_change_24h} | 7 sets of 24 hours: {prices[index].percent_change_7d}</p>))}</div>
            }
            <Footer />
        </div>
    )
}

export default Crypto