const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    label:String,
    X: {
        coords: {
            start: {lat: Number, lng: Number},
            end: {lat: Number, lng: Number}
        },
        status: String,
        carCount:Number
    },
    Y: {
        coords: {
            start: {lat: Number, lng: Number},
            end: {lat: Number, lng: Number}
        },
        status: String,
        carCount:Number
    },
    center: {lat: Number, lng: Number},
    status:String
});
const CrossRoad = mongoose.model("CrossRoad", Schema);
module.exports = CrossRoad;


module.exports.getAll = (callback) => {
    CrossRoad.find(callback);
};

module.exports.getOne = (label, callback) => {
    CrossRoad.findOne({label: label}, callback);
};

module.exports.addCr = (newCr, callback) => {
    CrossRoad.create(newCr, callback);
};

module.exports.updateCr = (update, callback) => {



    // if(update.XcarCount >=0){
    //     console.log("update.XcarCount",update.XcarCount);
    //     CrossRoad.findOneAndUpdate({label: update.label}, {
    //         $set: {
    //             "X.carCount":update.XcarCount
    //         }
    //     });
    // }
    //
    //
    // if(update.YcarCount >=0){
    //     console.log("update.YcarCount",update.YcarCount);
    //     CrossRoad.findOneAndUpdate({label: update.label}, {
    //         $set: {
    //             "Y.carCount":update.YcarCount
    //         }
    //     });
    // }



    if(update.Xstatus){
        console.log('X',update.Xstatus);
        CrossRoad.findOneAndUpdate({label: update.label}, {
            $set: {
                "X.status":update.Xstatus
            }
        },callback);

    }

    if(update.Ystatus){
        console.log('Y',update.Ystatus);
        CrossRoad.findOneAndUpdate({label: update.label}, {
            $set: {
                "Y.status":update.Ystatus,
            }
        },callback);
    }

    // if(update.Ystatus==='warning' || update.Xstatus==='warning'){
    //     console.log('status warning');
    //     CrossRoad.findOneAndUpdate({label: update.label}, {
    //         $set: {
    //             status:'warning'
    //         }
    //     });
    //
    // }else if(update.Ystatus==='neutral' || update.Xstatus==='neutral') {
    //     console.log('status neutral');
    //     CrossRoad.findOneAndUpdate({label: update.label}, {
    //     $set: {
    //         status:'neutral'
    //     }
    // });
    //
    // }
    // callback();


};


module.exports.deleteCr = (label, callback) => {
    CrossRoad.findOneAndRemove({label:label}, callback);
};