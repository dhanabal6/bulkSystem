const express = require("express");
const router = express.Router();
const passport = require("passport");
const async = require("async");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const multer = require("multer");

require("../config.js");

const User = require("../model/User");

const Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./public/upload/documents");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage: Storage }).array("file", 3);

// const whatsAppStorage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, "./public/upload/whatsappdoc");
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     }
// });

// const uploadWhatsapp = multer({ storage: whatsAppStorage }).array('file', 3);

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
    password: req.body.password,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
    sms: req.body.sms,
    whatsapp: req.body.whatsapp
  });
  user.save(error => {
    req.logIn(user, error => {
      const emailId = user.emailId;
      const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "dhanabal.kurinjie@gmail.com",
          pass: "dhana11503198"
        }
      });
      const mailOptions = {
        to: emailId,
        from: "dhanabal.kurinjie@gmail.com",
        subject: "Register SuccessFully",
        text:
          "Hello " +
          "Thanks for your registeration" +
          ",\n\n" +
          "userName:" +
          req.body.emailId +
          ",\n\n" +
          "password:" +
          req.body.password +
          ",\n\n" +
          "Regards\n" +
          "company name" +
          "\n"
      };
      smtpTransport.sendMail(mailOptions, err => {
        if (err) {
          res.send(err);
        } else {
          res.send({message:"Register Success! Your Register Mail has been Send."});
        }
      });
      res.send(user);
    });
  });
});

router.post("/api/login", (req, res, next) => {
  console.log("logging in...");
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.send({ error: "Incorrect UserName and Password" });
    }
    req.logIn(user, err => {
      if (err) return next(err);
      return res.send(user);
    });
  })(req, res, next);
});

router.get("/api/forgotPassword", (req, res) => {
  res.send({
    user: req.user
  });
});

router.post("/api/forgotPassword", (req, res, next) => {
  console.log("Forgot Password Change...");
  async.waterfall(
    [
      done => {
        crypto.randomBytes(20, (err, buf) => {
          const token = buf.toString("hex");
          done(err, token);
        });
      },
      (token, done) => {
        User.findOne({ emailId: req.body.emailId }, (err, user) => {
          if (!user) {
            return res.send({error:"No account with that email address exists."});
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000;

          user.save(error => {
            done(error, token, user);
          });
        });
      },
      (token, user, done) => {
        const smtpTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "dhanabal.kurinjie@gmail.com",
            pass: "dhana11503198"
          }
        });
        const mailOptions = {
          to: user.emailId,
          from: "dhanabal.kurinjie@gmail.com",
          subject: "Password Reset SuccessFully",
          text:
            "Hi " +
            user.name +
            ",\n" +
            "You are receiving this because you (or someone else) have requested the reset of the password for your Bulk System account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://localhost:3000/resetPassword/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n" +
            "Thanks, " +
            "\n" +
            "Bulk Systems"
        };
        smtpTransport.sendMail(mailOptions, err => {
          res.send({message: "Send Link in Your Mail Address Please Check Your Mail"});
          done(err);
        });
      }
    ],
    err => {
      if (err) return next(err);
    }
  );
});

router.get("/api/resetPassword/:token", (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    },
    (err, user) => {
      if (!user) {
        console.log("Password reset token is invalid or has expired.");
        return res.send({error:"user already exists"});
      }
      res.send({
        user: req.user
      });
    }
  );
});

router.post("/api/resetPassword/:token", (req, res) => {
  console.log("password Token Change...");
  async.waterfall(
    [
      done => {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
          },
          (err, user) => {
            if (!user) {
              return res.send(
                {error:"Password reset token is invalid or has expired."}
              );
            }
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(e => {
              req.logIn(user, error => {
                done(error, user);
              });
            });
          }
        );
      },
      (user, done) => {
        const smtpTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "dhanabal.kurinjie@gmail.com",
            pass: "dhana11503198"
          }
        });
        const mailOptions = {
          to: user.emailId,
          from: "dhanabal.kurinjie@gmail.com",
          subject: "Your password has been changed",
          text:
            "Hello " +
            user.name +
            ",\n\n" +
            "This is a confirmation that the password for your Bulk Systems account " +
            user.emailId +
            " has just been changed.\n"
        };
        smtpTransport.sendMail(mailOptions, err => {
          done(err);
          res.send({message:"Success! Your password has been changed."});
        });
      }
    ],
    (err, next) => {
      if (err) return next(err);
    }
  );
});

router.get("/api/logout", (req, res) => {
  req.logout();
  req.session.destroy(err => {
    if (!err) {
      res.send({ message: "Logout SuccessFully" });
      // res
      //   .status(200)
      //   .clearCookie("connect.sid", { path: "/" })
      //   .json("Logout Success");
    } else {
      res.send(err);
    }
  });
});

router.post("/api/edit/:userId", (req, res) => {
  const users = User(req.body);
  const err = users.joiValidate(req.body);
  if (err) throw err;
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { upsert: true, new: true, runValidators: true },
    (err, data) => {
      if (err) {
        res.send({error:err});
      } else {
        res.send({ message: "Your Profile Updated SuccessFully" });
      }
    }
  );
});

router.post("/api/sendemail", (req, res) => {
  upload(req, res, err => {
    if (err) throw err;
    console.log(req.body);
    let fileName;
    let filePath;
    let fileType;
    req.files.forEach(val => {
      fileName = val.filename;
      filePath = val.path;
      fileType = val.mimetype;
    });
    const mailId = req.body.mailId;
    const password = req.body.password;
    const emailId = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const attachments = [
      { filename: fileName, path: filePath, contentType: fileType }
    ];
    // let EmailIds = emailId.split(',');
    // let threeMail = EmailIds.slice(0, 3);
    /*send only three mailIds*/
    // const mailIds = threeMail.toString();
    // console.log(mailId);
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: mailId,
        pass: password
      }
    });
    const mailOptions = {
      to: emailId,
      from: mailId,
      subject: subject,
      text: "Hello " + message + ",\n\n" + "Regards\n" + "company name" + "\n",
      attachments: attachments
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, err => {
      if (err) {
        res.send({failure:err});
      } else {
        res.send({success:"Success! Your Mail has been Send."});
      }
    });
  });
});

router.post("/api/sendwhatsapp", (req, res) => {
  console.log(req.body);
});

router.post("/api/sendsms", (req, res) => {
  console.log(req.body);
});

module.exports = router;
