var mongoose = require("mongoose"),
	integerValidator = require('mongoose-integer'),
	passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	usernam: String,
	password: String,
	city: String,
	gender: String,
	age: {
        type: Number,
        integer: true
    },
	phone: {
        type: Number,
        integer: true
    }
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(integerValidator,  { message: 'Error, expected {PATH} to be an integer.' });


module.exports = mongoose.model("User", UserSchema);