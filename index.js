import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRouter from './router/authRouter.js';
import deviceRouter from './router/deviceRouter.js';
import brandRouter from './router/brandRouter.js';
import typeRouter from './router/typeRouter.js';

const app = express();

const PORT = config.get('port') || 8000;

mongoose.Promise = global.Promise;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'));

app.use('/auth', authRouter);
app.use('/api', deviceRouter);
app.use('/api', brandRouter);
app.use('/api', typeRouter);

async function startApp() {
  try {
    await mongoose.connect(config.get('db_url'), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`Сервер запущен на ${PORT}...`));
  } catch (e) {
    console.log(e);
  }
}
startApp();
