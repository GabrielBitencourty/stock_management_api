const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const clientSchema = new moongose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientName: String,
    clientEmail: String,
    clientNumber: String,
    clientStatus: String,
    clientRegistration: String,
    clientPurchases: Number,
    totalClientSpend: Number,
})

const Client = moongose.model("Clients", clientSchema)
module.exports = Client