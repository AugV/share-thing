import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ItemModel } from '../../Entities/Interfaces';

const INITIAL_STATE: State = {
    item : {   id: '5656561',
               name: 'User 1 Item 1',
               owner: 'ESk2bOqGi9MLXG7SaavxV4gYvvU2',
               description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It wa',
               images: ['https://homepages.cae.wisc.edu/~ece533/images/cat.png' ],
               borrowed: false,
               borrowed_date: [],
               groups: ['group_1', 'group_2'],
    },
};

interface OwnProps {
    loadItem(itemId: string): Promise<ItemModel>;
    createConvo(item: ItemModel): void;
}

type Props = OwnProps & RouteComponentProps<any>;

interface State {
    item: ItemModel;
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
            <div style={{ maxWidth: 800, height: 'auto' }}>
                <Card>
                    <Card.Img
                        variant="top"
                        src={item.images[0]}
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
