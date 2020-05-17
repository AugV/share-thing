import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { withFirebaseProvider } from './Firebase';
import * as ROUTES from './Constants/Routes';
import { withAuthentication } from './Utils';
import { Private } from './Routes/Private';
import { LandingRoutes } from './Routes/Landing';
import './force-mobile.css';

const App: React.FC = () => {
    return(
      <div className="hello">
        <div className="force-mobile">
          <BrowserRouter>
            <Switch>
              <Route path={ROUTES.PRIVATE_PAGE} component={Private} />
              <Route path={ROUTES.LANDING} component={LandingRoutes} />
            </Switch>
          </BrowserRouter>
          </div>
        </div>
    );
};

export const Application = withFirebaseProvider(withAuthentication(App));
