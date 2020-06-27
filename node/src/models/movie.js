const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const movieSchema = mongoose.Schema({
  movie: { type: String },
  seats: { type: [Number], required: true },
})

movieSchema.plugin(uniqueValidator)

movieSchema.methods.toJSON = function(){
    const obj = this.toObject();

    delete obj.name

    return obj 
}
module.exports = mongoose.model('Movie', movieSchema);