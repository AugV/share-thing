import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import * as ROUTES from '../Constants/Routes';
import SignInScreen from '../Pages/Auth/SignIn';
import SignUpScreen from '../Pages/Auth/SignUp';
import { withFirebase } from '../Firebase';
import { FirebaseProps } from '../Entities/PropsInterfaces';
import { LandingScreen } from '../Pages/Landing';

const Landing: React.FC<FirebaseProps> = (props) => {
    const { firebase } = props;

    const redirectIfLoggedIn = () => {
        if (firebase.auth.currentUser) {
            return (
                <Redirect push={true} to={ROUTES.MY_ITEMS}/>
            );
        }
    };

    return(
        <div>
            {redirectIfLoggedIn()}
            <Switch>
                <Route path={ROUTES.SIGN_UP} component={SignUpScreen} />
                <Route path={ROUTES.SIGN_IN} component={SignInScreen} />
                <Route component={LandingScreen} />
            </Switch>
        </div>
    );
};

export const LandingRoutes = withFirebase(Landing);
