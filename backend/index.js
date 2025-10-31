import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import listsRouter from './routes/lists.js';
import tasksRouter from './routes/tasks.js';

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Routes
app.use('/api/lists', listsRouter);
app.use('/api', tasksRouter);

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        const port = Number(process.env.PORT || 3001);
        app.listen(port, () => {
            // eslint-disable-next-line no-console
            console.log(`API listening on http://localhost:${port}`);
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

start();

export default app;


