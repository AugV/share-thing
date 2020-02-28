import React from 'react';
import './headers.css';
import { Dropdown } from 'react-bootstrap';

const CustomToggle = React.forwardRef(({ children, onClick }: any, ref: any) => (
    <h4
        style={{ width: '50%' }}
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
    &#x25bc;
    {children}
    </h4>
  ));

const CustomMenu = React.forwardRef(
  ({ children, style, className }: any, ref: any) => {

      return (
      <div
        ref={ref}
        style={style}
        className={className}
      >

        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child =>
            // @ts-ignore
              child.props.children.toLowerCase(),
          )}
        </ul>
      </div>
      );
  },
);

const HomeHeaderComponent: React.FC<any> = () => (
    <div className="home-header">
    <Dropdown>
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
      Custom toggle
    </Dropdown.Toggle>

    <Dropdown.Menu  as={CustomMenu} >
      <Dropdown.Item eventKey="1">Red</Dropdown.Item>
      <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
      <Dropdown.Item eventKey="3" active={true}>
        Orange
      </Dropdown.Item>
      <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>,
    </div>
);

export const HomeHeader = HomeHeaderComponent;
