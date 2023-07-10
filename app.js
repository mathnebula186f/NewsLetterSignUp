const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const { fchown } = require("fs");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
//    res.sendFile(__dirname+"/styles.css");
})

app.post("/",function(req,res){
    // console.log(req.body);
    var first_name=req.body.first_name;
    var last_name=req.body.last_name;
    var email=req.body.email;
    var data = {
        members:[
            {
            email_address: email,
            status : "subscribed",
            merge_fields : {
                FNAME : first_name,
                LNAME: last_name
            }
        }
        ]
    };

    const url="https://us21.api.mailchimp.com/3.0/lists/d8ab13a151/";
    const apiKey="405980dd6c9c9a78cd981f4cf7916f5e-us21";

    const options={
        method : "POST",
        auth : "Gopal:405980dd6c9c9a78cd981f4cf7916f5e-us21",
    };
    const jsonData=JSON.stringify(data);
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+ "/failure.html");
        }
    //    response.on("data",function(data){
        //   console.log(JSON.parse(data));
    //    }) 
    })
    request.write(jsonData);
    request.end();
    // res.sendFile(__dirname+"/success.html");
}); 

app.listen(3000,function(){
    console.log("Server Started on Port 3000....");
})

// MailChimp API Key=  
// 405980dd6c9c9a78cd981f4cf7916f5e-us21
//List ID
// d8ab13a151