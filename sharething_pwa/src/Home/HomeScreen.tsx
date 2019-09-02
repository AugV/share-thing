import React from 'react';
import SignOutButton from '../Authentication/SignOut';
import { withAuthorization } from "../Session";
import { Item } from '../Item/Item';


const condition = (authUser: object) => !!authUser;

interface HomeScreen {
  unsubscribe: () => void;
}

interface Props {
  firebase: object;
}

interface State {
  loading: boolean;
  items: Item[];
}


class HomeScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      items: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    let items: Item[];
    this.unsubscribe = this.props.firebase.getItems().onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());
        items.push(doc.data());
      });
      this.setState({
        loading: false,
        items: items,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    const { items, loading } = this.state;

    let items2: Item[];
    items2 = this.state.items;


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

export { HomeScreen };
export default withAuthorization(condition)(HomeScreen);