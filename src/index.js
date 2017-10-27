/**
 * detherGateway
 * @author Dether TEAM
 */

import 'babel-polyfill';
import DetherJS from './detherJs';
import Wallet from './wallet';

DetherJS.Wallet = Wallet;

module.exports = DetherJS;
