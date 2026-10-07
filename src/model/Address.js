const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const addresSchema = new moongose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    country: String,
    city: String,
    state: String,
    street: String,
    neighborhood: String,
    zipCode: String,
    number: String,
    location: String,
    complement: String
})

const Address = moongose.model("Address", addresSchema)
module.exports = Address