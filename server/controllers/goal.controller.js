const Goal = require('../models/goal.model');

module.exports.getAllGoals = (req, res) => {
    Goal.find({ user_id: req.userId }) 
        .sort({ createdAt: -1 })
        .then(goals => res.json(goals))
        .catch(err => res.status(400).json(err));
};

module.exports.createGoal = (req, res) => {
    const newGoal = {
        ...req.body,
        user_id: req.userId
    };

    Goal.create(newGoal)
        .then(goal => res.json(goal))
        .catch(err => res.status(400).json(err));
};

module.exports.updateGoal = (req, res) => {
    Goal.findOneAndUpdate(
        { _id: req.params.id, user_id: req.userId }, 
        req.body, 
        { new: true, runValidators: true }
    )
        .then(updatedGoal => res.json(updatedGoal))
        .catch(err => res.status(400).json(err));
};

module.exports.deleteGoal = (req, res) => {
    Goal.deleteOne({ _id: req.params.id, user_id: req.userId })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};