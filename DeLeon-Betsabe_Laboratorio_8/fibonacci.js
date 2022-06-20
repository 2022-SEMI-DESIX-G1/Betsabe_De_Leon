const express = require('express')
const app = express()

let num = 5;

function fibonacci(numero)
{
    let numeros=[0,1];
    for (let i = 2; i < numero; i++) {
        numeros[i] = numeros[i - 2] + numeros[i - 1];
    }
    return numeros;
}


app.get('/', function (req, res) {
    res.send(fibonacci(num))
})

app.post('/array', function (req, res){
    res.json({
        fibonacci: fibonacci(num)
    })
})

app.listen(3000)