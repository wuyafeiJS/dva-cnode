import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';
import 'github-markdown-css';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/profile"));//全局都有使用的model在此引用
app.model(require("./models/message"));
app.model(require("./models/login"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
