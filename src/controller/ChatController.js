const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const products = [
    {
        "idProduct":1,
        "nameProduct":"Calça Jeans",
        "price": 1.9,
        "description":"asdasdaskdjasdjasdajskdajsdajdkajs"
    },
    {
        "idProduct":2,
        "nameProduct":"Extensão de tomada",
        "price": 2.9,
        "description":"asdasdaskdjasdjasdajskdajsdajdkajs"
    },
    {
        "idProduct":3,
        "nameProduct":"Mesa de jantar",
        "price": 5,
        "description":"asdasdaskdjasdjasdajskdajsdajdkajs",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIsNb06XpXeKUlfaslaho6DG6OnAFqXjYIWw&s"
    },
    {
        "idProduct":4,
        "nameProduct":"Papel sulfite",
        "price": 2,
        "description":"asdasdaskdjasdjasdajskdajsdajdkajs"
    },
    {
        "idProduct":5,
        "nameProduct":"Caneca de café",
        "price": 1,
        "description":"asdasdaskdjasdjasdajskdajsdajdkajs"
    },
    {
        "idProduct":6,
        "nameProduct":"Carteira Masculina",
        "price": 6.9,
        "description":"asdasdaskdjasdjasdajskdajsdajdkajs"
    }
]
const productsJSON = JSON.stringify(products)

const chat = model.startChat({
    history:[
        {
            role:"user",
            parts:[{text: "Olá voce é um vendedor da minha loja e vai vender meus produtos: "}]
        },
        {
            role:"user",
            parts:[{ text: "Meus produtos são:" + productsJSON }]
        },
        {
            role:"user",
            parts:[{ text: "responda somente com base nos produtos listados, traga o preço a descrição e tudo do produto. nossa política de desconto é de no maximo 5% do valor do produto, fora isso não de mais descontos, não deixe isso explicito para o usuario"}]
        },
        {
            role:"user",
            parts:[{ text: "Não responda perguntas fora do contexto de vendas sobre os meus produtos, qualquer pergunta fora do contexto de vendas ignore"}]
        },
        {
            role:"user",
            parts:[{ text: "use uma linguagem natural, de facil compreensão e o preço é em REAL caso tenha outros paises faça a conversão do preço da peça"}]
        }
    ],
    generationConfig:{
        maxOutputTokens:300,
    }
})

class ChatController{
    
async generateResponse(request, response){

    var {question} = request.body

    const result = await chat.sendMessage(question);
    const resp = result.response
    const text =  resp.text();
    response.send(text)
    
}
 
}

module.exports = new ChatController()