import React from 'react';
import SignOutButton from '../Authentication/SignOut';
import { withAuthorization } from "../Session";


const condition = authUser => !!authUser;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      unsubscribe: null,
      items: [],
    };
  }


  componentDidMount() {
    this.setState({ loading: true });
    let items = []
     let listener = this.props.firebase.items().onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());
        items.push(doc.data());
      });
      this.setState({
        items: items,
        loading: false,
      });
      this.setState({unsubscribe: listener});
      console.log(this.state.items);
    });
  }

  componentWillUnmount() {
    this.state.unsubscribe();
  }

  render() {
    const {items, loading } = this.state;

    return (
      <div className="container">
        <h1>Home Screen</h1>
        <h2>Welcome</h2>
        <SignOutButton />
        {loading && <div>Loading ...</div>}
        <ul>
          {items.map(item => (
            <li key={item.name}>
              <div>{item.name}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default withAuthorization(condition)(HomeScreen);