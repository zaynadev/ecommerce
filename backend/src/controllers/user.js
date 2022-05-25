

exports.getOneUser = (req, res) => {
    delete(req.profile.hashed_password);
    delete(req.profile.salt);
    res.json({
        user: req.profile
    })
}

exports.editOneUser = (req, res) => {
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user) => {

        if(err) {
            return res.status(400).json({err})
        }
        
        delete(req.profile.hashed_password);
        delete(req.profile.salt);

        res.json({user})

    })
}