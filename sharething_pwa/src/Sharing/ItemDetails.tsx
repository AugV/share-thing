import React from "react";
import { Button, Card } from "react-bootstrap";
import { Item } from "../Entities/Iterfaces";
import { withRouter } from "react-router-dom";

const INITIAL_STATE: State = {
  item: {id:"",name:"",description:""}
};

interface Props {
  match: { params: { id: string } };
  loadItem(itemId: string): Promise<Item>;
}

interface State {
  item: Item;
}

class ItemDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    if (this.props.match.params.id) this.loadItem();
  }

  loadItem() {
    this.props.loadItem(this.props.match.params.id).then(item => {
      this.setState({ item: item });
    });
  }

  onChange = (event: any) => {
    const name = event.target.name as string;
    this.setState({ item: { ...this.state.item, [name]: event.target.value } });
  };

  render() {
    return (this.state.item&&
        <Card>
        <Card.Img variant="top" src={require("../test-img.png")} />
        <Card.Body>
          <Card.Title>{this.state.item.name}</Card.Title>
          <Card.Text>
            {this.state.item.description}
          </Card.Text>
          <Button variant="primary">Request</Button>
        </Card.Body>
      </Card>
    );
  }
}
//TODO: Paklaust Domo dėl erroro
// @ts-ignore
export default withRouter(ItemDetails);
