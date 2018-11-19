import React from 'react';
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';

export default (props) => {
    return (
        <div>
            <NavBar/>
            <Container>
                {props.children}
            </Container>
        </div>
    );
};