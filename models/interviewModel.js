const mongoose = require('mongoose');

const scheduleInterview = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    resume:{
        type:String,
        require:true
    },
    timing:{
        type:String,
        require:true
    }    
}) 



module.exports = mongoose.model('Schedule',scheduleInterview );