const multer = require("multer")
const moment = require("moment")
const path = require("path")

const storageSetting = multer.diskStorage({
    destination:function (req,file,cb){
        return cb(null,path.resolve(__dirname,"../../uploads"));
    },
    filename: function (req,file,cb){
        const uniqueCode = moment().format("YYYYMMDD") + '-' + Math.round(Math.random() * 1E9)
        return cb(null, uniqueCode+ '-' + file.originalname)
    }

}) 

module.exports = storageSetting