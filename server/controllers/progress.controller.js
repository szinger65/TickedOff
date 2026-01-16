const UserProgress = require('../models/progress.model');

module.exports.getProgress = async (req, res) => {
    try {
        const progress = await UserProgress.find({ user_id: req.userId });
        res.json(progress);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.createProgress = async (req, res) => {
    try {
        const newProgress = { ...req.body, user_id: req.userId };
        const result = await UserProgress.create(newProgress);
        res.json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.updateProgress = async (req, res) => {
    try {
        const updated = await UserProgress.findOneAndUpdate(
            { _id: req.params.id, user_id: req.userId },
            req.body,
            { new: true, runValidators: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json(err);
    }
};