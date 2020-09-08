const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    label:String,
    level:String
});
const Trash = mongoose.model("Trash", Schema);
module.exports = Trash;


module.exports.getAll = (callback) => {
    Trash.find(callback);
};

module.exports.getOne = (label, callback) => {
    Trash.findOne({label: label}, callback);
};

module.exports.update = (update, callback) => {
    Trash.findOneAndUpdate({label: update.label},{
        $set:{level:update.level}
        }
    , callback);
};

module.exports.add = (newTrash, callback) => {
    Trash.create(newTrash,callback);
};

