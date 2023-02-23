
const Services = require('../models/interviewModel');

const path = require('path');

const fs = require('fs');





// SERVICES PAGE 
const postEditServices = async (req, res) => { 

    try {

        const services = new Services(
            {
                name: req.body.name,
                resume: req.file.filename,
                timing: req.body.time
            }
        );   

        const servicesData = await services.save();

    }
    catch (error) {
        console.log(error.message);
    } 

    res.redirect('/');
}

const deleteServicesData = async (req, res) => {
    try {

        const Data = await Services.findOne({ _id: req.body.id });
        fs.unlink(path.join(__dirname, "../public/resume", Data.resume), () => { });
        await Data.deleteOne({ _id: req.body.id })
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
    }

}

// SERVICES PAGE ENDS





module.exports = {

    postEditServices,
    deleteServicesData
}











