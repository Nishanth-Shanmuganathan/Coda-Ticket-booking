const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const booking = {
    movie:{
        type:String
    },
    seats:[Number]
}

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookings:{
      type:[booking],
      default:[]
  }
})

userSchema.plugin(uniqueValidator)
userSchema.methods.toJSON = function(){
    const obj = this.toObject();

    delete obj.password
    delete obj._id

    return obj 
}
module.exports = mongoose.model('User', userSchema);