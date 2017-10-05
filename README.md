# detherGateway
Gateway between Front App and the detherContracts.

### Build doc
```
# Run ESDoc.
./node_modules/.bin/esdoc

# View a documentation
open ./docs/index.html
```


import Dether from 'dether-gateway';
import DetherUtils from 'dether-utils';

Dether = {
  // POST
  addTeller: () => {},
  addShop: () => {},
  deleteTeller: () => {},
  deleteShop: () => {},
  updateTeller: () => {},
  updateShop: () => {},
  dtrSendCoin: () => {},

  // GET
  dtrGetTellerBalance: () => {},
  getShop: () => {},
  getAllShop: () => {},
  getTeller: () => {},
  getAllTeller: () => {},
}

utils: {
  decodeKeystore: () => {},
  sendEth: () => {},
  getTxs: () => {},
  getEthBalance: () => {},
}

Gerer l'import de fichier seul ex:

import getEthBalance from 'dether-utils/getEthBalance';
