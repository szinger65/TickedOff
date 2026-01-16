const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});

app.use(limiter);

app.use(cors({
    origin: ["https://tickedoff.xyz", "https://www.tickedoff.xyz", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

require('./config/mongoose.config');

const authController = require('./controllers/auth.controller');

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
const auth = require('./middleware/auth');
app.put('/api/profile', auth, authController.updateProfile);

require('./routes/task.routes')(app);
require('./routes/goal.routes')(app);
require('./routes/progress.routes')(app);

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
}
  
module.exports = app;