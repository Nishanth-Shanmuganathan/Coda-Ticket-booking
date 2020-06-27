const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)
userSchema.methods.toJSON = function(){
    const obj = this.toObject();

    delete obj.password
    delete obj._id

    return obj 
}
module.exports = mongoose.model('User', userSchema);