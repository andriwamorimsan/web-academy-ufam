const express = require ("express")
const dotenv = require('dotenv');

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

const app = express()
const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
    res.send({
        nome: "insituto de computacao",
        fundacao: "19/03/1987"
    })
})

app.listen(PORT, ()=>{
    console.log(`Express app iniciada na porta ${PORT}.`);
})