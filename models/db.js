var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var mongoDB = 'mongodb://localhost/NodejsProject';

mongoose.connect(mongoDB,function (err) {

    if(err){
        console.log("veritabanı hatası");
    }else{
        console.log('mongodb basarili');
    }
});