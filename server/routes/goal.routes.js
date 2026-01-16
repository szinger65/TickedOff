const GoalController = require('../controllers/goal.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
    app.get('/api/goals', auth, GoalController.getAllGoals);
    app.post('/api/goals', auth, GoalController.createGoal);
    app.put('/api/goals/:id', auth, GoalController.updateGoal);
    app.delete('/api/goals/:id', auth, GoalController.deleteGoal);
};