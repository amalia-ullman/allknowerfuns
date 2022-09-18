import React from 'react'
import '../style/tw.css'
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

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
        <div className='bg-white'>
            <Banner />
            <Menu />
            <p>
                {(!data ? 'loading' : data)}
                {(!conversion ? 'loadingconversion' : conversion)}
            </p>
                {prices &&
            <div className="flex flex-wrap justify-center bg-cyan-700">{Object.keys(prices).map((index) => 
                (
                    <div class="h-[200px] bg-transparent max-w-sm relative rounded overflow-hidden shadow-lg m-2 pricecard z-5">
                    <div class="relative z-0"><img class="max-w-sm absolute inset-0 opacity-0 carddetail ease-in duration-[1s] mcqueen" src="../pictures/lightningmcqueen.jpg" alt="Sunset in the mountains"/></div>
                    <div class="z-10 px-6 font-bold text-xl">{prices[index].symbol}</div>
                    <div class="z-10 px-6 opacity-0 ease-in duration-[3s] carddetail">
                      <p class="text-slate-100 text-base">
                      USD: ${prices[index].price_usd} | CAD: ${parseFloat(prices[index].price_usd * conversion).toFixed(4)}
                      </p>
                    </div>
                    <div class="z-10 pt-4 pb-2 opacity-0 carddetail">
                      <span class="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">1 hour: {prices[index].percent_change_1h}</span>
                      <span class="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">24 hours: {prices[index].percent_change_24h}</span>
                      <span class="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">7 sets of 24 hours: {prices[index].percent_change_7d}</span>
                    </div>
                  </div>
                
                  /*<p key={index}>{prices[index].symbol} | USD: ${prices[index].price_usd} | CAD: ${parseFloat(prices[index].price_usd * conversion).toFixed(4)} | 1 hour: {prices[index].percent_change_1h} |
                    &nbsp;24 hours: {prices[index].percent_change_24h} | 7 sets of 24 hours: {prices[index].percent_change_7d}</p> */
                ))}</div>
                
            }
            <Footer />
        </div>
    )
}

export default Crypto