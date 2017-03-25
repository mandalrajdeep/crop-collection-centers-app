var User = require('../models/user').User;
var Token = require('../models/user').Token;
var Crop = require('../models/crop').Crop;
var Param = require('../models/crop').Param;

var Roles = require('../config/roles');

// access arrays
var getAll = ['admin'];

// URL localhost:8080/crop/
module.exports = function(router, passport){

		app.get('/', function(req, res) {
            Crop.find(function(err, crops) {
            if (err)
                res.send(err);
            return res.json(crops);
            });
        });

        app.get('/:crop_id', function(req, res){
            Crop.findById(req.params.crop_id, function(err, crop) {
            if (err)
                res.send(err);
            return res.json(crop);
            });
        });

        app.post('/', function(req, res) {
             var crop = new Crop();      // create a new instance of the Crop model
             crop.name = req.body.name;  // set the crops name (comes from the request)
             crop.variety = req.bosy.variety;
             crop.note = req.body.note;

            // save the crop and check for errors
            crop.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Crop created!' });
            });
        });

        app.put('/:crop_id', function(req, res) {

        });

        app.delete('/:crop_id', function(req, res) {

        });

        app.get('/param', function(req, res) {

        });

        app.post('/param', function(req, res) {

        });

        app.delete('/param/:param_id', function(req, res) {

        });

}