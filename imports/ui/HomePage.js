import React from 'react';
import Layout from './Layout';
import { Header, Image } from 'semantic-ui-react';

export default class HomePage extends React.Component {
    render() {
        return (
            <Layout>
                <Image src="https://cdnb.artstation.com/p/assets/images/images/000/218/971/large/nils-hamm-black-winged-strix-id140355-final-s.jpg?1411549511"/>
            </Layout>
        );
    }
}