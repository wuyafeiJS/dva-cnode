import React from 'react';
import { Router } from 'dva/router';
import App from './routes/App';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/IndexPage'));//需要分析model是在全局使用，还是只在此路由内使用，如果全局使用则需要在index.js引用。如：models/login
          cb(null, { component: require('./routes/IndexPage') });
        }, 'IndexPage');
      },
      childRoutes: [
        {
          path: 'IndexPage',
          name: 'IndexPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/IndexPage'));
              cb(null, require('./routes/IndexPage'));
            });
          },
        },
        {
          path: '/topic/:id',
          name: 'Article',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/article'));
              cb(null, require('./routes/Article'));
            });
          },
        },
        {
          path: '/login',
          name: 'Login',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/login'));
              cb(null, require('./routes/Login'));
            });
          },
        },
        {
          path: '/profile/:loginname',
          name: 'Profile',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Profiles'));
            });
          },
        },
        {
          path: '/message',
          name: 'Message',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/login'));
              cb(null, require('./routes/Message'));
            });
          },
        },
      ],
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
