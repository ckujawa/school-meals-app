const mongoose = require('mongoose');
const AppData = mongoose.model('AppData');

exports.createAppData = (req, res) => {
    let reqData = req.body;
    let appData = new AppData({
        field1: reqData,
        status: 'new',
        created: Date.now()
    });
    
    appData.save(err => {
        if (err) {
            console.log(err);
            return res.status(500).send("an error has occurred when saving your data. We are working to resolve it as quickly as possible.");
        }
        res.status(200).send(reqData);
    })
}

exports.getNewAppData = async (req, res) => {
    const newApps = await AppData.find({ status: 'new' }, (err, users) =>
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

exports.getNewApps = async (req, res) => {
    const limit = 1;

    const apps = await AppData
        .find({ status: 'new' })
        .limit(limit);

    if (apps.length === 0) {
        res.render('noApps', {title: "Processing Complete"})
    } else {
        res.render('apps', {title: 'Applications for Processing', apps})
    }   
}

exports.markProcessed = async (req, res) => {
    const appId = req.params.appId;

    if (!appId) {
        res.status(500).send("Something went wrong when trying to update the status of your application...");
    }

    await AppData.findByIdAndUpdate(appId, { status: 'processed', processedDate: Date.now() });

    res.redirect('/getNewApps')
}