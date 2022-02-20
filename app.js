const express = require('express');
const https = require('https');
const port = 9000;

const app = express();

app.use(express.static('assets'));

app.use(express.urlencoded());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res){
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us19.api.mailchimp.com/3.0/lists/7beed6399d";

    const options = {
        method: "POST",
        auth: "sahil:563ee412a48e38b9a5a7fb19cbea2676-us19"
    };

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            if(response.statusCode === 200){
                res.sendFile(__dirname + '/success.html');
            }
            else{
                res.sendFile(__dirname + '/failure.html');
            }
        });
    });

    request.write(jsonData);
    request.end();

});

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('The server is up and running on port:', port);
})


/*
    API Key
    563ee412a48e38b9a5a7fb19cbea2676-us19
*/

/*
    List ID
    7beed6399d
*/
