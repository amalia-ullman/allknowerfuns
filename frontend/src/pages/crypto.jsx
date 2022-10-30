import React from 'react'
import '../style/tw.css'
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import {w3cwebsocket as W3CWebSocket } from "websocket";

const ws = new W3CWebSocket("wss://stream.binance.com:9443/ws");

function Crypto() {
    //const [data, setData] = React.useState(null);
    //const [prices, setPrices] = React.useState(null);
    const [conversion, setConversion] = React.useState(null);
    const [ethprice, setethprice] = React.useState(null);
    const [btcprice, setbtcprice] = React.useState(null);
    const [adaprice, setadaprice] = React.useState(null);
    const [maticprice, setmaticprice] = React.useState(null);
    const [solprice, setsolprice] = React.useState(null);
    
    /*React.useEffect(() => {
        fetch("/test")
        .then((res) => res.json())
        .then((data) => setData(data.message))
    })
    React.useEffect(() => {
        fetch("/getPrices")
        .then((res) => res.json())
        .then((prices) => setPrices(prices.data))
        //.then((prices) => console.log(prices.data[0].symbol))
    }) */
    React.useEffect(() => {
        console.log("the test test");
        fetch("/usdca")
        .then((res) => res.json())
        .then((conversion) => setConversion(conversion.observations[0].FXUSDCAD.v))
    },[])


    ws.onopen = () => {
        console.log("connected");
        ws.send(`{
            "method": "SUBSCRIBE",
            "params": [
              "ethusdt@ticker",
              "btcusdt@ticker",
              "adausdt@ticker",
              "maticusdt@ticker",
              "solusdt@ticker"
            ],
            "id": 1
          }`);
    }
    ws.onmessage = (message) => {
        let wsdata = JSON.parse(message.data);
        let symbol = wsdata.s;
        if(symbol ==="ETHUSDT") {
            setethprice(wsdata);
        }
        if(symbol ==="BTCUSDT") {
            setbtcprice(wsdata);
        }
        if(symbol ==="ADAUSDT") {
            setadaprice(wsdata);
        }
        if(symbol ==="MATICUSDT") {
            setmaticprice(wsdata);
        }
        if(symbol ==="SOLUSDT") {
            setsolprice(wsdata);
        }
        /*{console.log(wsdata)}
        setethprice(wsdata.c);*/
        
    }
    return (
        <div className='bg-white'>
            <Banner />
            <Menu />
            <p>test ${ethprice && !isNaN(ethprice.c) ? ethprice.c : "---"}</p>
            <p>
               {/*} {(!data ? 'loading' : data)}*/}
                {(!conversion ? 'loadingconversion' : conversion)}
            </p>
            <div className="flex flex-wrap justify-center bg-cyan-700">
                {/* eth card*/}
                <div className="h-[200px] bg-transparent max-w-sm relative rounded overflow-hidden shadow-lg m-2 pricecard z-5">
                <div className="relative z-0"><img className="max-w-sm absolute inset-0 opacity-0 carddetail ease-in duration-[3s] mcqueen" src="../pictures/lightningmcqueen.jpg" alt="Sunset in the mountains"/></div>
                <div className="z-10 px-6 font-bold text-xl">ETH</div>
                <div className="z-10 px-6 opacity-0 ease-in duration-[3s] carddetail">
                <p className="text-slate-100 text-base">
                    USD ${ethprice && !isNaN(ethprice.c) ? ethprice.c : "---"} | CAD ${ethprice && !isNaN(ethprice.c) ? parseFloat(ethprice.c * conversion).toFixed(4) : "---"}
                    </p>
                </div>
                <div className="z-10 pt-4 pb-2 opacity-0 carddetail">
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">24 hr: {ethprice && !isNaN(ethprice.P) ? ethprice.P : "---"}%</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">Highest Price: {ethprice && !isNaN(ethprice.h) ? ethprice.h : "---"}</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">Lowest Price: {ethprice && !isNaN(ethprice.l) ? ethprice.l : "---"}</span>
                      
                </div> 
            </div>

            {/*bitcard*/}
            <div className="h-[200px] bg-transparent max-w-sm relative rounded overflow-hidden shadow-lg m-2 pricecard z-5">
                <div className="relative z-0"><img className="max-w-sm absolute inset-0 opacity-0 carddetail ease-in duration-[3s] mcqueen" src="../pictures/lightningmcqueen.jpg" alt="Sunset in the mountains"/></div>
                <div className="z-10 px-6 font-bold text-xl">BTC</div>
                <div className="z-10 px-6 opacity-0 ease-in duration-[3s] carddetail">
                <p className="text-slate-100 text-base">
                    USD ${btcprice && !isNaN(btcprice.c) ? btcprice.c : "---"} | CAD ${btcprice && !isNaN(btcprice.c) ? parseFloat(btcprice.c * conversion).toFixed(4) : "---"}
                    </p>
                </div>
                <div className="z-10 pt-4 pb-2 opacity-0 carddetail">
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">24 hr: {btcprice && !isNaN(btcprice.P) ? btcprice.P : "---"}%</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">Highest Price: {btcprice && !isNaN(btcprice.h) ? btcprice.h : "---"}</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">Lowest Price: {btcprice && !isNaN(btcprice.l) ? btcprice.l : "---"}</span>
                </div> 
            </div>

            {/*another card*/}
            <div className="h-[200px] bg-transparent max-w-sm relative rounded overflow-hidden shadow-lg m-2 pricecard z-5">
                <div className="relative z-0"><img className="max-w-sm absolute inset-0 opacity-0 carddetail ease-in duration-[3s] mcqueen" src="../pictures/lightningmcqueen.jpg" alt="Sunset in the mountains"/></div>
                <div className="z-10 px-6 font-bold text-xl">SOL</div>
                <div className="z-10 px-6 opacity-0 ease-in duration-[3s] carddetail">
                <p className="text-slate-100 text-base">
                    USD ${solprice && !isNaN(solprice.c) ? solprice.c : "---"} | CAD ${solprice && !isNaN(solprice.c) ? parseFloat(solprice.c * conversion).toFixed(4) : "---"}
                    </p>
                </div>
                <div className="z-10 pt-4 pb-2 opacity-0 carddetail">
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">24 hr: {solprice && !isNaN(solprice.P) ? solprice.P : "---"}%</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">Highest Price: {solprice && !isNaN(solprice.h) ? solprice.h : "---"}</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">Lowest Price: {solprice && !isNaN(solprice.l) ? solprice.l : "---"}</span>
                </div> 
            </div>

            {/*matic card*/}
            <div className="h-[200px] bg-transparent max-w-sm relative rounded overflow-hidden shadow-lg m-2 pricecard z-5">
                <div className="relative z-0"><img className="max-w-sm absolute inset-0 opacity-0 carddetail ease-in duration-[3s] mcqueen" src="../pictures/lightningmcqueen.jpg" alt="Sunset in the mountains"/></div>
                <div className="z-10 px-6 font-bold text-xl">MATIC</div>
                <div className="z-10 px-6 opacity-0 ease-in duration-[3s] carddetail">
                <p className="text-slate-100 text-base">
                    USD ${maticprice && !isNaN(maticprice.c) ? maticprice.c : "---"} | CAD ${maticprice && !isNaN(maticprice.c) ? parseFloat(maticprice.c * conversion).toFixed(4) : "---"}
                    </p>
                </div>
                <div className="z-10 pt-4 pb-2 opacity-0 carddetail">
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">24 hr: {maticprice && !isNaN(maticprice.P) ? maticprice.P : "---"}%</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">Highest Price: {maticprice && !isNaN(maticprice.h) ? maticprice.h : "---"}</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">Lowest Price: {maticprice && !isNaN(maticprice.l) ? maticprice.l : "---"}</span>
                </div> 
            </div>

            {/*ada*/}
            <div className="h-[200px] bg-transparent max-w-sm relative rounded overflow-hidden shadow-lg m-2 pricecard z-5">
                <div className="relative z-0"><img className="max-w-sm absolute inset-0 opacity-0 carddetail ease-in duration-[3s] mcqueen" src="../pictures/lightningmcqueen.jpg" alt="Sunset in the mountains"/></div>
                <div className="z-10 px-6 font-bold text-xl">ADA</div>
                <div className="z-10 px-6 opacity-0 ease-in duration-[3s] carddetail">
                <p className="text-slate-100 text-base">
                    USD ${adaprice && !isNaN(adaprice.c) ? adaprice.c : "---"} | CAD ${adaprice && !isNaN(adaprice.c) ? parseFloat(adaprice.c * conversion).toFixed(4) : "---"}
                    </p>
                </div>
                <div className="z-10 pt-4 pb-2 opacity-0 carddetail">
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">24 hr: {adaprice && !isNaN(adaprice.P) ? adaprice.P : "---"}%</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">Highest Price: {adaprice && !isNaN(adaprice.h) ? adaprice.h : "---"}</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">Lowest Price: {adaprice && !isNaN(adaprice.l) ? adaprice.l : "---"}</span>
                </div> 
            </div>
             </div>
                {/*{prices &&
            <div className="flex flex-wrap justify-center bg-cyan-700">{Object.keys(prices).map((index) => 
                (
                    <div key={index} className="h-[200px] bg-transparent max-w-sm relative rounded overflow-hidden shadow-lg m-2 pricecard z-5">
                    <div className="relative z-0"><img className="max-w-sm absolute inset-0 opacity-0 carddetail ease-in duration-[3s] mcqueen" src="../pictures/lightningmcqueen.jpg" alt="Sunset in the mountains"/></div>
                    <div className="z-10 px-6 font-bold text-xl">{prices[index].symbol}</div>
                    <div className="z-10 px-6 opacity-0 ease-in duration-[3s] carddetail">
                        {console.log(prices[index].symbol ==="ETH")}
                        {(!prices[index].symbol ==="ETH" && <div><p className="text-slate-100 text-base">
                            USD ${prices[index].price_usd} | CAD ${parseFloat(prices[index].price_usd * conversion).toFixed(4)}
                            </p></div>)}
                       {(!prices[index].symbol==="ETH" ? <p className="text-slate-100 text-base">
                            USD ${prices[index].price_usd} | CAD ${parseFloat(prices[index].price_usd * conversion).toFixed(4)}
                            </p> : <p className="text-slate-100 text-base">
                            USD ${(ethprice)} | CAD ${parseFloat(ethprice * conversion).toFixed(4)}
                </p>)}; 
                    </div>
                    <div className="z-10 pt-4 pb-2 opacity-0 carddetail">
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">1 hour: {prices[index].percent_change_1h}</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">24 hours: {prices[index].percent_change_24h}</span>
                      <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">7 sets of 24 hours: {prices[index].percent_change_7d}</span>
                    </div>
                  </div> 
                
                  <p key={index}>{prices[index].symbol} | USD: ${prices[index].price_usd} | CAD: ${parseFloat(prices[index].price_usd * conversion).toFixed(4)} | 1 hour: {prices[index].percent_change_1h} |
                    &nbsp;24 hours: {prices[index].percent_change_24h} | 7 sets of 24 hours: {prices[index].percent_change_7d}</p> 
                </div> 
                
            }*/}
            <Footer />
        </div>
    )
}

export default Crypto