const mongoose = require('mongoose');
const AppData = mongoose.model('AppData');

exports.createAppData = (req, res) => {
    let reqData = req.body;
    console.log(reqData);
    let appData = new AppData({
        field1: reqData,
        status: 'new'
    });
    
    appData.save(err => {
        if (err) {
            console.log(err);
            return res.status(500).send("an error has occurred when saving your data. We are working to resolve it as quickly as possible.");
        }
        res.status(200).send(reqData);
    })
}

exports.getNewAppData = (req, res) => {
    const newApps = AppData.find({ status: 'new' }, (err, users) =>
    {
        if (err) {
            res.status(500).send("An error has occurred in processing your request. We are working to resolve it as quickly as possible.")
        } else {
            let userMap = {}

            users.map((user) => userMap[user._id] = user)
            res.status(200).send(userMap)
        }
    })
}