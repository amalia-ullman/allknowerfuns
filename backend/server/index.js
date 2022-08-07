const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.get("/test", (req, res) => {
    res.json({message:"what up"})
})
app.listen(PORT, () => {
    console.log(`server listening on...${PORT}`);
});