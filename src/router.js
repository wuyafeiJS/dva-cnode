import React from 'react';
import { Router } from 'dva/router';

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
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
