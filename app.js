var gamerocket = require("gamerocket");
var express = require("express");
var acapp = express();
 
acapp.use(express.bodyParser());
var gateway = gamerocket.connect({
    environment: gamerocket.Environment.Production,
    apiKey: "6c16df9febf142bf8eb3891c3255ae7d",
    secretKey: "d94931fd34c247e19cc605cfe5a4a22b"
});
acapp.get("/", function (req, res) {
    res.render("form.ejs");
});
 
acapp.post("/create_player", function (req, res) {
    gateway.player.create({ 
            name: req.body.name, 
            locale: req.body.locale
        }, function (err, result) {
            if (result) {
                res.send("<h1>Success! Player ID: " + result.player.id + "</h1>");
            } else {
                res.send("<h1>Error:  " + err.error_description + "</h1>");
            }
        }
    );
});
 
acapp.listen(3000);