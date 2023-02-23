const express = require('express');


const path = require('path');
const ejs = require('ejs');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');


const multer = require('multer');


mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://saurabh:USiZ1Oga7M7dYOdu@cluster0.rojlgvw.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./public"))); 



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "./views"));



const adminController = require('./controllers/adminController');







// MULTER 
const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,path.join(__dirname,"./public/resume"))
    },
    filename:function (req,file,cb) { 
        const name = Date.now()+'-'+file.originalname; 
        cb(null,name);
    }
});

const upload = multer({storage:storage}); 
// MULTER ENDS












app.get('/', async (req, res) => {
    try {
        res.render('schedule');
    }
    catch (error) {  
        console.log(error.message); 
    }
}); 


const Services = require('./models/interviewModel'); 
app.get('/interview', async (req, res) => {
    try {
        const editservices = await Services.find({});
        res.render('interview', {
            editservices
        }); 
    }
    catch (error) {  
        console.log(error.message); 
    }
});
 


app.post('/',upload.single('resume'), adminController.postEditServices);
app.post('/deletedata', adminController.deleteServicesData);







const port = process.env.PORT || 3000;

//App is listening at this port:-
app.listen(port, () => {
    console.log("Server is running at port no. - " + port);
})    