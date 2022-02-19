const express=require("express");
const app = express();
const https = require("https");
app.use(express.static("public"));
const request = require("request");
const bodyParser = require('body-parser');
const { options } = require("request");
const { response } = require("express");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/failure", function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000 ,function(){
    console.log('server is running on port 3000');
})
app.post('/', function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var mail = req.body.mail;
    console.log(firstName,lastName,mail);

    var data = {
        members : [
            {
            email_address : mail,
            status : "subscribed",
            merge_fields : {
                FNAME : firstName,
                LNAME : lastName,
            }
        }
        ]
    };
var jsonData = JSON.stringify(data);
const url = "https://us14.api.mailchimp.com/3.0/lists/a05d29ae8b"
const options = {
    method : "POST",
    auth : "Anirudh:d198a5b5071fb00828382905af5d324e-us14"
}
const request = https.request(url, options, function(response){
    if (response.statusCode===200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
response.on("data", function(data){
    console.log(JSON.parse(data));
})
});
request.write(jsonData);
request.end();
});




















