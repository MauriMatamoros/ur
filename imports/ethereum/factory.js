import web3 from './web3';
import CardFactory from './build/CardFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CardFactory.interface),
    '0x9feb868f7ff39c5B10dfB38496092D0D5a4510a8'
);

export default instance;