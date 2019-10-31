import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Item } from '../Entities/Iterfaces';

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

// return <ItemDetails />

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
          <Card.Img variant="top" src={require('../test-img.png')} />
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

// <comp1 children={(stringas)=>{<div>{stringas}</div>}}> // return this.props.children("strng")

//   {/* {(stringas)=>{<div>{stringas}</div>}} */}

// </comp1>

// <comp1 prop1="abc" children={<comp2 children={<comp3 children={<comp4 />}/>}/>}</div>}}> // return this.props.children("strng")

// <comp1 prop1="abc" func={(a, b, c)=> console.log(a + b + c)}>
//   {(a, b, c)=> console.log(a + b + c)}
//   {/* <div></div>
//   <div></div>
//   <div></div> */}
// </comp1>

// const comp1 = props => {
//   // props.prop1
//   // props.children
//   // props.children(1, 2, 3)
//   // return this.props.children(1, 2, 3)
//   // return "labas"
// }

//   // props.children();

//   // console.log(props.children)
//   // return 'abc';
// }

// this.props.children.props.children

// // <comp1>
// //   <comp2>
// //     <comp3>
// //       <comp4/>
// //     </comp3>
// //   </comp2>
// // </comp1>

// const Comp1 = props => {

//   console.log(props.children)
//   return 'abc';
// }

// return <Comp1 a={1}/>;

// return (props)=> {
//   console.log(props.children)
//   return 'abc';
// }()
