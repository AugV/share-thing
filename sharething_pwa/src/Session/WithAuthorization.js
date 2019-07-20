import React from 'react';
import { withRouter } from "react-router-dom";
import * as ROUTES from "../Constants/Routes";
import { withFirebase } from "../Firebase";
import AuthUserContext from './context';

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.LANDING);
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
                    condition(authUser) ? <Component {...this.props} /> : null
                  }
                </AuthUserContext.Consumer>
              );
        }
    }

    return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;