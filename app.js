const request = require("request")
const express = require("express")
require('dotenv').config()
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express()
const bodyParser = require("body-parser")
const port = 3000;
const https = require('https');
const { response } = require("express");
const e = require("express");
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: process.env.SERVER
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})


app.post("/", (req,res) => {

    const listId = process.env.AUDIENCE_ID;
    const subscribingUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.emailAdress
        
};
 
async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
  
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
  }
 
run();

if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html")
}else{
    res.send(__dirname + "/failure.html")
}
 
 
});

app.post("/success" ,(req ,res) =>{
    res.redirect("/")
})

app.listen(port, (req,res)=>{
    console.log("Server is running on port 3000")
})
