var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://conglinh:Cl7939ICT@ds151753.mlab.com:51753/taxiapp", ["bookings"]);
// mongodb://<dbuser>:<dbpassword>@ds151753.mlab.com:51753/taxiapp

router.get("/bookings", function(req, res, next){
    db.bookings.find(function(err, bookings) {
        if (err) {
            res.send(err);

        }
        res.json(bookings);
    })
});

router.post("/bookings", function(req, res, next) {
    var booking = req.body.data;
    if (!booking.userName) {
        res.status(400);
        res.json({
            error: "bad data"
        });
    } else {
        db.bookings.save(booking, function(err, savedBooking) {
            if (err) {
                res.send(err);
            }
            res.json(savedBooking);
        });
    }
})

module.exports = router;