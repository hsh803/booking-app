const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
var path = require('path');

// Create connection to database
// Use double qoute to object names and values in booking.json file
const mysql = require('mysql');
const config = require('./config/booking_heroku.json');
const db = mysql.createPool(config);

// Express serves static assets


// Server policy (cross-original-server)-httpXMLrequest
app.use(cors());

// Get and use values in url from front-end
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Send confirmation email to customer.
const nodemailer = require("nodemailer");
const email = require('./config/email.json');
const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: email.sender,
        pass: email.pass
    }
});

app.get('/date', (req, res) => {
    let sql = `select * from date;`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result)
    })
});

app.post('/book/add', (req, res) => {
    console.log(req.body.name)
    let value = [req.body.id, req.body.name, req.body.email, req.body.date];
    let sql = `CALL add_booking(?, ?, ?, ?);`;
    db.query(sql, value, (err, result) => {
        if(err) throw err;
    });

    const send = {
        from: '"Booking" <hsh803@hotmail.com>',
        to: req.body.email,
        subject: 'Confirmation of the booking',
        text: 'Confirmation of your booking: ' + req.body.date
    };

    transporter.sendMail(send, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully.');
        }
    })
})

app.post('/date/delete', (req, res) => {
    console.log(req.body.id)
    let value = req.body.id;
    let sql = `CALL delete_date(?);`;
    db.query(sql, value, (err, result) => {
        if(err) throw err;
        console.log(result)
    })
})

app.post('/book/cancel', (req, res) => {
    console.log(req.body.email + req.body.date)
    let value = [req.body.email, req.body.date];
    let sql = `CALL delete_booking(?, ?);`;
    db.query(sql, value, (err, result) => {
        if(err) throw err;
        console.log(result)
    })
})

app.get('/book/show', (req, res) => {
    let sql = `select * from booking`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static("public"));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve('public' ,'index.html'))
//       })
//   }

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});