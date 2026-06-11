import express from 'express';
import { engine } from 'express-handlebars';
import router from './router/router.js';
import * as handlebarsHelpers from './views/helpers/helpers.js';
import validateEnv from './utils/validateEnv.js';
import logger from './middlewares/logger.js';

const env = validateEnv();
const app = express();
const PORT = env.PORT;

app.use(logger(env.LOG_FORMAT, env.LOG_DIR));
app.use(express.urlencoded({ extended: false }));

const publicPath = `${process.cwd()}/public`;
app.use('/css', express.static(`${publicPath}/css`));
app.use('/js', express.static(`${publicPath}/js`));
app.use('/img', express.static(`${publicPath}/img`));

app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    helpers: handlebarsHelpers,
  }),
);
app.set('view engine', 'handlebars');
app.set('views', `${process.cwd()}/views`);

app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
