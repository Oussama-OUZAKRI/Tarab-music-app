import express from 'express';
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/user', signupRoute);
app.use('/auth', loginRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});