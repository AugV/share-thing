import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../Constants/Routes';
import { Row, Col } from 'antd';

const LandingScreen: React.FC = () => {
    return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>

      <Link to={ROUTES.SIGN_IN}>
        <h2>Sing-in</h2>
      </Link>

      <Link to={ROUTES.SIGN_UP}>
        <h2>Sing-up</h2>
      </Link>

    </div>
    );
};

export { LandingScreen };
