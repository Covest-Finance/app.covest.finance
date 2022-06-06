import { Logo, Icon } from "./modules/getLogo";
import { init } from "@web3-onboard/react";
import injectedModule, { ProviderLabel } from "@web3-onboard/injected-wallets";
import trezorModule from "@web3-onboard/trezor";
import ledgerModule from "@web3-onboard/ledger";
import walletConnectModule from "@web3-onboard/walletconnect";
import walletLinkModule from "@web3-onboard/walletlink";
import portisModule from "@web3-onboard/portis";
import magicModule from "@web3-onboard/magic";
import fortmaticModule from "@web3-onboard/fortmatic";
import torusModule from "@web3-onboard/torus";
import keepkeyModule from "@web3-onboard/keepkey";
import gnosisModule from "@web3-onboard/gnosis";

const injected = injectedModule();
const walletConnect = walletConnectModule({
    bridge: "YOUR_CUSTOM_BRIDGE_SERVER",
    qrcodeModalOptions: {
        mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"],
    },
});

//# This key is not mine //
// const portis = portisModule({
//     apiKey: "b2b7586f-2b1e-4c30-a7fb-c2d1533b153b",
// });

// const fortmatic = fortmaticModule({
//     apiKey: "pk_test_886ADCAB855632AA",
// });
// const magic = magicModule({
//     apiKey: "pk_live_02207D744E81C2BA",
// });
//# This key is not mine //

const torus = torusModule();
const ledger = ledgerModule();
const keepkey = keepkeyModule();

const gnosis = gnosisModule();

const trezorOptions = {
    email: "info@covest.finance",
    appUrl: "https://covest.finance",
};

const trezor = trezorModule(trezorOptions);

const INFURA_ID = process.env.INFURA_ID || "9aa3d95b3bc440fa88ea12eaa4456161";

export const initWeb3Onboard = init({
    wallets: [
        injected,
        ledger,
        trezor,
        walletConnect,
        gnosis,
        keepkey,
        torus,
        // magic,
        // fortmatic,
        // portis,
    ],
    chains: [
        {
            id: "0x1",
            token: "ETH",
            label: "Ethereum",
            rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
        },
        {
            id: "0x3",
            token: "tROP",
            label: "Ropsten",
            rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
        },
        {
            id: "0x4",
            token: "rETH",
            label: "Rinkeby",
            rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
        },
        {
            id: "0x38",
            token: "BNB",
            label: "Binance",
            rpcUrl: "https://bsc-dataseed.binance.org/",
        },
        {
            id: "0x89",
            token: "MATIC",
            label: "Polygon",
            rpcUrl: "https://matic-mainnet.chainstacklabs.com",
        },
        {
            id: "0xfa",
            token: "FTM",
            label: "Fantom",
            rpcUrl: "https://rpc.ftm.tools/",
        },
        {
            id: "0x6545",
            token: "KUB",
            label: "Bitkub Chain - Testnet",
            rpcUrl: "https://rpc-testnet.bitkubchain.io",
        },
    ],
    appMetadata: {
        name: "Covest Finance",
        icon: Icon,
        logo: Logo,
        description:
            "Covest Finance is a peer-to-peer insurance protocol that enabled people to share risk together without the need for insurance companies as the entities to manage and custody the fund.",
        recommendedInjectedWallets: [{ name: "MetaMask", url: "https://metamask.io" }],
        agreement: {
            version: "1.0.0",
            termsUrl: "https://www.blocknative.com/terms-conditions",
            privacyUrl: "https://www.blocknative.com/privacy-policy",
        },
        gettingStartedGuide: "https://blocknative.com",
        explore: "https://blocknative.com",
    },
    accountCenter: {
        desktop: {
            position: "topRight", // default: 'topRight'
            enabled: false, // default: true
        },
    },
    i18n: {
        en: {
            connect: {
                selectingWallet: {
                    header: "Connect Wallet",
                    sidebar: {
                        header: "Welcome",
                        subheading: "Connect to Covest Finance",
                        paragraph:
                            "Covest Finance is a peer-to-peer insurance protocol that enabled people to share risk together without the need for insurance companies as the entities to manage and custody the fund",
                    },
                },
            },
        },
    },
});
