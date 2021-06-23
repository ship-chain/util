import { ethers, Contract } from "ethers";
import { abi } from '../ERC721.json';

const provider = new ethers.providers.JsonRpcProvider();

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
const signer = provider.getSigner();

provider.getBlockNumber().then(blockNum => console.log('blocknum', blockNum))
// { Promise: 12261282 }

// Get the balance of an account (by address or ENS name, if supported by network)
provider.getBalance('0xa0ee7a142d267c1f36714e4a8f75612f20a79720').then(balance => {
  // { BigNumber: "2337132817842795605" }
  
  // Often you need to format the output to something more user-friendly,
  // such as in ether (instead of wei)
  console.log(ethers.utils.formatEther(balance));
  // '2.337132817842795605'
  
  // If a user enters a string in an input field, you may need
  // to convert it from ether (as a string) to wei (as a BigNumber)
  console.log(ethers.utils.parseEther("1.0"));

});
let contract = new Contract('0x5fc8d32690cc91d4c39d9d3abcbd16989f875707', abi, signer);

contract.on('Transfer', (from, to, amount, event) => {
    event.removeListener();

    
    console.log('from',from, 'to', to, 'amount', amount, 'event', 'event');
    console.log(event.from);
    console.log(event.to);
    // console.log(event.amount.toNumber(), 12345);

});
// contract.transferFrom('0xa0ee7a142d267c1f36714e4a8f75612f20a79720', '0xbcd4042de499d14e55001ccbb24a551f3b954096', 100);

