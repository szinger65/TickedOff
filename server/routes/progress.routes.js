const ProgressController = require('../controllers/progress.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
    app.get('/api/progress', auth, ProgressController.getProgress);       
    app.post('/api/progress', auth, ProgressController.createProgress);
    app.put('/api/progress/:id', auth, ProgressController.updateProgress);
};