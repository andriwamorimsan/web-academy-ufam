import express from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import router from '../router/router.js';
import validateEnv from '../utils/validateEnv.js';

const env = validateEnv();
const app = express();
const PORT = env.PORT;

app.use(morgan('short'));

const publicPath = `${process.cwd()}/public`;
app.use('/css', express.static(`${publicPath}/css`));
app.use('/js', express.static(`${publicPath}/js`));
app.use('/img', express.static(`${publicPath}/img`));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${process.cwd()}/views`);

app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
