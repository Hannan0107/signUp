const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static(__dirname));

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("server is running");
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/fail", function(req,res) {
  res.redirect("/");
});


mailchimp.setConfig({
  //*****************************ENTER YOUR API KEY HERE******************************
  apiKey: "bbd74646f6002657b8f2e1395e57256a-us18",
  //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
  server: "us18"
});

app.post("/", function (req,res) {
//*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
var firstName = req.body.fname;
var lastName = req.body.lname;
var omail = req.body.email;
//*****************************ENTER YOU LIST ID HERE******************************
const listId = "5509c0049f";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: lastName,
 email: omail
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}


}).then(responses => {
            console.log(responses);
            if(responses.id !== "") {
                res.sendFile(__dirname+"/success.html");
            }

          }).catch(err => {
                res.sendFile(__dirname+"/fail.html");
                console.log('Error');
          });
};

run();

// var a2 = a.map(function(s){ return s.length });
//
// // ECMAscript 6 using arrow functions
// var a3 = a.map( s => s.length );

//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
// run().catch(e => res.sendFile(__dirname + "/fail.html"));


});




// app.post("/", function(req, res) {
//       var firstName = req.body.fname;
//       var lastName = req.body.lname;
//       var omail = req.body.email;
//
//       const listod = "5509c0049f";
//
//
//       async function run() {
//         const response = await mailchimp.lists.addListMember(listod, {
//           email_address: omail,
//           status: "subscribed",
//           merge_fields: {
//             FNAME: firstName,
//             LNAME: lastName
//           }
//
//
//         }
//       );
//
//       run();
//     }











    // Api Key
    // bbd74646f6002657b8f2e1395e57256a-us18

    // list //
    // 5509c0049f
