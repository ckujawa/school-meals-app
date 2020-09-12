const mongoose = require('mongoose');
const AppData = mongoose.model('AppData');

exports.createAppData = (req, res) => {
    let reqData = req.body;
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
    console.log('entering getNewApps...')
    const apps = await AppData.find({ status: 'new' });
    console.log(`found ${apps.length} apps...`)
    const numOfApps = apps.length - 1;

    // if (!apps.length) {
    //     req.flash('info', `You asked for more applications than we currently have, so I'm sending you to the last one...`);
    //     res.redirect(`/admin/apps/page/${numOfApps}`);
    //     return;
    // }
    res.render('apps', {title: 'Applications for Processing', apps})
}