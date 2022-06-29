const express = require('express')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 5500
INFORMATION = []
const errors = [
	{status: "error", message: "Неверные данные в форме"}, 
	{status: "error", message: "Не хватает данных"},
];

// middleware
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json());


app.post('/api/information', (req, res)=>{
	INFORMATION.push(req.body)
	console.log(req.body);
	if (isJsonString(!req.body)){
		res.status(201).json(req.body)
	} else {
		res.status(400).json(errors[0])
	}
	console.log('Сервер получил POST запрос')
})

app.get('/api/information', (req,res)=>{
	res.status(200).json(INFORMATION);
})

// Отправка статического документа на клиент
app.get('/', (req,res)=>{
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    console.log('Сервер отправил статический документ')
})


app.listen(PORT, ()=>{
	console.log(`Server started at port ${PORT}`)
})

function isJsonString(str) {
	try {
			JSON.parse(str);
	} catch (e) {
			return false;
	}
	return true;
}