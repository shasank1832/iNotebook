const express = require("express");
const router = express.Router();
const User = require('../models/User.js')
const { body, validationResult } = require('express-validator');

//create a user using :POST "/api/auth"..doesn't require auth
router.post('/createuser',
    body('email', 'enter a valid email with @').isEmail(),
    // password must be at least 5 chars long
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('password', 'enter a valid password..paswword must be minimum 5').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
        //check whether the user with this email exists or not
        let user=await User.findOne({email:req.body.email});
        if(user){
            res.status(400).json({error:"sorry user with this email already exists  !!!"});
        }
         user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
            // }).then(user => res.json(user)).catch(err => { console.log(err) })

            // res.json({ error: "please enter a unique value for email", "message": "error occured"})
        })

        res.json(user);

    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occured");
    }

    }
    )
//   

// console.log(req.body);
// const user = User(req.body);
// user.save();
// res.send(req.body);


module.exports = router;