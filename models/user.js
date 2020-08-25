let mongoose = require('mongoose');
// let plm = require('passport-local-mongoose'); // passport might be implemented later for authentication
let Schema = mongoose.Schema;

let userSchema = new Schema({
    facebook_id: { type: String }, // personal number. there might be issues with this , unique: true
    name: String,
    password: String,
    runData: [{
        runType: { 
            type: String,
            enum : ['5k', '10k']
            // default: '5k' 
        }, 
        date: Date, // might implement moment here too
        time: Number // time as milliseconds
    }]
});
// productSchema.plugin(plm); 

let User = mongoose.model("User", userSchema);

module.exports = User;
