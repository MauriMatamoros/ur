import web3 from './web3';
import Card from './build/Card.json';

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(Card.interface),
        address
    );
};