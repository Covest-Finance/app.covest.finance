const moduleExports = {
    reactStrictMode: true,
    env: {
        API_URL: process.env.API_URL,
        RPC_URL: process.env.RPC_URL,
        NETWORK_ID: process.env.NETWORK_ID,
        API_UPLOAD_URL: process.env.API_UPLOAD_URL,
        DAPP_ID: process.env.DAPP_ID,
        INFURA_ID: process.env.INFURA_ID,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
};

module.exports = moduleExports;
