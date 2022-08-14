const { response } = require("express");
const express = require("express");
const request = require("request");
const PORT = process.env.PORT || 3001;
const app = express();

function apiCaller(url) {
    return new Promise((resolve, reject) => {
        request(url, {json:true}, (err, res, body) => {
            if (err) reject (err);
            resolve(body);
        })
    })
}
app.get("/test", (req, res) => {
    res.json({message:"what up"})
});
app.get("/getPrices", (req, res) => {
    apiCaller("https://api.coinlore.net/api/tickers/")
    .then(response => {
        res.json(response);
    })
    .catch(error => {
        response.send(error)
    })
})
app.listen(PORT, () => {
    console.log(`server listening on...${PORT}`);
});