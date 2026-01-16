const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    badge: String,
    title: String,
    earned_date: { type: Date, default: Date.now }
});

const UserProgressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    total_points: { type: Number, default: 0 },
    current_streak: { type: Number, default: 0 },
    longest_streak: { type: Number, default: 0 },
    last_activity_date: String, 
    total_tasks_completed: { type: Number, default: 0 },
    total_goals_completed: { type: Number, default: 0 },
    achievements: [AchievementSchema]
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', UserProgressSchema);