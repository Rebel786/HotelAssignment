import express from 'express';
import { suppliersRouter } from './suppliers';
import { Connection, Client } from '@temporalio/client';
import cors from 'cors'; // Add this import

const app = express();
app.use(cors()); // Add this line to enable CORS for all routes
app.use(express.json());
app.use(suppliersRouter);

app.post('/api/search-hotels', async (req, res) => {
  try {
    const connection = await Connection.connect();
    const client = new Client({ connection });
    const handle = await client.workflow.start('searchHotelsWorkflow', {
      args: [req.body],
      taskQueue: 'hotel-search',
      workflowId: 'hotel-search-' + Date.now()
    });
    const result = await handle.result();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Workflow failed' });
  }
});

app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});
