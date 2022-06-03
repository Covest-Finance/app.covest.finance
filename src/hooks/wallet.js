import { config } from "../config";
const APP_URL = "http://localhost:3000";
const CONTACT_EMAIL = "support@covestfinance.org";
const RPC_URL = config.rpcUrl;
const APP_NAME = "Covest Finance";

const wallets = [
  { walletName: "metamask", preferred: true },
  { walletName: "coinbase", preferred: true },
  { walletName: "trust", preferred: true, rpcUrl: RPC_URL },
  { walletName: "binance", preferred: true },
  {
    walletName: "trezor",
    appUrl: APP_URL,
    email: CONTACT_EMAIL,
    rpcUrl: RPC_URL,
    preferred: true,
  },
  {
    walletName: "ledger",
    rpcUrl: RPC_URL,
    preferred: true,
  },
  { walletName: "1inch", preferred: true },
  //   {
  //     walletName: "fortmatic",
  //     apiKey: FORTMATIC_KEY,
  //     preferred: true,
  //   },
  //   {
  //     walletName: "portis",
  //     apiKey: PORTIS_KEY,
  //     preferred: true,
  //     label: "Portis",
  //   },
  {
    walletName: "walletConnect",
    rpc: {
      [config.networkId.toString()]: RPC_URL,
    }, // [Optional]
  },
  // { walletName: "authereum" },
  // {
  //     walletName: "lattice",
  //     rpcUrl: RPC_URL,
  //     appName: APP_NAME,
  // },
  // {
  //     walletName: "keepkey",
  //     rpcUrl: RPC_URL,
  // },
  // {
  //     walletName: "mewwallet",
  //     rpcUrl: RPC_URL,
  // },
  // {
  //     walletName: "cobovault",
  //     rpcUrl: RPC_URL,
  //     appName: APP_NAME,
  // },
  // {
  //     walletName: "keystone",
  //     rpcUrl: RPC_URL,
  //     appName: APP_NAME,
  // },
  // { walletName: "opera" },
  // { walletName: "operaTouch" },
  // { walletName: "torus" },
  // { walletName: "status" },
  // { walletName: "walletLink", rpcUrl: RPC_URL, appName: APP_NAME },
  // { walletName: "imToken", rpcUrl: RPC_URL },
  // { walletName: "meetone" },
  // { walletName: "mykey", rpcUrl: RPC_URL },
  // { walletName: "huobiwallet", rpcUrl: RPC_URL },
  // { walletName: "hyperpay" },
  // { walletName: "wallet.io", rpcUrl: RPC_URL },
  // { walletName: "atoken" },
  // { walletName: "frame" },
  // { walletName: "ownbit" },
  // { walletName: "alphawallet" },
  // { walletName: "gnosis" },
  // { walletName: "xdefi" },
  // { walletName: "bitpie" },
  // { walletName: "liquality" },
  // { walletName: "tally" },
  // { walletName: "blankwallet" },
  // { walletName: "mathwallet" },
  // { walletName: "ronin" },
];

export default wallets;
