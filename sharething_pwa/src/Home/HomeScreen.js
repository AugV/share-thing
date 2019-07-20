import React from 'react';
import SignOutButton from '../Authentication/SignOut';
import { withAuthorization } from "../Session";

const condition = authUser => !!authUser;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log("PROPS: "+this.props.authUser);
    this.state = {user: null};
    this.state.user = this.props.authUser;
  }
  render() {
    
    // this.setState({user:this.props.authUser});
    console.log("STATE in render: "+this.state.user);
    return (
      <div className="container">
        <h1>Home Screen</h1>
        <h2>Welcome</h2>
        <SignOutButton />
        <div>{this.state.user.uid}</div>
      </div>
    )
  }
}

export default withAuthorization(condition)(HomeScreen);