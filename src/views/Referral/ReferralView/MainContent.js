import TopContentSection from "./TopContentSection";
import TableContent from "./TableContent";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { ethers, ContractFactory } from "ethers";
import Web3 from "web3";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import keccak256 from "keccak256";

let web3;
let provider;

const ReferralContentArea = styled("div")(({ theme }) => ({
    minHeight: "100vh",
    paddingTop: "15%",
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    paddingRight: "3rem",
    paddingLeft: "3rem",
    transition: "0.3s",
    borderBottom: "1px solid #ffffff14",
    backgroundColor: "#ffff",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        paddingRight: "1rem",
        paddingLeft: "1rem",
    },
}));

const getBoughtPolicyEventsWithTxHash = async (policyManagerContract, provider, abi, txHash) => {
    const eventsOfIndex = await policyManagerContract.getPastEvents("BoughtPolicy", {
        fromBlock: 0,
        toBlock: "latest",
    });

    if (eventsOfIndex.length > 0) {
        let filterData = eventsOfIndex.filter((item) => item?.transactionHash === txHash);
        if (filterData) {
            filterData = filterData[0]?.returnValues ?? [];

            let dataReturn = [
                {
                    policyId: filterData?.policyId,
                    asset: filterData?.asset,
                    pricing: await Promise.all((filterData?.pricing).map((i) => Number(i))),
                    percentWeight: await Promise.all((filterData?.percentWeight).map((i) => Number(i))),
                    timeStamp: filterData?.timeStamp,
                    whoIsRefer: filterData?.whoIsRefer,
                },
            ];

            return dataReturn;
        } else {
            return [];
        }
    } else {
        return [];
    }
};

const getFundOutFlowEventsWithTxHash = async (referralContract, txHash, web3, assetAbi) => {
    const eventsOfIndex = await referralContract.getPastEvents("FundOutFlow", {
        fromBlock: 0,
        toBlock: "latest",
    });
    if (eventsOfIndex.length > 0) {
        let filterData = eventsOfIndex.filter((item) => item?.transactionHash === txHash);
        if (filterData) {
            filterData = filterData[0]?.returnValues ?? [];
            let assetContract = new web3.eth.Contract(assetAbi, filterData?.asset);
            let decimals = await assetContract.methods.decimals().call();

            let dataReturn = [Number(filterData?.value) / 10 ** decimals];

            return dataReturn;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
};

const FormatTime = (time) => {
    if (time < 10) {
        return `0${time}`;
    } else {
        return `${time}`;
    }
};

const getEmitEvents = async (wallet, account) => {
    if (wallet?.provider) {
        web3 = new Web3(wallet.provider);
        provider = new ethers.providers.Web3Provider(wallet.provider);

        if (!account || account === "0x0000000000000000000000000000000000000000") {
            return [];
        }

        let dataReturns = [];

        const { data: dataFactory } = await axios.get(`https://api.covest.finance/api/factory`);
        const { data: dataJsonABI } = await axios.get(`https://api.covest.finance/api/artifacts?version=2`);
        const { data: dataERC20ABI } = await axios.get(`https://api.covest.finance/api/artifacts/IERC20?version=2`);
        const referralAbi = await dataJsonABI?.Referral?.abi;
        const policyManagerAbi = await dataJsonABI?.PolicyManager?.abi;
        const policyDetailsAbi = await dataJsonABI?.PolicyDetails?.abi;

        for (let i = 0; i < dataFactory.length; i++) {
            const referralAddress = dataFactory[i]?.Referral;
            const policyManagerAddress = dataFactory[i]?.policyManager;
            const policyDetailsAddress = dataFactory[i]?.policyDetails;
            const referralContract = new web3.eth.Contract(referralAbi, referralAddress);
            const policyManagerContract = new web3.eth.Contract(policyManagerAbi, policyManagerAddress);
            const policyDetailsContract = new web3.eth.Contract(policyDetailsAbi, policyDetailsAddress);
            const poolName = await policyManagerContract.methods.name().call();
            const poolId = await policyManagerContract.methods.symbol().call();
            console.log(`Account is : ${account}`);
            const eventsFundInFlow = await referralContract.getPastEvents("FundInFlow", {
                filter: { whoRefer: account }, // Using an array means OR: e.g. 20 or 23
                fromBlock: 0,
                toBlock: "latest",
            });

            if (eventsFundInFlow.length > 0) {
                for (let indexOfEvents = 0; indexOfEvents < eventsFundInFlow.length; indexOfEvents++) {
                    let dataOfEvents = eventsFundInFlow[indexOfEvents];
                    let transactionHash = eventsFundInFlow[indexOfEvents]?.transactionHash;

                    let emitPolicy = await getBoughtPolicyEventsWithTxHash(policyManagerContract, provider, policyManagerAbi, transactionHash);

                    if (emitPolicy.length > 0) {
                        emitPolicy = emitPolicy[0];

                        const eventsForRedeem = await policyManagerContract.getPastEvents("RedeemedPolicy", {
                            filter: { 0: emitPolicy?.policyId }, // Using an array means OR: e.g. 20
                            fromBlock: 0,
                            toBlock: "latest",
                        });

                        let emitFundOutFlow = 0;

                        if (eventsForRedeem.length > 0) {
                            let transactionHashOfRedeem = eventsForRedeem[0]?.transactionHash;

                            emitFundOutFlow = await getFundOutFlowEventsWithTxHash(referralContract, transactionHashOfRedeem, web3, dataERC20ABI);
                        }

                        let dataOfPolicy = await policyManagerContract.methods.dataOfPolicy(emitPolicy?.policyId).call();

                        let startDate = await Number(dataOfPolicy[0].startDate);
                        let untilDate = await Number(dataOfPolicy[0].untilDate);

                        dataReturns.push({
                            poolName: poolName,
                            poolId: poolId,
                            from: dataOfEvents?.returnValues?.from,
                            policyId: emitPolicy?.policyId,
                            asset: emitPolicy?.asset,
                            whoIsRefer: emitPolicy?.whoIsRefer,
                            premium: emitPolicy?.pricing[0],
                            rewardEarned: Number(dataOfEvents?.returnValues?.value) / 10 ** emitPolicy?.pricing[2] - emitFundOutFlow,
                            percentWeight: emitPolicy?.percentWeight,
                            pricing: emitPolicy?.pricing,
                            startDate: startDate,
                            untilDate: untilDate,
                            transactionHash: transactionHash,
                        });
                    }
                }
            } else {
                continue;
            }
        }

        if (dataReturns.length > 0) {
            let dataWillReturn = [];
            for (let i = 0; i < dataReturns.length; i++) {
                const Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const startDate = new Date(Number(dataReturns[i]?.startDate) * 1000).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: Timezone,
                    timeZoneName: "short",
                });
                const endDate = new Date(Number(dataReturns[i]?.untilDate) * 1000).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: Timezone,
                    timeZoneName: "short",
                });

                console.log(`startDate : ${startDate}`);

                const changeHours = (hours) => {
                    if (hours < 10) {
                        return `0${hours}`;
                    } else {
                        return hours;
                    }
                };

                const startPeriodDay = startDate;

                const endPeriodDay = endDate;
                console.log(dataReturns[i]?.policyId);
                dataWillReturn.push({
                    policyId: dataReturns[i]?.policyId,
                    poolName: dataReturns[i]?.poolName,
                    premium: dataReturns[i]?.premium,
                    rewardEarned: dataReturns[i]?.rewardEarned,
                    startDate: startPeriodDay,
                    ultilDate: endPeriodDay,
                    transactionHash: dataReturns[i]?.transactionHash,
                });
            }
            return dataWillReturn;
        } else {
            return [];
        }
    } else {
        return [];
    }
};

const MainContent = () => {
    const [isLoading, setLoading] = useState(false);
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
    const [events, setEvents] = useState([]);
    const connectedWallets = useWallets();

    const getEmit = async () => {
        if (isLoading === false && connectedWallets[0]?.accounts[0]?.address && wallet?.provider) {
            setLoading(true);
            setEvents(await getEmitEvents(wallet, connectedWallets[0]?.accounts[0]?.address));
        }
    };

    useEffect(() => {
        getEmit();
    }, [connectedWallets, wallet]);

    return (
        <ReferralContentArea>
            <TopContentSection></TopContentSection>
            <TableContent data={events}></TableContent>
        </ReferralContentArea>
    );
};

export default MainContent;
