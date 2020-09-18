import bendemboski from './bendemboski';
import chadhietala from './chadhietala';
import cloke from './cloke';
import rwjblue from './rwjblue';


const mapUsernameToUser = new Map([
  ['bendemboski', bendemboski],
  ['chadhietala', chadhietala],
  ['cloke', cloke],
  ['rwjblue', rwjblue],
]);


export default function getUser(username) {
  return mapUsernameToUser.get(username);
}