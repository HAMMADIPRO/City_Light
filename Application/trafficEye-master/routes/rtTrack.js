const express = require('express');
const router = express.Router();
const Info = require('../models/CrossRoad');

// router.post('/', function (req, res) {
//
// console.log('POSTED');
// console.log(req.body.hello);
// res.json('POSTED');
// });

router.put('/', function (req, res) {
    let user= 'user01';
    let newInfo={
        temperature:req.body.temperature,
        heartbeat:req.body.heartbeat
    };
    Info.editInfo(user, newInfo, function (err, info) {
        if (err) {
            res.json({success: false, msg: 'Failed to edit Info'});
        } else {
            res.json({success: true, msg: ' Info updated '});
        }
    });
    console.log(req.body);
});

router.post('/', function (req, res) {
    let newInfo=new Info(
        {
            user:'user01',
            temperature:req.body.temperature,
            heartbeat:req.body.heartbeat
        }
    );
    Info.addInfo(newInfo, function (err, info) {
        if (err) {
            res.json({success: false, msg: 'Failed to add new Info'});
        } else {
            res.json({success: true, msg: ' Info added for :' + info.user});
        }
    });

    console.log(req.body);

});

router.get('/', function (req, res) {
    // res.send({
    //     temperature: 60,
    //     heartbeat: 72,
    //     location: '33.983821, -6.868885'
    // });
    let user='user01';

    Info.getOne(user,function (err,info) {
        if(err){
            console.log(err);
        } else{
            res.json(info);
        }
    });

});

module.exports = router;