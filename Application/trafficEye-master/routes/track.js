const express = require('express');
const router = express.Router();
const CrossRoad = require('../models/CrossRoad');
const Trash = require('../models/Trash');


router.put('/', function (req, res) {
    console.log(req.body);
    let newCrossRoad = new CrossRoad(
        req.body
    );


    // let crossRoad = {
    //     road:{
    //         axe: req.body.axe,
    //         coords: {
    //             start: {
    //                 lat: req.body.coords.lat,
    //                 lng: req.body.coords.lng
    //             },
    //             end:{
    //                 lat:req.body.coords.lat,
    //                 lng:req.body.coords.lng
    //             }
    //         }
    //     },
    //     center:{}
    // };
    //


    CrossRoad.addCr(newCrossRoad, function (err, cr) {
        if (err) {
            res.json(err);
        } else {
            res.json({success: true, msg: 'CrossRoad Created'});
        }
    });

});

router.post('/', function (req, res) {
    let update =
        {
            label: req.body.label,
            XcarCount: req.body.XcarCount,
            Xstatus: req.body.Xstatus,
            YcarCount: req.body.YcarCount,
            Ystatus: req.body.Ystatus,
            status: req.body.status
        }

    CrossRoad.updateCr(update, function (err, cross) {
        if (err) {
            res.json({success: false, msg: 'Failed to update CrossRoad'});
        } else {
            res.json({success: true, msg: 'CrossRoad updated'});
            // res.json(cross)
        }
    });
});

router.get('/', function (req, res) {
    let label = 'cross0';
    CrossRoad.getOne(label, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            res.json(info);
        }
    });

});



router.delete('/', function (req, res) {

    CrossRoad.deleteCr(req.body.label, function (err, cross) {
        if (err) {
            res.json({success: false, msg: 'Failed to update CrossRoad'});
        } else {
            // res.json({success: true, msg: 'CrossRoad updated'});
            res.json(cross)
        }
    });
});


router.post('/trash', function (req, res) {

    let update={
        label:req.body.label,
        level:req.body.level
    };
    Trash.update(update,function (err,trash) {
        if(err){
            res.json(err);
        }else {
            res.json({success:true,info:'trash level'+trash.level})
        }
    })
});

router.put('/trash', function (req, res) {

    let newTrash=new Trash({
        label:req.body.label,
        level:req.body.level
    });
    Trash.add(newTrash,function (err,trash) {
        if(err){
            res.json(err);
        }else {
            res.json({success:true,info:'new trash added : '+trash.label})
        }
    })
});

router.get('/trash', function (req, res) {
    let label='trash0';
    Trash.getOne(label,function (err,trash) {
        if(err){
            res.json(err);
        }else {
            res.json(trash)
        }
    })
});

module.exports = router;