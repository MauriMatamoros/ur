import web3 from './web3';
import CardFactory from './build/CardFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CardFactory.interface),
    '0x9f96ED285Cc4209B781043612772deD7928C34eB'
);

export default instance;