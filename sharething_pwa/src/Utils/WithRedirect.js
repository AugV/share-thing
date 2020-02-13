import React from 'react';
import { withRouter } from "react-router-dom";
import * as ROUTES from "../Constants/Routes";
import { withFirebase } from "../Firebase";
import AuthUserContext from './context';

const withRedirect = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.HOME);
                    }
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                  {authUser =>
                    condition(authUser) ? <Component {...this.props} authUser={authUser} /> : null
                  }
                </AuthUserContext.Consumer>
              );
        }
    }

    return withRouter(withFirebase(WithAuthorization));
};

export default withRedirect;