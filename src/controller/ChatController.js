const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

const prompt = require('../data/Prompt')

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const chat = model.startChat({
    history: prompt,
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