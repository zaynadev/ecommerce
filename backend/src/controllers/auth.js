 const User = require('../models/user');
 const jwt = require('jsonwebtoken');
 
 exports.users = (req, res) => {
    res.send({msg: 'users module'})
}

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) return res.status(400).send(err);
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
    
}

exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user) 
            return res.status(400).send({error: "User not found!"});
        
        if(!user.authenticate(password))
            return res.status(401).send({error: "Invalid email or password!"});

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET);
        const {_id, name, email, role} = user;
        res.cookie('token', token, {
            expire: new Date() + 86400000
        });
        res.json({
            token,
            user: {_id, name, email, role}
        })
    })    
    
}

exports.signout = (req, res) => {
    res.clearCookie();
    res.json({message: 'User sign out'})
    
}
