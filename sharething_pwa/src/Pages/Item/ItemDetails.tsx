import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Item } from '../../Entities/Interfaces';

const INITIAL_STATE: State = {
    item: { id: '', name: '', description: '' },
};

interface OwnProps {
    loadItem(itemId: string): Promise<Item>;
}

type Props = OwnProps & RouteComponentProps<any>;

interface State {
    item: Item;
}

class ItemDetails extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.loadItem();
        }
    }

    loadItem() {
        this.props.loadItem(this.props.match.params.id).then(item => {
            this.setState({ item });
        });
    }

    public onChange = (event: any) => {
        const name = event.target.name as string;

        this.setState({ item: { ...this.state.item, [name]: event.target.value } });
    };

    public render(): React.ReactNode {
        return (this.state.item &&
        <Card>
          <Card.Img variant="top" src={this.state.item.imageUrl} />
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

export default withRouter(ItemDetails);