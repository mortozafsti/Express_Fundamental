const express = require('express')
const multer = require('multer') // require image uploading purpose
const bodyParser = require('body-parser');
var multers = multer(); // create instance for access array. line 9
app=express();

app.use(express.static('public'));
app.use(bodyParser.json()); // use JSON data
app.use(multers.array()); // use multipart form data

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,`${uniqueSuffix}${file.originalname}`)
    }
});

const upload =multer({storage:storage}).single('myfile');

// file upload url
app.post('/upload',function(req,res){
    upload(req,res,function(error){
        if(error){
            res.send("File uploding Failed");
        }else{
            res.send("File is uploding Success");
        }
    })
})

// file Download url 
app.get('/download',function(req,res){
    res.download("./uploads/edtap.jpg");
})

app.post('/',function(req,res){

    // request response by Query
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;

    // request response by header
    let userName = req.header('userName');
    let password = req.header('password');

    // request response by body JSON Data & Multipart Form Data
    let city = req.body;
    let cityName = JSON.stringify(city)

    res.send("FirstName: "+firstName+" "+" LastName: "+lastName+" "+" UserName: "+
            userName+" "+" Password: "+password+"  "+" City"+" "+cityName)
})



app.listen("8000",function(){
    console.log("Server Run Success");
})
