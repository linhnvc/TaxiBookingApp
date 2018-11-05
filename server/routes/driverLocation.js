var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://conglinh:Cl7939ICT@ds151753.mlab.com:51753/taxiapp", ["driversLocation"]);
// mongodb://<dbuser>:<dbpassword>@ds151753.mlab.com:51753/taxiapp

// update driver socketid
router.put("/driverLocationSocket/:id", function(req, res, next){
    var io = req.app.io;
    if (!req.body) {
        res.status(400);
        res.json({
            "error": "bad data"
        });

    } else {
		db.driversLocation.update({_id:mongojs.ObjectId(req.params.id)}, 
			{$set: {socketId:req.body.socketId}}, function(err, updateDetails){
				if(err){
					res.send(err);

				}else{
					res.send(updateDetails);
				}
		});
	}
})

// get near driver:
//get nearby driver
router.get("/driverLocation", function(req, res, next){
	db.driversLocation.ensureIndex({"coordinate":"2dsphere"});
	db.driversLocation.find({
			"coordinate":{
				"$near":{
					"$geometry":{
						"type":"Point",
						"coordinates": [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
					},
					"$maxDistance":10000
				}
			}
		}, function(err, location){
			if(err){
				res.send(err);

			}else{
				res.send(location);
			}
	});

});

module.exports = router;