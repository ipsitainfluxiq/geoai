/**
 * Created by debasis on 14/9/16.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var request = require('request');
var randomString = require('random-string');
var cheerio = require('cheerio');
var http = require('http').Server(app);
var mailer = require("nodemailer");
var bodyParser = require('body-parser');
app.use(bodyParser.json({ parameterLimit: 10000000,
    limit: '90mb'}));
app.use(bodyParser.urlencoded({ parameterLimit: 10000000,
    limit: '90mb', extended: false}));
var datetimestamp='';
var filename='';
var EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter()
//emitter.setMaxListeners(100)
emitter.setMaxListeners(0)
var multer  = require('multer');
var multer1  = require('multer');
var datetimestamp='';
var filename='';
var filename1='';
var imgwidth1;
var imgheight1;

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, '../assets/uploads/');
        //  cb(null, '../src/assets/uploads/');
    },
    filename: function (req, file, cb) {
        //console.log(cb);

        console.log('file.originalname'+file.originalname);
        filename=file.originalname.split('.')[0].replace(/ /g,'') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        // console.log(filename);
        cb(null, filename);
    }
});
var storage1 = multer1.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, '../assets/uploads/'); // this is for server site, run remotehost and check the path
        // cb(null, '../src/assets/uploads/');
    },
    filename: function (req, file, cb) {
        //console.log(cb);

        console.log('file.originalname'+file.originalname);
        filename1=file.originalname.split('.')[0].replace(/ /g,'') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        cb(null, filename1);
        //   setTimeout(function () {
        var sizeOf1 = require('image-size');
        console.log(filename1);
        console.log('call storage1');
        //  sizeOf1('../src/assets/uploads/'+filename1, function (err, dimensions) {
        sizeOf1('../assets/uploads/'+filename1, function (err, dimensions) {
            console.log('dimensions.width, dimensions.height');
            console.log(dimensions.width, dimensions.height);
            imgwidth1=dimensions.width;
            imgheight1=dimensions.height;
        });
        //   },500);
    }

});


var upload = multer({ //multer settings
    storage: storage
}).single('file');
var upload1 = multer({ //multer settings
    storage: storage1
}).single('file');

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/uploads', function(req, res) {
    datetimestamp = Date.now();
    upload(req,res,function(err){
        /*console.log(1);
         console.log(err);
         console.log(filename);*/

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        res.json(filename);


    });
});

app.post('/imguploads', function(req, res) {
    console.log('imguploads call');
    datetimestamp = Date.now();
    upload1(req,res,function(err){
        /*console.log(1);
         console.log(err);
         console.log(filename);*/

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        setTimeout(function () {
            console.log('call res.json');
            console.log({filename:filename1,imgheight:imgheight1,imgwidth:imgwidth1});
            res.json({filename:filename1,imgheight:imgheight1,imgwidth:imgwidth1});
            filename1=[];
            imgheight1=null;
            imgwidth1=null;
        },500);
    });

});


var mongodb = require('mongodb');
var db;
var url = 'mongodb://localhost:27017/geoai';
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log('err');
        console.log(err);

    }else{
        db=database;
        console.log("connected");
    }});

/*--------------------------------------(start_for_geoai----------------------------*/

app.get('/readcsv',function (req,resp) {
    console.log('readcs cll');
    var link = 'http://geofencedsp.com/assets/php/readvalue.php?path='+req.body.filenameis;
    request(link, function(error2, response, html2){
        if(!error2) {
            console.log('success');
            console.log(html2);
            resp.send(html2);
        }
        else {
            console.log("error");
            //   console.log('in error  :'+error2);
            resp.send('error');
        }
    });

});






app.get('/addresslist',function (req,resp) {

    var collection = db.collection('address');

    collection.find().limit(700).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }

    });

});

/*app.post('/insertshapes', function (req, resp) {
 console.log('insertshapes');
 var collection = db.collection('shapes');
 if(req.body.type == 'circle'){
 var data = {
 radius:req.body.radius,
 center:req.body.center,
 }
 }

 if(req.body.type == 'rectangle') {
 var data = {
 north:req.body.ne_lat,
 east:req.body.ne_lng,
 south:req.body.sw_lat,
 west:req.body.sw_lng,
 }
 }

 if(req.body.type == 'polygon') {
 var data = {
 path:req.body.path,
 }
 }
 collection.insert([{
 email:req.body.email,
 type: req.body.type,
 value: data,
 }],
 function(err, result) {
 if (err){
 console.log('err');
 resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
 }
 else{
 console.log(result);
 resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
 }
 });
 });

 app.post('/getallshapes',function (req,resp) {
 var collection = db.collection('shapes');
 collection.find({email:req.body.email}).toArray(function(err, items) {
 //  collection.drop(function(err, items) {
 if (err) {
 console.log(err);
 resp.send(JSON.stringify({'res':[]}));
 } else {
 resp.send(JSON.stringify(items));
 }

 });

 });
 */

app.get('/insertshapes', function (req, resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    var dt = new Date();
    var date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    collection.find({createaudienceid:req.body[0].createaudienceid}).toArray(function(err, items) {
        console.log(req.body[0].createaudienceid);
        console.log(req.body[0].email);
        if (items.length<1) {
            collection.insert([{
                    createaudienceid:req.body[0].createaudienceid,
                    emailid:req.body[0].email,
                    dateofcreation:date,
                    value: req.body,
                    locations: null
                }],
                function(err, result) {
                    if (err){
                    }
                    else{
                    }
                });
        } else {
            var data = {
                dateofcreation:date,
                value: req.body,
                locations: null
            }
            collection.update({createaudienceid:req.body[0].createaudienceid, emailid:req.body[0].email}, {$set: data}, true, true);
        }
        console.log('*****************************************************');
        console.log(data);
        console.log('*****************************************************');
        console.log(items);
        resp.send(JSON.stringify({'status':'success'}));
    });
});
app.get('/locations', function (req, resp) {
    req.body=req.query;
    console.log('hi');
    var collection = db.collection('campaigninfo');
    var dt = new Date();
    var date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    console.log(req.body.createaudienceid);
    collection.find({createaudienceid:req.body.createaudienceid}).toArray(function(err, items) {
        /*  if (items.length<1) {
         console.log('length');
         collection.insert([{
         createaudienceid:req.body.createaudienceid,
         emailid:req.body.email,
         dateofcreation:date,
         locations: req.body.selected_locations,
         value:null
         }],
         function(err, result) {
         if (err){
         }
         else{
         }
         });
         } else {*/
        var data = {
            dateofcreation:date,
            locations: req.body.selected_locations,
            value:null
        }
        collection.update({createaudienceid:req.body.createaudienceid, emailid:req.body.email}, {$set: data}, true, true);
        // }
        resp.send(JSON.stringify({'status':'success'}));
    });
});
app.get('/getallshapes',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    collection.find({emailid:req.body.emailid , createaudienceid:req.body.createaudienceid}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify(items[0]));
        }
    });
});

app.get('/locationlist',function (req,resp) {
    req.body=req.query;
    console.log('locationlist called');
    var collection = db.collection('locationtry1');
    collection.find({parent_locations_id:req.body.parentid}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify(items));
        }

    });

});

app.get('/deleteaudience', function (req, resp) {
    req.body=req.query;
    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('campaigninfo');
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});


/*-------------------------------------------------FORGET_PASSWORD_start-----------------------------------------------*/
app.get('/forgetpassword', function (req, resp) {
    req.body=req.query;
    console.log('forgt pass');
    var collection = db.collection('signupnew');
    collection.find({ email:req.body.email }).toArray(function(err, items) {
        if(items.length>0){
            var randomstring = require("randomstring");
            var generatedcode=randomstring.generate();
            var data = {
                accesscode: generatedcode,
            }
            collection.update({ email:req.body.email}, {$set: data}, true, true);
            var smtpTransport = mailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: "itplcc40@gmail.com",
                    pass: "DevelP7@"
                }
            });
            var mail = {
                from: "Admin <ipsitaghosal1@gmail.com>",
                to: req.body.email,
                // to: 'ipsita.influxiq@gmail.com',
                subject: 'Access code',
                html: 'Access code is given -->  '+generatedcode
            }
            smtpTransport.sendMail(mail, function (error, response) {
                console.log('send');
                smtpTransport.close();
            });
            resp.send(JSON.stringify({'status':'success','msg':req.body.email}));
        }
        if(items.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Emailid invalid...'}));
            return;
        }
    });
});


app.get('/accesscodecheck', function (req, resp) {
    req.body=req.query;
    var collection = db.collection('signupnew');
    collection.find({ email:req.body.email, accesscode:req.body.accesscode}).toArray(function(err, items) {
        console.log(items.length);
        if(items.length>0) {
            resp.send(JSON.stringify({'status': 'success', 'msg': ''}));
        }
        if(items.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Wrong access code'}));
            return;
        }
    });
});

app.get('/newpassword', function (req, resp) {
    req.body=req.query;
    var collection = db.collection('signupnew');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    var data = {
        password: hash
    }
    collection.update({email:req.body.email}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));
});

var parse = require('csv-parse');


app.get('/csvuploads',function (req,resp) {
    req.body=req.query;
    var csvData=[];
    var fs = require('fs'),
        path = require('path');
    //  var filepath = '../src/assets/uploads/'+req.body.filenameis; //local
    var filepath = '../assets/uploads/'+req.body.filenameis; //server
    fs.createReadStream(filepath)
        .pipe(parse({delimiter: ','}))
        .on('data', function(csvrow) {
            //   console.log(csvrow);
            //do something with csvrow
            csvData.push(csvrow);
        })
        .on('end',function() {
            //do something wiht csvData
            // console.log(csvData);
            if(csvData.length<8002){
                //   resp.send(csvData);
                resp.send(JSON.stringify({'data':csvData, 'status':'Success'}));
            }
            else{
                // resp.send('Error! You can upload upto 2000 data');
                resp.send(JSON.stringify({'data':'Error! You can upload upto 8000 data', 'status':'Error'}));
            }
        });
});
/*-------------------------------------------------FORGET_PASSWORD_end-----------------------------------------------*/

app.get('/signup' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('signup');
    console.log('99999999');
    console.log(req.body.agency_name);
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    collection.insert([{
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            companyname: req.body.companyname,
            email: req.body.email,
            password: hash,
            agencyval: req.body.agencyval,
            agency_name: req.body.agency_name,
            // month: req.body.month,
            //  day: req.body.day,
            //  year: req.body.year,
            phone: req.body.phone,
            about_us: req.body.about_us,
            type:0,
            // location: req.body.location,
            // state: req.body.state,
        }],
        function(err, result) {
            if (err){
                console.log('err');
                resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
            }
            else{
                console.log(result);
                resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
            }
        });
});

app.get('/changepassword', function (req, resp) {
    req.body=req.query;
    console.log('has-error');
    var cryptoold = require('crypto');
    var secretold = req.body.oldpassword;
    var hashold = cryptoold.createHmac('sha256', secretold)
        .update('password')
        .digest('hex');


    var cryptonew = require('crypto');
    var secretnew = req.body.password;
    var hashnew = cryptonew.createHmac('sha256', secretnew)
        .update('password')
        .digest('hex');
    var data = {
        password: hashnew
    }

    var collection = db.collection('signupnew');
    var mail = req.body.email;

    collection.find({email: mail, password: hashold}).toArray(function (err, items) {

        if(items.length==0) {
            resp.send(JSON.stringify({'status': 'error', 'msg': 'Old password doesnot match'}));
            return;
        }
        else {
            collection.update({email: mail}, {$set: data}, true, true);
            resp.send(JSON.stringify({'status': 'success', 'msg': 'Password updated..'}));
        }
    });
});


app.get('/updateprofile',function(req,resp){
    req.body=req.query;
    console.log('called');
    var collection = db.collection('signupnew');
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        month: req.body.month,
        day: req.body.day,
        year: req.body.year,
        phone: req.body.phone,
        location: req.body.location,
        state: req.body.state,
    }
    var mail = req.body.email;
    console.log(mail);
    collection.update({email:mail}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});




app.get('/accountdetails',function(req,resp){        // this is for editadmin page
    req.body=req.query;
    console.log("accountdetails from server.js called");
    var resitem = {};
    var collection = db.collection('signupnew');
    var mail = req.body.emailid;

    collection.find({email:mail}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});



app.get('/calluploads',function (req,resp) {
    req.body=req.query;
    console.log(req.body.filenameis);
    console.log(req.body.srcfile);

    // var filepath = '../src/assets/uploads/'+req.body.filenameis;   // this is same path as uploads file has at the top of this page (localhost)

    var filepath = '../assets/uploads/'+req.body.filenameis;    // (server)
    console.log('filepath');
    console.log(filepath);
    var fs = require('fs'),
        path = require('path');
    // filePath = path.join(__dirname, 'start.html');
    fs.readFile(filepath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
            resp.send(data);
        } else {
            console.log(err);
        }
    });
});

app.get('/userlist',function (req,resp) {

    var collection = db.collection('signupnew');

    collection.find().toArray(function(err, items) {

        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify(items));
        }

    });

});



app.get('/simplesolution' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('simplesolution');
    /*console.log('req.body');
     console.log(req.body);
     console.log('req.body.audiences_automative');
     console.log(req.body.audiences_automative);
     console.log('req.body.audiences_buisness_employment_account_bank');
     console.log(req.body.audiences_buisness_employment_account_bank);
     console.log('show?');*/
    collection.insert([req.body],
        function(err, result) {
            if (err){
                console.log('err');
                resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
            }
            else{
                console.log(result);
                resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
            }
        });
});

app.get('/basicinformation' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('basicinformation');
    var o_id = new mongodb.ObjectID(req.body.simplesolutionid);
    console.log('req.body');
    console.log(req.body);
    collection.insert([req.body],
        function(err, result) {
            if (err){
                console.log('err');
                resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
            }
            else{
                // console.log(result);
                var dataupdate = {
                    simplesolutionid: o_id,
                }
                collection.update({ _id:result.ops[0]._id}, {$set: dataupdate}, true, true);
                resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
            }
        });
});


app.get('/confirmation', function (req,resp) {
    req.body=req.query;
    var html='<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;font-family: Arial, Helvetica, sans-serif; margin: 0 auto;overflow-wrap: break-word;word-wrap: break-word;  hyphens: auto;  -ms-hyphens: auto; -moz-hyphens: auto; -webkit-hyphens: auto; hyphens: auto;"> <tr> <td style="text-align: center; vertical-align: top; font-size: 0; background:#e5e7e0; padding: 0px;"> <!--[if (gte mso 9)|(IE)]> <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0px;"> <tr> <td style="padding: 0px;"> <![endif]--> <div style="display: block; width: 100%; margin: 0; padding: 0;"> <div style="width: 100%; margin: 0 auto; display: block;"> <a  href="javascript:void(0);" target="_blank" style="display:inline-block;margin: 16px auto 10px; background-color: #fff; padding: 10px;border: 1px solid #dfdcd6;"> <img src="http://geoai.influxiq.com/assets/images/geoai_logo.jpg" style="max-width: 100%;" alt="#"> </a> </div> <div style="width: 100%; margin: 0 auto; display: block;"> <h2 style="text-transform:uppercase; font-size:24px; font-weight: bold; color:#1979c3; line-height:25px; text-align: center; margin: 0; padding: 10px 0 20px 0 !important;text-decoration: none;display: block;">Order Information From GEOAI</h2> </div>  <div style="width: 100%; margin: 0 auto; display: block;"> <div style="width: 94%;margin: 0 auto 20px;display: block;border: 1px solid #bcbcbc;padding: 5px;background: #fff;">';

    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('simplesolution').aggregate([
        { "$match": { "_id": o_id } },
        {
            $lookup: {
                from: "basicinformation",
                localField: "_id",
                foreignField: "simplesolutionid",
                as: "Userlogindata"
            }
        },
        { "$unwind": "$Userlogindata" },
    ]);
    var val = [];
    collection.toArray(function (err, items) {
        //    resp.send(JSON.stringify(items));

        console.log(items.length);
        for(i in items[0]){
            //console.log(i);
            //console.log(items[0]);
            var i1;
            if(items[0][i].length>1 || items[0][i]==true){
                html+=' <div style="width: 44%;overflow: hidden;display: inline-block;vertical-align: top;padding: 0% 1% 0% 1%;"> <div style="text-transform:capitalize; font-size:16px; font-weight: normal; color:#1b1b1b; line-height:18px; vertical-align: middle; text-align: left; margin: 0; padding: 10px 0 10px 0 !important;text-decoration: none;display: block;">'+i.replace("_", " ")+':</div> </div> <div style="width: 50%;display: inline-block;vertical-align: top;padding: 0% 2% 0% 1%;"> <div style="text-transform:none; font-size:16px; font-weight: normal; color:#1b1b1b; line-height:18px; vertical-align: middle; text-align: left; margin: 0; padding: 10px 0 10px 20px !important;text-decoration: none;display: block;">'+items[0][i]+'</div> </div><div class="clearfix"></div>';

            }

        }



        //for(i in items[0]){
        //console.log(i);
        //console.log(items[0]);
        var i1;

        for(i1 in items[0].Userlogindata) {
            if (items[0].Userlogindata[i1].length > 1) {
                html += ' <div style="width: 44%;overflow: hidden;display: inline-block;vertical-align: top;padding: 0% 1% 0% 1%;"> <div style="text-transform:capitalize; font-size:16px; font-weight: normal; color:#1b1b1b; line-height:18px; vertical-align: middle; text-align: left; margin: 0; padding: 10px 0 10px 0 !important;text-decoration: none;display: block;">' + i1.replace("_", " ") + ':</div> </div> <div style="width: 50%;display: inline-block;vertical-align: top;padding: 0% 2% 0% 1%;"> <div style="text-transform:none; font-size:16px; font-weight: normal; color:#1b1b1b; line-height:18px; vertical-align: middle; text-align: left; margin: 0; padding: 10px 0 10px 20px !important;text-decoration: none;display: block;">' + JSON.stringify(items[0].Userlogindata[i1]) + '</div> </div><div class="clearfix"></div>';

            }
        }
        // }

        html+='</div></div> ';
        html+='</div> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> </td> </tr> </table>';

        var smtpTransport = mailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                user: "itplcc40@gmail.com",
                pass: "DevelP7@"
            }
        });

        var mail = {
            from: "Admin <ipsitaghosal1@gmail.com>",
            // to: req.body.email,
            to: 'ipsita.influxiq@gmail.com',
            subject: 'Welcome to Admin Management System',
            html:html,
        }

        smtpTransport.sendMail(mail, function (error, response) {
            console.log('send');
            smtpTransport.close();
        });

    });

    resp.send(JSON.stringify({'status': 'success'}));
});


app.get('/viewlogindetails', function (req, resp) {
    var collection1 = db.collection('users');
    var collection = db.collection('users').aggregate([

        { "$match": { "type": 3 } },
        {
            $lookup: {
                from: "ipaddress",
                localField: "email",
                foreignField: "mailid",
                as: "Userlogindata"
            }
        },
        /*{$match:{"Userlogindata._id":new mongodb.ObjectID('591d68b3957b8c55328d5cc3')}},*/
        { "$unwind": "$Userlogindata" },
        {$match:{"Userlogindata.type":0}},


    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify(items));

    });
});
app.get('/getdetails11', function (req,resp) {

    var smtpTransport = mailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "itplcc40@gmail.com",
            pass: "DevelP7@"
        }
    });

    var mail = {
        from: "Admin <ipsitaghosal1@gmail.com>",
        // to: req.body.email,
        to: 'ipsita.influxiq@gmail.com',
        subject: 'Welcome to Admin Management System',
        //  html: '<p> '+senddetails+' </p>'
        html: '<p>HIIIIIIIIIIIIIIIII </p>'
    }

    smtpTransport.sendMail(mail, function (error, response) {
        console.log('send');
        smtpTransport.close();
    });
    resp.send(JSON.stringify({'status':'done'}));
});

/*-----------------dated 11.48-----------------------*/
app.get('/addcreative',function(req,resp){
    req.body=req.query;
    var collection = db.collection('creatives');
    collection.insert([{
            emailid: req.body.emailid,
            creativename: req.body.creativename,
            description: req.body.description,
            code: req.body.code,
        }],
        function(err, result) {
            if (err){
                console.log('err');
                resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
            }
            else{
                console.log(result);
                resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
            }
        });
});


app.get('/creativelist',function (req,resp) {
    req.body=req.query;
    var emailid = req.body.emailid;
    var type = req.body.type;
    console.log(type);
    if(type == 0) { //user
        var collection = db.collection('creatives').aggregate([
            { "$match": { "emailid": emailid } },
            {
                $lookup: {
                    from: "signupnew",
                    localField: "emailid",   // localfield of subscribe
                    foreignField: "email",   //localfield of postcategorymanagement
                    as: "Creativeaddata"
                }
            },
            /*    { "$unwind": "$PostManegementdata" },*/
        ]);
        console.log('go');
    }
    if(type == 1) { //admin
        var collection = db.collection('creatives').aggregate([
            {
                $lookup: {
                    from: "signupnew",
                    localField: "emailid",   // localfield of subscribe
                    foreignField: "email",   //localfield of postcategorymanagement
                    as: "Creativeaddata"
                }
            },
            /*    { "$unwind": "$PostManegementdata" },*/
        ]);
    }
    collection.toArray(function (err, items) {
        console.log(items);
        resp.send(JSON.stringify(items));
    });
});

app.get('/deletecreative', function (req, resp) {
    req.body=req.query;
    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('creatives')
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});

app.get('/creativedetails',function(req,resp){        // this is for editadmin page
    req.body=req.query;
    console.log("creativedetails from server.js called");
    var resitem = {};
    var collection = db.collection('creatives');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.get('/editcreative',function(req,resp){
    req.body=req.query;
    var collection = db.collection('creatives');
    var data = {
        creativename: req.body.creativename,
        description: req.body.description,
        code: req.body.code
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});

app.get('/getcreativedetailsbyid', function (req,resp) {
    var collection= db.collection('creatives');
    var o_id = new mongodb.ObjectID(req.query.id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        resp.send(JSON.stringify(items));
        // resp.send(req.query.id);
    });
});


app.get('/addadmin',function(req,resp){
    req.body=req.query;
    var collection = db.collection('signupnew');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        /*  address: req.body.address,
         city: req.body.city,
         state: req.body.state,
         zip: req.body.zip,
         phone: req.body.phone,*/
        type:1,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

app.get('/adminlist',function (req,resp) {
    var collection = db.collection('signupnew');
    collection.find({type:1}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});



app.get('/details',function(req,resp){
    req.body=req.query;
    var resitem = {};
    var collection = db.collection('signupnew');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});


app.get('/editadmin',function(req,resp){
    req.body=req.query;
    var collection = db.collection('signupnew');
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});

app.get('/deleteadmin', function (req, resp) {
    req.body=req.query;
    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('signupnew');
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});

/*-----------------------------------------------------------------(end_for_geoai)
 --------------------------------------------------------------------------*/



/*-----------------------------------------------------------------(start)----------------------------------------------------------------------------------*/
app.get('/getdetails', function (req,resp) {
    var collection= db.collection('details');
    collection.find().toArray(function(err, items) {
        resp.send(JSON.stringify(items));
    });
});

app.get('/getdetails1', function (req,resp) {
    var collection= db.collection('details');
    var k=0;
    collection.find().skip(0).limit(200).toArray(function(err, items) {
        var counter=0;
        for(var i in items){
            var email=items[i].email;
            var uniqid=items[i]._id;
            setTimeout(function () {
                if(counter==700){
                    return;
                }
                calltodelete(items[i]);
                counter++;
            },1000)
            /*  for(var j in items) {
             calltodelete(items[j]);
             if ((items[j]._id != uniqid) && (items[j].email == email)) {
             collection.remove( {"_id": items[j]._id});
             }
             }*/
        }
    });
});

function calltodelete(items){
    var collection1= db.collection('details');
    collection1.find().toArray(function(err1, items1) {
        console.log("2.3");
        for(p in items1){
            if(items1[p]._id != items._id && items1[p].email == items.email){

                collection1.remove( {"_id": items1[p]._id});
            }
        }
    });
}

/*-------------------------------------------------------------(end)---------------------------------------------------------------------------------------*/

/*--------------------------------------------------------START 1-------------------------------------------------------------------------------------------*/

/*var urlstartcounters=0;
 app.get('/autos',function (req,resp) {
 console.log(req.query.counter);
 urlstartcounters=req.query.counter;
 var interv=setInterval(function () {

 request('http://localhost:3004/autourlupdates?counter='+urlstartcounters, function(error2, response, html2){
 if(!error2) {
 var $ = cheerio.load(html2);
 var dealernames;
 }
 else {
 console.log("inside geturllists");
 console.log('in error  :'+error2);
 }
 });
 urlstartcounters=parseInt(urlstartcounters+10);
 console.log(urlstartcounters+'url sc');
 if(urlstartcounters>1000) clearInterval(interv);
 },5000);
 resp.send("success");
 });*/



app.get('/autourlupdates',function(req,resp){
    var url = 'https://www.autotrader.com/car-dealers/Seattle+WA-98121?filterName=pagination&firstRecord='+req.query.counter+'&numRecords=10&searchRadius=500&sortBy=distanceASC';
    setTimeout(function () {
        console.log("inside autourlupdates");
        geturllists(url);
    },500)

    setInterval(function () {
        //urlstartcounter+=10;
        var curls = 'https://www.autotrader.com/car-dealers/Seattle+WA-98121?filterName=zip&firstRecord='+urlstartcounters+'&numRecords=10&searchRadius=500&sortBy=distanceASC';
        //console.log(urlstartcounter);
        //console.log(curl);
        //console.log("inside autourlupdate");
        //if(urlstartcounter<300)geturllist(curl);
    },1000);

    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));
});


function geturllists(url){

    request(url, function(error2, response, html2){
        if(!error2) {
            var $ = cheerio.load(html2);
            var dealernames;
            //setInterval(function () {

            dealernames=$('.dealer-listing').each(function () {
                /*console.log("Dealer name");
                 console.log($(this).find('.dealer-name').html());
                 console.log("Address 1");
                 console.log($(this).find('.address1').html());
                 console.log("Address 2");
                 console.log($(this).find('.address2').html());
                 console.log("City State Zip");
                 console.log($(this).find('.cityStateZip').html());
                 console.log("City");
                 console.log($(this).find('.cityStateZip').find('span[itemprop="addressLocality"]').html());
                 console.log("State");
                 console.log($(this).find('.cityStateZip').find('span[itemprop="addressRegion"]').html());
                 console.log("Zip");
                 console.log($(this).find('.cityStateZip').find('span[itemprop="postalCode"]').html());
                 console.log("Phone no");
                 console.log($(this).find('.atcui-block').html());*/
                var collection = db.collection('dealerss');
                collection.insert([{
                        dealername:$(this).find('.dealer-name').html() ,
                        url:$(this).find('.dealer-name').attr('href') ,
                        address1: $(this).find('.address1').html() ,
                        address2: $(this).find('.address2').html(),
                        city: $(this).find('.cityStateZip').find('span[itemprop="addressLocality"]').html(),
                        state: $(this).find('.cityStateZip').find('span[itemprop="addressRegion"]').html(),
                        zip: $(this).find('.cityStateZip').find('span[itemprop="postalCode"]').html(),
                        phoneno: $(this).find('.atcui-block').html(),
                        facebookurl: '',
                    }],
                    function (err2, result2) {
                        if (err2) {
                            console.log('error'+err);
                        } else {
                            //response.send(JSON.stringify({'id':result2.ops[0]._id}));
                            //console.log(result2.ops[0]._id);
                            //console.log('https://www.autotrader.com'+result2.ops[0].url,result2.ops[0]._id);
                            getdetailss('https://www.autotrader.com'+result2.ops[0].url,result2.ops[0]._id);

                            setTimeout(function () {

                                $('.pagination-button').each(function () {

                                    if($(this).hasClass('active')){
                                        console.log('pageination text');
                                        //$(this).next().click();
                                        console.log($(this).text());
                                    }
                                })
                            },5000);
                        }
                    });
            });
            // },12000);

            /*setTimeout(function () {

             },500);*/
        }
        else {
            console.log("inside geturllists");
            console.log('in error  :'+error2);
        }
    });
}

function getdetailss(url,id){

    request(url, function(error2, response, html2){

        if(!error2) {
            var $ = cheerio.load(html2);
            var dealerinfo;
            var dealerfb;
            //dealerinfo=$('.atcui-list').find('a').attr('href')(function () {
            var collection = db.collection('dealerss');
            var data = {
                websiteurl: $('a[target="_siteLink"]').attr('href'),
                facebookurl: $('a[target="_facebook"]').attr('href'),
            }
            console.log($('#j_id_2q').html());
            $('.atcui-title').each(function(){

                if($(this).text()=='Facebook Feed'){

                    console.log('got fb url');
                    console.log($(this).next().attr('href'));
                }

            });
            //console.log("hi");
            console.log(data);
            collection.update({_id: id}, {$set: data}, true, true);

            // });
        }
        else {
            console.log("inside getdetailserrors");
            console.log('in error  :'+error2);
        }
    });



}

/*--------------START-------------------------------------------*/

/*var urlstartcounter=50;
 app.get('/auto',function (req,resp) {
 console.log(req.query.counter);
 urlstartcounter=req.query.counter;
 var interv=setInterval(function () {


 request('http://localhost:3004/autourlupdate?counter='+urlstartcounter, function(error2, response, html2){
 if(!error2) {
 var $ = cheerio.load(html2);
 var dealername;
 //setInterval(function () {

 // },12000);

 /!*setTimeout(function () {

 },500);*!/
 }
 else {
 console.log("inside geturllist");
 console.log('in error  :'+error2);
 }
 });
 urlstartcounter=parseInt(urlstartcounter+10);
 console.log(urlstartcounter+'url sc');
 if(urlstartcounter>1000) clearInterval(interv);
 },5000);
 resp.send("success");
 });*/



app.get('/autourlupdate',function(req,resp){
    var url = 'https://www.autotrader.com/car-dealers/Dallas+TX-75207?filterName=pagination&firstRecord='+req.query.counter+'&numRecords=10&searchRadius=500&sortBy=distanceASC';

    setTimeout(function () {
        console.log("inside autourlupdate");
        geturllist(url);
    },500)



    setInterval(function () {
        //urlstartcounter+=10;
        var curl = 'https://www.autotrader.com/car-dealers/Dallas+TX-75207?filterName=zip&firstRecord='+urlstartcounter+'&numRecords=10&searchRadius=500&sortBy=distanceASC';
        //console.log(urlstartcounter);
        //console.log(curl);
        //console.log("inside autourlupdate");
        //if(urlstartcounter<300)geturllist(curl);
    },1000);

    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));
});


function geturllist(url){

    /*if(urlstartcounter>150){
     //console.log('in get url');
     //console.log(url);
     return;
     }*/
    request(url, function(error2, response, html2){
        if(!error2) {
            var $ = cheerio.load(html2);
            var dealername;
            //setInterval(function () {

            dealername=$('.dealer-listing').each(function () {
                /*console.log("Dealer name");
                 console.log($(this).find('.dealer-name').html());
                 console.log("Address 1");
                 console.log($(this).find('.address1').html());
                 console.log("Address 2");
                 console.log($(this).find('.address2').html());
                 console.log("City State Zip");
                 console.log($(this).find('.cityStateZip').html());
                 console.log("City");
                 console.log($(this).find('.cityStateZip').find('span[itemprop="addressLocality"]').html());
                 console.log("State");
                 console.log($(this).find('.cityStateZip').find('span[itemprop="addressRegion"]').html());
                 console.log("Zip");
                 console.log($(this).find('.cityStateZip').find('span[itemprop="postalCode"]').html());
                 console.log("Phone no");
                 console.log($(this).find('.atcui-block').html());*/
                var collection = db.collection('dealers');
                collection.insert([{
                        dealername:$(this).find('.dealer-name').html() ,
                        url:$(this).find('.dealer-name').attr('href') ,
                        address1: $(this).find('.address1').html() ,
                        address2: $(this).find('.address2').html(),
                        city: $(this).find('.cityStateZip').find('span[itemprop="addressLocality"]').html(),
                        state: $(this).find('.cityStateZip').find('span[itemprop="addressRegion"]').html(),
                        zip: $(this).find('.cityStateZip').find('span[itemprop="postalCode"]').html(),
                        phoneno: $(this).find('.atcui-block').html(),
                        facebookurl: '',
                    }],
                    function (err2, result2) {
                        if (err2) {
                            //console.log('error'+err);

                        } else {
                            //response.send(JSON.stringify({'id':result2.ops[0]._id}));
                            //console.log(result2.ops[0]._id);
                            //console.log('https://www.autotrader.com'+result2.ops[0].url,result2.ops[0]._id);
                            getdetails('https://www.autotrader.com'+result2.ops[0].url,result2.ops[0]._id);

                            setTimeout(function () {

                                $('.pagination-button').each(function () {

                                    if($(this).hasClass('active')){
                                        console.log('pageination text');
                                        //$(this).next().click();
                                        console.log($(this).text());
                                    }
                                })
                            },5000);
                        }
                    });
            });
            // },12000);

            /*setTimeout(function () {

             },500);*/
        }
        else {
            console.log("inside geturllist");
            console.log('in error  :'+error2);
        }
    });
}

function getdetails(url,id){

    request(url, function(error2, response, html2){

        if(!error2) {
            var $ = cheerio.load(html2);
            var dealerinfo;
            var dealerfb;
            //dealerinfo=$('.atcui-list').find('a').attr('href')(function () {
            var collection = db.collection('dealers');
            var data = {
                websiteurl: $('a[target="_siteLink"]').attr('href'),
                facebookurl: $('a[target="_facebook"]').attr('href'),
            }
            console.log($('#j_id_2q').html());
            $('.atcui-title').each(function(){

                if($(this).text()=='Facebook Feed'){

                    console.log('got fb url');
                    console.log($(this).next().attr('href'));
                }

            });
            //console.log("hi");
            console.log(data);
            collection.update({_id: id}, {$set: data}, true, true);

            // });
            dealerfb=$('.lfloat').each(function () {
                var collection = db.collection('dealers');
                var data1 = {
                    fburl: $(this).find('a').attr('href'),
                }
                console.log("hi");
                console.log(data1);
                collection.update({_id: id}, {$set: data1}, true, true);

            });

        }
        else {
            console.log("inside getdetailserror");
            console.log('in error  :'+error2);
        }
    });



}

/*------------------------------------------------------END---------------------------------------------------------------------------------------------*/


app.get('/ipaddress', function (req, resp) {
    var collection = db.collection('dealerss');
    //collection.drop(function(err, items) {
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});


/*
 app.get('/addpeople',function(req,resp){
 var collection = db.collection('information');
 collection.insert([{
 firstname: "Ipsita",
 lastname: "Ghosal",
 email: "ips@gmail.com",
 }], function (err, result) {
 if (err) {
 resp.send(JSON.stringify({'status':'error'}));
 } else {
 resp.send(JSON.stringify(result));
 }
 });
 });
 */

app.get('/dealerslist', function (req, resp) {
    var collection = db.collection('dealers');
    collection.find().toArray(function(err, items) {
        resp.send(JSON.stringify(items));
    });
});


app.get('/getusastates',function (req,resp) {


    var usastates=[
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
            "name": "Alaska",
            "abbreviation": "AK"
        },
        {
            "name": "American Samoa",
            "abbreviation": "AS"
        },
        {
            "name": "Arizona",
            "abbreviation": "AZ"
        },
        {
            "name": "Arkansas",
            "abbreviation": "AR"
        },
        {
            "name": "California",
            "abbreviation": "CA"
        },
        {
            "name": "Colorado",
            "abbreviation": "CO"
        },
        {
            "name": "Connecticut",
            "abbreviation": "CT"
        },
        {
            "name": "Delaware",
            "abbreviation": "DE"
        },
        {
            "name": "District Of Columbia",
            "abbreviation": "DC"
        },
        {
            "name": "Federated States Of Micronesia",
            "abbreviation": "FM"
        },
        {
            "name": "Florida",
            "abbreviation": "FL"
        },
        {
            "name": "Georgia",
            "abbreviation": "GA"
        },
        {
            "name": "Guam",
            "abbreviation": "GU"
        },
        {
            "name": "Hawaii",
            "abbreviation": "HI"
        },
        {
            "name": "Idaho",
            "abbreviation": "ID"
        },
        {
            "name": "Illinois",
            "abbreviation": "IL"
        },
        {
            "name": "Indiana",
            "abbreviation": "IN"
        },
        {
            "name": "Iowa",
            "abbreviation": "IA"
        },
        {
            "name": "Kansas",
            "abbreviation": "KS"
        },
        {
            "name": "Kentucky",
            "abbreviation": "KY"
        },
        {
            "name": "Louisiana",
            "abbreviation": "LA"
        },
        {
            "name": "Maine",
            "abbreviation": "ME"
        },
        {
            "name": "Marshall Islands",
            "abbreviation": "MH"
        },
        {
            "name": "Maryland",
            "abbreviation": "MD"
        },
        {
            "name": "Massachusetts",
            "abbreviation": "MA"
        },
        {
            "name": "Michigan",
            "abbreviation": "MI"
        },
        {
            "name": "Minnesota",
            "abbreviation": "MN"
        },
        {
            "name": "Mississippi",
            "abbreviation": "MS"
        },
        {
            "name": "Missouri",
            "abbreviation": "MO"
        },
        {
            "name": "Montana",
            "abbreviation": "MT"
        },
        {
            "name": "Nebraska",
            "abbreviation": "NE"
        },
        {
            "name": "Nevada",
            "abbreviation": "NV"
        },
        {
            "name": "New Hampshire",
            "abbreviation": "NH"
        },
        {
            "name": "New Jersey",
            "abbreviation": "NJ"
        },
        {
            "name": "New Mexico",
            "abbreviation": "NM"
        },
        {
            "name": "New York",
            "abbreviation": "NY"
        },
        {
            "name": "North Carolina",
            "abbreviation": "NC"
        },
        {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        {
            "name": "Northern Mariana Islands",
            "abbreviation": "MP"
        },
        {
            "name": "Ohio",
            "abbreviation": "OH"
        },
        {
            "name": "Oklahoma",
            "abbreviation": "OK"
        },
        {
            "name": "Oregon",
            "abbreviation": "OR"
        },
        {
            "name": "Palau",
            "abbreviation": "PW"
        },
        {
            "name": "Pennsylvania",
            "abbreviation": "PA"
        },
        {
            "name": "Puerto Rico",
            "abbreviation": "PR"
        },
        {
            "name": "Rhode Island",
            "abbreviation": "RI"
        },
        {
            "name": "South Carolina",
            "abbreviation": "SC"
        },
        {
            "name": "South Dakota",
            "abbreviation": "SD"
        },
        {
            "name": "Tennessee",
            "abbreviation": "TN"
        },
        {
            "name": "Texas",
            "abbreviation": "TX"
        },
        {
            "name": "Utah",
            "abbreviation": "UT"
        },
        {
            "name": "Vermont",
            "abbreviation": "VT"
        },
        {
            "name": "Virgin Islands",
            "abbreviation": "VI"
        },
        {
            "name": "Virginia",
            "abbreviation": "VA"
        },
        {
            "name": "Washington",
            "abbreviation": "WA"
        },
        {
            "name": "West Virginia",
            "abbreviation": "WV"
        },
        {
            "name": "Wisconsin",
            "abbreviation": "WI"
        },
        {
            "name": "Wyoming",
            "abbreviation": "WY"
        }
    ];

    resp.send(usastates);

});



var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port
})

/*
 server.listen(80, 'current_local_ip');*/

/*-------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------------------------------------------*/
app.get('/gettotallist',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    collection.find({emailid:req.body.emailid , createaudienceid:req.body.createaudienceid}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify(items));
        }
    });
});

app.get('/checkcreateaudienceid',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    collection.find({createaudienceid:req.body.randomvar}).toArray(function(err, items) {
        if (items.length<1) {
            resp.send(JSON.stringify({'status':'success'}));
        } else {
            resp.send(JSON.stringify({'status':'duplicate'}));
        }
    });
});


app.get('/pacing' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    // var c_id = new mongodb.ObjectID(req.body.createaudienceid);
    var data = {
        pacing: req.body.pacing,
    }
    collection.update({createaudienceid:req.body.createaudienceid, emailid:req.body.emailid}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});


app.get('/browser' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    /*    collection.find({createaudienceid:req.body.createaudienceid}).toArray(function(err, items) {
     if (items.length<1) {
     collection.insert([{
     createaudienceid:req.body.createaudienceid,
     emailid:req.body.emailid,
     browser_ids: req.body.browser_ids
     }],
     function(err, result) {
     if (err){
     }
     else{
     }
     });
     } else {*/
    var data = {
        browser_ids: req.body.browser_ids
    }
    collection.update({createaudienceid:req.body.createaudienceid, emailid:req.body.emailid}, {$set: data}, true, true);
    //  }
    resp.send(JSON.stringify({'status':'success'}));
    //  });
});

app.get('/updateos' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    /*  collection.find({createaudienceid:req.body.createaudienceid}).toArray(function(err, items) {
     if (items.length<1) {
     collection.insert([{
     createaudienceid:req.body.createaudienceid,
     emailid:req.body.emailid,
     operating_system: req.body.operating_system
     }],
     function(err, result) {
     if (err){
     }
     else{
     }
     });
     } else {*/
    var data = {
        operating_system: req.body.operating_system
    }
    collection.update({
        createaudienceid: req.body.createaudienceid, emailid: req.body.emailid}, {$set: data}, true, true);
    //  }
    resp.send(JSON.stringify({'status':'success'}));
    // });
});

app.get('/devices' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    var data = {
        selected_devices: req.body.selected_devices,
    }
    collection.update({createaudienceid:req.body.createaudienceid, emailid:req.body.emailid}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});

app.get('/viewability' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    var dt = new Date();
    var date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    console.log(date);
    collection.find({createaudienceid:req.body.createaudienceid}).toArray(function(err, items) {
        if (items.length<1) {
            collection.insert([{
                    createaudienceid:req.body.createaudienceid,
                    emailid:req.body.emailid,
                    audiencename:req.body.audiencename,
                    dateofcreation:date,
                    integral_viewability_threshold: req.body.integral_viewability_threshold,
                }],
                function(err, result) {
                    if (err){
                    }
                    else{
                    }
                });
        } else {
            var data = {
                audiencename:req.body.audiencename,
                dateofcreation:date,
                integral_viewability_threshold: req.body.integral_viewability_threshold,
            }
            collection.update({createaudienceid:req.body.createaudienceid, emailid:req.body.emailid}, {$set: data}, true, true);
        }
        resp.send(JSON.stringify({'status':'success'}));
    });
});





app.get('/updatedeal' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    var data = {
        deals: req.body.deals,
    }
    collection.update({createaudienceid:req.body.createaudienceid, emailid:req.body.emailid}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});



app.get('/dayparts' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('campaigninfo');
    var data = {
        dayparting: req.body.dayparting,
    }
    collection.update({createaudienceid:req.body.createaudienceid, emailid:req.body.emailid}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});

app.get('/getaudiencelist',function (req,resp) {
    var collection = db.collection('campaigninfo');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify(items));
        }

    });

});


app.get('/tokensave',function (req,resp) {
    var link = 'http://geofencedsp.com/assets/php/dataapi.php';
    //   var link = 'http://simplyfi.influxiq.com/dataapi.php';
    request(link, function(error2, response, html2){
        if(!error2) {
            // console.log(JSON.parse(html2));
            var a= JSON.parse(html2);
            a = a.Response.responseDetails.TokenID;
            // console.log(a);
            var collection = db.collection('data_api');
            collection.insert([{
                    accesstoken :a
                }],
                function (err, result) {
                    if (err) {
                        console.log('err');
                        resp.send(JSON.stringify({'status':'error'}));
                    }
                    else {
                        console.log('success');
                        resp.send(JSON.stringify({'status':'success'}));
                    }
                });
        }
        else {
            console.log("error in php");
            resp.send('error');
        }
    });

});

app.get('/gettoken',function (req,resp) {
    var collection = db.collection('data_api');
    collection.find().toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});

app.get('/getus_cities', function (req, resp) {
    var collection = db.collection('us_cities');
    collection.find().toArray(function(err, items) {
        resp.send(JSON.stringify(items));
    });
});
app.get('/getus_cities1', function (req, resp) {
    var collection = db.collection('us_cities_modified');
    collection.find().toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify(items));
        }
    });
    //resp.send('hi');
});

/*----------------------------------- april add _upto 20th april--------------------------------------*/

app.get('/adbanneradd',function(req,resp){
    req.body=req.query;
    var collection = db.collection('adbanner');
    if(req.body.status == true){
        req.body.status =1;
    }
    else{
        req.body.status = 0;
    }
    collection.insert([{
        adbannername: req.body.adbannername,
        imgheight: req.body.imgheight,
        imgwidth: req.body.imgwidth,
        priority: req.body.priority,
        status: req.body.status,
        image: req.body.image,
        addedby: req.body.addedby,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});


app.get('/adbannerlist',function (req,resp) {
    var collection = db.collection('adbanner');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});


app.get('/deleteadbanner', function (req, resp) {
    req.body=req.query;
    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('adbanner');
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});

app.get('/adbannerdetails',function(req,resp){
    req.body=req.query;
    var collection = db.collection('adbanner');
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.find({_id:o_id}).toArray(function(err, items) {
        console.log(items);
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resp.send(JSON.stringify({'status':'success','item':items[0]}));
        }
    });
});


app.get('/editadbanner',function(req,resp){
    req.body=req.query;
    if(req.body.status == true){
        req.body.status =1;
    }
    else{
        req.body.status = 0;
    }
    var collection = db.collection('adbanner');
    var data = {
        adbannername: req.body.adbannername,
        imgheight: req.body.imgheight,
        imgwidth: req.body.imgwidth,
        priority: req.body.priority,
        status: req.body.status,
        image: req.body.image,
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});


app.get('/campaignadd',function(req,resp){
    req.body=req.query;
    var collection = db.collection('campaignadd');
    collection.insert([{
        campaignname: req.body.campaignname,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        campaignbudget: req.body.campaignbudget,
        monthlybudget: req.body.monthlybudget,
        biddingamountnbudget: req.body.biddingamountnbudget,
        dailyspendtarget: req.body.dailyspendtarget,
        bidding_type: req.body.bidding_type,
        added_by: req.body.added_by,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});



app.get('/campaignlist',function (req,resp) {
    var collection = db.collection('campaignadd');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});




app.get('/campaigndetails',function(req,resp){
    req.body=req.query;
    var resitem = {};
    var collection = db.collection('campaignadd');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(items);
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.get('/campaignedit',function(req,resp){
    req.body=req.query;
    var collection = db.collection('campaignadd');
    var data = {
        id: req.body.id,
        campaignname: req.body.campaignname,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        campaignbudget: req.body.campaignbudget,
        monthlybudget: req.body.monthlybudget,
        biddingamountnbudget: req.body.biddingamountnbudget,
        dailyspendtarget: req.body.dailyspendtarget,
        bidding_type: req.body.bidding_type,
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});


app.get('/deletecampaign', function (req, resp) {
    req.body=req.query;
    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('campaignadd')
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});

app.get('/getaudiencevalue',function(req,resp){
    req.body=req.query;
    console.log('getaudiencevalue-----');
    var collection = db.collection('campaignadd');
    var campaignid = new mongodb.ObjectID(req.body.campaignid);
    collection.find({_id:campaignid}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});


app.get('/addaudiencevalue',function(req,resp){
    req.body=req.query;
    console.log('server--------');
    var collection = db.collection('campaignadd');
    var audienceid = new mongodb.ObjectID(req.body.audienceid);
    var campaignid = new mongodb.ObjectID(req.body.campaignid);
    var data = {
        audienceid: audienceid
    }
    collection.update({_id:campaignid}, {$set: data}, true, true);
});

function randomnumbergenerator(){
    return randomString({
        length: 10,
        numeric: true,
        letters: false,
        special: false,
    });
}

app.get('/addmoney',function(req,resp){
    req.body=req.query;
    datetimestamp = Date.now();
    var randomno = randomnumbergenerator();
    var collection = db.collection('addmoney');
    var data={
        name: req.body.name,
        amount: req.body.amount,
        type: req.body.type,
        added_by: req.body.added_by,
        transaction_id: randomno,
        date: datetimestamp,
    }
    collection.find({transaction_id:randomno}).toArray(function(err, items) {
        if(items.length>0){
            var randomno1 = randomnumbergenerator();
            var data1={
                name: req.body.name,
                amount: req.body.amount,
                type: req.body.type,
                added_by: req.body.added_by,
                transaction_id: randomno1,
                date: datetimestamp,
            }
            console.log('new randomno generated,data is ');
            var returnval = addmoneytodb(randomno1,data1);
        }
        else{
            var returnval = addmoneytodb(randomno,data);
        }
        setTimeout(function () {
            console.log('returnval'+ returnval);
            if(returnval == 0){
                resp.send(JSON.stringify({'status':'error','id':0}));
            }
            else{
                resp.send (JSON.stringify({'status':'success','id':returnval}));
            }
        },1000);
    });
});

function addmoneytodb(randomno,data) {
    var collection = db.collection('addmoney');
    collection.insert([{
        name: data.name,
        amount: data.amount,
        type: data.type,
        added_by: data.added_by,
        transaction_id: randomno,
        date: data.date,
    }], function (err, result) {
        if (err) {
            // console.log('error'+err);
            return(0);
            // resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            //   console.log(result);
            return (result.ops[0]._id);
            //  resp.send (JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
}


app.get('/walletlistofthisuserid',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('addmoney');
    collection.find({added_by:req.body.email}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});

app.get('/walletlist',function (req,resp) {
    var collection = db.collection('addmoney');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});

app.get('/userdetails', function (req,resp) {
    req.body=req.query;
    var collection= db.collection('signupnew');
    collection.find({email:req.body.email}).toArray(function(err, items) {
        resp.send(JSON.stringify({'res':items}));
    });
});


app.get('/walletlistjoiningsignup',function (req,resp) {
    var collection = db.collection('addmoney').aggregate([
        {
            $lookup: {
                from: "signupnew",
                localField: "added_by", // localfield of patients
                foreignField: "email", // localfield of usertags
                as: "Signupdata"
            },
        }
    ]);

    /*    var collection = db.collection('addmoney').aggregate(
     [
     {
     $group:
     {
     _id: { addded_by: { $addded_by: "$addded_by"} },
     totalAmount: { $sum: ["$amount"]}
     }
     }
     ]
     )*/



    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'res':items}));
    });

});

function updateval(doc){

    var collection= db.collection('addmoney');
    var amountInt = parseInt(doc.amount);
    collection.update({_id: doc._id}, {$set: {amount: amountInt}});
}

app.get('/walletlistjoiningsignup1',function (req,resp) {

    var collection= db.collection('addmoney');

    collection.find({amount: {$type:"string"}}).forEach(function(doc) {
        var amountInt = parseFloat(doc.amount);
        updateval(doc);
        //collection.update({_id: doc._id}, {$set: {amount: amountInt}});
    });


    var collection = db.collection('addmoney').aggregate(
        [
            //{
            /*$group: {
             _id: { email: { $email: "$email"}},
             TotalAmount: { $sum: "$amount"},
             //count: { $sum: 1 }
             }*/
            {"$group" : {_id:"$added_by", count:{$sum:1} ,Total: { $sum: '$amount'}}},
            {
                $lookup: {
                    from: "signupnew",
                    localField: "_id", // localfield of patients
                    foreignField: "email", // localfield of usertags
                    as: "Signupdata"
                },
            }
            //}
        ]

    )



    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'res':items}));
    });

});



app.get('/getalltransactionsofthisemail',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('addmoney');
    collection.find({added_by:req.body.added_by}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});


app.get('/addcampaign',function(req,resp){
    req.body=req.query;
    var collection = db.collection('addcampaign');
    var stdate = parseInt((new Date(req.body.startdate).getTime() / 1000).toFixed(0));
    var enddate = parseInt((new Date(req.body.enddate).getTime() / 1000).toFixed(0));
    collection.insert([{
        campaignname: req.body.campaignname,
        status: req.body.status,
        totalcampaignspend: req.body.totalcampaignspend,
        cpa: req.body.cpa,
        epc: req.body.epc,
        dailybudget: req.body.dailybudget,
        startingbid: req.body.startingbid,
        conversionvalue: req.body.conversionvalue,
        /*  startdate: req.body.startdate,
         enddate: req.body.enddate,*/
        startdate: stdate,
        enddate: enddate,
        fcap: req.body.fcap,
        added_by: req.body.added_by
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});



app.get('/campaignlists',function (req,resp) {
    var collection = db.collection('addcampaign');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});


app.get('/changecampaignstatus',function(req,resp){
    req.body=req.query;
    var collection = db.collection('addcampaign');
    var data = {
        status: req.body.statusid,
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});


app.get('/campaigndetailsnew',function(req,resp){
    req.body=req.query;
    var resitem = {};
    var collection = db.collection('addcampaign');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.get('/editcampaign',function(req,resp){
    req.body=req.query;
    var collection = db.collection('addcampaign');
    var data = {
        campaignname: req.body.campaignname,
        //  status: req.body.status,
        totalcampaignspend: req.body.totalcampaignspend,
        cpa: req.body.cpa,
        epc: req.body.epc,
        dailybudget: req.body.dailybudget,
        startingbid: req.body.startingbid,
        conversionvalue: req.body.conversionvalue,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        fcap: req.body.fcap
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});

app.get('/changeallcampaignstatus',function(req,resp){
    req.body=req.query;
    var collection = db.collection('addcampaign');
    var data = {
        status: req.body.statusid
    }
    var arr = Object.keys(req.body.arrid).map(function (key) { return req.body.arrid[key]; });
    var i = 0;
    for(i in arr){
        var o_id = new mongodb.ObjectID(arr[i]);
        collection.update({_id:o_id}, {$set: data}, true, true);
    }
    resp.send(JSON.stringify({'status':'success'}));
});

app.get('/signupnew' , function (req,resp) {
    req.body=req.query;
    var collection = db.collection('signupnew');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    collection.find({email:req.body.email}).toArray(function(err, items) {
        if(items.length>0){
            resp.send(JSON.stringify({'status':'error','id':'Email id already Exists!'}));
        }
        else {
            collection.insert([{
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: hash,
                    companyname: req.body.companyname,
                    email: req.body.email,
                    country: req.body.country,
                    companywebsite: req.body.companywebsite,
                    city: req.body.city,
                    app: req.body.app,
                    message: req.body.message,
                    marketingbudget: req.body.marketingbudget,
                    request: req.body.request,
                    messageno: req.body.messageno,
                    type: 0
                }],
                function (err, result) {
                    if (err) {
                        console.log('err');
                        resp.send(JSON.stringify({'id': 0, 'status': 'Some error occured..!'}));
                    }
                    else {
                        console.log(result);
                        resp.send(JSON.stringify({'id': result.ops[0]._id, 'status': 'success'}));
                    }
                });
        }
    });
});

app.get('/userdetailsnew',function(req,resp){
    req.body=req.query;
    var resitem = {};
    var collection = db.collection('signupnew');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});


app.get('/usserinfoedit',function(req,resp){
    req.body=req.query;
    var collection = db.collection('signupnew');
    console.log(req.body.password);
    if(req.body.password == null){
        console.log('no pass');
        var data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            companyname: req.body.companyname,
            country: req.body.country,
            companywebsite: req.body.companywebsite,
            city: req.body.city,
            marketingbudget: req.body.marketingbudget
        }
    }
    else{
        console.log('pass given');
        var crypto = require('crypto');
        var secret = req.body.password;
        var hash = crypto.createHmac('sha256', secret)
            .update('password')
            .digest('hex');
        var data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            companyname: req.body.companyname,
            country: req.body.country,
            companywebsite: req.body.companywebsite,
            city: req.body.city,
            marketingbudget: req.body.marketingbudget,
            password: hash
        }
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});

app.get('/login', function (req, resp) {
    req.body=req.query;
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');

    var collection = db.collection('signupnew');
    collection.find({ email:req.body.email }).toArray(function(err, items){
        console.log('items'); //admin_login details shown here
        console.log(items); //admin_login details shown here
        //  console.log(items[0].password);
        // console.log(hash);
        if(items.length==0){
            console.log('1');
            resp.send(JSON.stringify({'status':'error','msg':'Username invalid...'}));
            return;
        }
        if(items.length>0 && items[0].password!=hash){
            console.log('2');
            resp.send(JSON.stringify({'status':'error','msg':'Password Doesnot match'}));
            return;
        }
        /* if(items.length>0 && items[0].status!=1){
         resp.send(JSON.stringify({'status':'error','msg':'You are Blocked..'}));
         return;
         }*/
        if(items.length>0 && items[0].password==hash){
            console.log('3');
            // resp.send(JSON.stringify({'status':'success','msg':items[0].email}));
            resp.send(JSON.stringify({'status':'success','msg':items[0]}));
            return;
        }
    });
});

app.get('/getcampaignlistunderthisid',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('addcampaign');
    collection.find({added_by:req.body.email}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});


app.get('/addhelpdisk',function(req,resp){
    req.body=req.query;
    var collection = db.collection('signupnew');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        type:2,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            var smtpTransport = mailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: "itplcc40@gmail.com",
                    pass: "DevelP7@"
                }
            });
            var mail = {
                from: "Admin <geoai@yopmail.com>",
                //  to: req.body.email,
                to: req.body.email,
                subject: 'Congratulations! You have been added as a helpdesk to GEOAI.',
                html: 'Username: '+req.body.email +'<br/>Password: '+req.body.password+'<br/>Site: <a href=http://www.geoai.influxiq.com/#/>http://www.geoai.influxiq.com/#/</a>'
            }
            smtpTransport.sendMail(mail, function (error, response) {
                console.log('send');
                smtpTransport.close();
            });
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

app.get('/helpdesklist',function (req,resp) {
    var collection = db.collection('signupnew');
    collection.find({type:2}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});
