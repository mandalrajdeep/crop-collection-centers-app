var fs = require('fs');

var User = require('../models/user').User;
var Token = require('../models/user').Token;
var Crop = require('../models/crop');

//var Roles = require('../config/roles.js');

// URL localhost:8080/crop/
module.exports = function(router, passport){

        // fetch all crops by crop/
        router.get('/', function(req, res) {
            Crop.find(function(err, crops) {
            if (err)
                res.send(err);
            else res.json(crops);
            });
        });

        router.post('/', function(req, res) {
            var crop = new Crop();      // create a new instance of the Crop model
            crop.name = req.body.name;  // set the crops name (comes from the request)
            crop.variety = req.body.variety;
            crop.note = req.body.note;
            var parameters = req.body.parameters;
            for (var param in parameters) {
                 crop.parameters.push({name: param, unit: parameters[param]});
            }

            // save the crop and check for errors
            crop.save(function(err) {
                if (err)
                    res.send(err);
                else res.json({ message: 'Crop created!' });
            });
        });

        // fetch one by crop/ID
		router.get('/:crop_id', function(req, res){
            Crop.findById(req.params.crop_id, function(err, crop) {
                if (err)
                    res.send(err);
                else res.json(crop);
            });
        });

        router.put('/:crop_id', function(req, res) {
            Crop.findById(req.params.crop_id, function(err, crop) {
                if (err)
                    res.send(err);
                else {
                    crop.name = req.body.name;  // set the crops name (comes from the request)
                    crop.variety = req.body.variety;
                    crop.note = req.body.note;

                    var parameters = req.body.parameters;
                    for (var param in parameters) {
                        crop.parameters.push({name: param, unit: parameters[param]});
                    }
                    // saving cropp after update
                    crop.save(function(err) {
                        if (err)
                            res.send(err);
                        else res.json({ message: 'Crop updated!' });
                    });
                }

            });
        });

        router.delete('/:crop_id', function(req, res) {
            Crop.remove({
                _id: req.params.crop_id
            }, function (err, crop) {
                if (err)
                    res.send(err);
                else if (!crop)
                    res.send('Invalid ID for deletion');
                else res.json({message: 'Successfully Deleted'})
            })
        });
        
        // fetch all by crop name
        router.get('/list/:crop_name', function(req, res){
            Crop.find({name:req.params.crop_name}).exec(function(err, crop) {
                console.log(crop);
                if (err)
                    res.send(err);
                else res.json(crop);
            });
        });
        
        // fetch one by crop name and type
        router.get('/list/:crop_name/:variety_name', function(req, res){
            Crop.findOne({name:req.params.crop_name, variety:req.params.variety_name}, function(err, crop) {
                if (err)
                    res.send(err);
                else res.json(crop);
            });
        });
};
