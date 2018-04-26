const express = require("express");
const router = express.Router();
const passport = require("passport");
const async = require("async");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const multer = require('multer');

require('../config.js');

const User = require("../model/User");

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/upload");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: Storage }).array('file', 3);


const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.send({ _id: "guest" });
  } else {
    next();
    return;
  }
};

router.get("/api", isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

router.get("/api/register", (req, res) => {
  res.send({ reg: "data" });
});

router.post("/api/register", (req, res, next) => {
  console.log("register...");
  const users = User(req.body);
  const err = users.joiValidate(req.body);
  if (err) throw err;
  const user = new User({
    name: req.body.name,
    emailId: req.body.emailId,
    password: req.body.password
  });
  user.save(error => {
    req.logIn(user, error => {
      res.send(user);
    });
  });
});

router.post("/api/login", (req, res, next) => {
  console.log("logging in...");
  const users = User(req.body);
  console.log(users);
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.send("Not a User");
    }
    req.logIn(user, err => {
      if (err) return next(err);
      return res.send(user);
    });
  })(req, res, next);
});

router.get("/api/logout", (req, res) => {
  req.logout();
  req.session.destroy(err => {
    if (!err) {
      res
        .status(200)
        .clearCookie("connect.sid", { path: "/" })
        .json({ status: "Success" });
    } else {
      res.send(err);
    }
  });
});

router.post('/api/sendemail', (req,res) => {
 upload(req, res,  (err) => {
    if (err) throw err;
    let fileName;
    let filePath;
    let fileType;
    req.files.forEach(val => {
      fileName = val.filename;
      filePath = val.path;
      fileType = val.mimetype;
    })
  const emailId = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  const attachments = [{filename: fileName, path: filePath, contentType: fileType}];
  let EmailIds = emailId.split(',');
  let threeMail = EmailIds.slice(0, 3);   
  /*send only three mailIds*/
    const mailIds = threeMail.toString();
    console.log(mailIds);
    const smtpTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "dhanabal.kurinjie@gmail.com",
            pass: "dhana11503198"
          }
        });
    const mailOptions = {
          to: mailIds,
          from: "dhanabal.kurinjie@gmail.com",
          subject: subject,
          text:
            "Hello " +
            message +
            ",\n\n" +
            "Regards\n"+
            "company name"+"\n",
          attachments: attachments
        };
  console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, err => {
         if(err){
           res.send(err);
         } else{
          res.send("Success! Your Mail has been Send.");
         }
        });
 
  });

});

module.exports = router;
