require('dotenv').config();
const mongoose = require('mongoose')

const connectToDB = async() => {
	try{
		await mongoose.connect(process.env.DATABASE_URI)
		console.log("mongoDB connected ✅✅✅✅✅✅✅✅")
	}
	catch{
		console.log("Connection failed ❌❌❌❌❌❌❌❌")
	}
}

const disconnectDB = async() => {
	mongoose.disconnect()
	console.log("MongoDB disconnected ⏳️")
}

const isConnected = () => {
	return mongoose.connection.readyState === 1
}

module.exports = {
	connectToDB,
	disconnectDB,
	isConnected
}