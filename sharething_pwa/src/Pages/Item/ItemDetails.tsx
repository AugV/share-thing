import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Item } from '../../Entities/Interfaces';

const INITIAL_STATE: State = {
    item: { id: '', name: '', description: '', ownerId: '' },
};

interface OwnProps {
    loadItem(itemId: string): Promise<Item>;
    createConvo(item: Item): void;
}

type Props = OwnProps & RouteComponentProps<any>;

interface State {
    item: Item;
}

class ItemDetailsComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    public componentDidMount(): void {
        if (this.props.match.params.id) {
            this.loadItemToState();
        }
    }

    public loadItemToState(): void {
        this.props.loadItem(this.props.match.params.id).then(item => {
            this.setState({ item });
        });
    }

    public onChange = (event: any) => {
        const name = event.target.name as string;

        this.setState({ item: { ...this.state.item, [name]: event.target.value } });
    };

    public render(): React.ReactNode {
        const { item } = this.state;

        return (item &&
            (
            <div style={{ maxWidth: 800, height: 'auto'}}>
                <Card>
                    <Card.Img
                        variant="top"
                        src={item.imageUrl}
                    />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                        <Button
                            onClick={() => {this.props.createConvo(item); }}
                            variant="primary"
                        >Request
                        </Button>
                    </Card.Body>
                </Card>
            </div>
            )
        );
    }

}

export const ItemDetails = withRouter(ItemDetailsComponent);
