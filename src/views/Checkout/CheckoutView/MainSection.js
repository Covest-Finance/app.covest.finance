import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import useBuyCover from "../../../hooks/useBuyCover";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { ethers, ContractFactory } from "ethers";
import Web3 from "web3";
import axios from "axios";
import BigNumber from "bignumber.js";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";

BigNumber.set({ EXPONENTIAL_AT: 1000 });

let provider;
let web3;

const CheckoutArea = styled("div")(({ theme }) => ({
    marginTop: "5%",
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingBottom: "5%",
    display: "flex",
    flexDirection: "row",

    [theme.breakpoints.down("sm")]: {},
}));
const CheckoutLeftArea = styled("div")(({ theme }) => ({
    width: "60%",
    padding: "20px",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {},
}));
const CheckoutRightArea = styled("div")(({ theme }) => ({
    width: "30%",
    padding: "20px",
    borderRadius: "8px",
    position: "relative",
    right: 0,
    marginRight: "10%",
    [theme.breakpoints.down("sm")]: {},
}));
const H5Head = styled("h5")(({ theme }) => ({
    fontSize: "22px",
    color: "#515a6e",

    [theme.breakpoints.down("sm")]: {},
}));
const H5SubHead = styled("h5")(({ theme }) => ({
    fontSize: "22px",
    color: "#515a6e",

    [theme.breakpoints.down("sm")]: {},
}));
const CardArea = styled("div")(({ theme }) => ({
    position: "relative",
    marginBottom: "2rem",

    [theme.breakpoints.down("sm")]: {},
}));
const CardInnerArea = styled("div")(({ theme }) => ({
    borderRadius: "1rem",
    height: "auto",
    minHeight: "initial",
    width: "100%",
    background: "rgb(255, 255, 255)",
    transition: "height 0.2ms ease-out 0s",
    border: "1px solid rgb(228, 232, 239)",
    boxSizing: "border-box",
    padding: "15px",

    [theme.breakpoints.down("sm")]: {},
}));
const CustomTextField = styled(TextField)(({ theme }) => ({
    width: "100%",

    [theme.breakpoints.down("sm")]: {},
}));
const SelectCurrency = styled(TextField)(({ theme }) => ({
    marginTop: "8px",

    [theme.breakpoints.down("sm")]: {},
}));
const CurrencyListArea = styled("div")(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",

    [theme.breakpoints.down("sm")]: {},
}));

const InsuranceLogo = styled("img")(({ theme }) => ({
    width: "auto",
    height: "40px",
    marginRight: "10px",
}));
const InsuranceName = styled("h4")(({ theme }) => ({
    fontSize: "18px",
    fontWeight: "700",
    marginLeft: "5px",
    lineHeight: "1px",
    marginRight: "10px",
}));

const KeyValueArea = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "20%",
}));
const ButtonArea = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    marginTop: "10px",
}));
const KeyText = styled("h4")(({ theme }) => ({
    fontSize: "16px",
    color: "rgb(122, 110, 170)",
    textAlign: "left",
    lineHeight: "26px",
    margin: "0px",
}));

const ValueText = styled("h4")(({ theme }) => ({
    fontSize: "12px",
    color: "rgb(40, 13, 95);",
    textAlign: "left",
    lineHeight: "26px",
    margin: "0px",
}));

const RadioCustom = styled(FormControlLabel)(({ theme }) => ({
    fontSize: "12px",
    color: "rgb(40, 13, 95);",
    textAlign: "left",
    lineHeight: "26px",
    margin: "0px",
}));
const PresetAreaArea = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    minWidth: "20%",
}));
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
        margin: theme.spacing(0.5),
        color: "#168de2",
        borderLeft: "1px solid #abdcff !important",
        border: "1px solid #abdcff",

        fontSize: "12px",
        "&.Mui-disabled": {
            border: 0,
        },
        "&:not(:first-of-type)": {
            borderRadius: theme.shape.borderRadius,
        },
        "&:first-of-type": {
            borderRadius: theme.shape.borderRadius,
        },
    },
    "& .Mui-selected": {
        backgroundColor: "#1db371",
        color: "#ffff",
        borderRadius: "8px",
        fontSize: "12px",
    },
}));

const currencies = [
    {
        value: "USDT",
        label: "USDT",
    },
];
async function Getdata(url) {
    let data = (await axios.get(url)).data;

    return data;
}

const notify = (message, type) => {
    if (type === "success" || type === undefined) {
        toast.success(message);
    } else if (type === "error" || type === undefined) {
        toast.error(message);
    } else {
        toast(message);
    }
};

async function CallTranscation(abi, destination, functions, parameters, account) {
    let res;

    const Contract = await new web3.eth.Contract(abi, destination);

    await Contract.methods[functions](...parameters)
        .call({
            from: account,
        })
        .then((result) => {
            res = result;
        });

    return res;
}

async function SendTranscation(abi, destination, functions, parameters, account) {
    const Contract = await new web3.eth.Contract(abi, destination);
    // console.log(functions);
    // console.log(parameters);

    await Contract.methods[functions](...parameters)
        .send({
            from: account,
        })
        .on("transactionHash", (hash) => {
            // const { emitter } = notify.hash(hash);
            // emitter.on("txSent", // console.log);
            // emitter.on("txPool", // console.log);
            // emitter.on("txConfirmed", // console.log);
            // emitter.on("txSpeedUp", // console.log);
            // emitter.on("txCancel", // console.log);
            // emitter.on("txFailed", // console.log);
            console.log(hash);
            console.log("hash::");
        })
        .then((res) => {
            // console.log(res);

            // console.log("Event");
            // console.log(res?.events);

            if (res?.events?.BoughtPolicy) {
                return {
                    message: "BoughtPolicy Successfully",
                    data: res?.events?.BoughtPolicy,
                    returnData: res?.events?.BoughtPolicy?.returnValues,
                };
            }
        })
        .catch((e) => {
            console.log(e);

            if (e.code === 4001) {
                toast("Reject By User", "error");
                return {
                    message: "Reject By User",
                    data: e.code,
                    returnData: "Error",
                };
            }
            toast(e.message, "error");
            return {
                message: e.message,
                data: null,
                returnData: null,
            };
        });
}

const RenderDetail = (paramValue) => {
    const { account, router } = paramValue;
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState("Inprogress...");
    const handleLoading = (poolId, planId, referral, currency) => {
        setIsLoading(true);
        buyPolicy(poolId, planId, referral, currency);
    };
    const handleClose = (event, reason) => {
        if (reason && reason == "backdropClick") return;
        myCloseModal();
    };

    const BuyCoverData = useBuyCover(paramValue.poolId, account);
    const linkReferrer = `${account}`;
    const CoverDataByPlan = BuyCoverData.filter((item) => item.planId == paramValue.planId);

    const [alignment, setAlignment] = React.useState("0");
    const [referral, setReferral] = React.useState(linkReferrer);
    const handleReferralChange = (event) => {
        setReferral(event.target.value);
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const [currency, setCurrency] = React.useState("USDT");
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const currentDay = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const waitingPeriodDay = `${month[currentDay.getMonth()]} ${currentDay.getDate() + 14},  ${currentDay.getFullYear()}`;

    const startPeriodDay = `${month[currentDay.getMonth()]} ${currentDay.getDate()},  ${currentDay.getFullYear()}`;

    const rangPeriodDay = `${startPeriodDay} - ${month[currentDay.getMonth()]} ${currentDay.getDate()},  ${currentDay.getFullYear() + 1}`;

    async function buyPolicy(poolId, planId, referral, currency) {
        let account = await web3.eth.getAccounts();
        // check null web3

        const DataBlockchain = await Getdata("https://api.covest.finance/api/artifacts?version=2");
        const IERC20 = await Getdata("https://api.covest.finance/api/artifacts/IERC20?version=2");

        const DataFactory = await Getdata("https://api.covest.finance/api/Factory");

        let dataFactoryUse = DataFactory.filter((item) => item.poolId === poolId);

        if (!dataFactoryUse[0]) {
            setMessage("No data factory found.");
            setIsLoading(false);
            return console.error("No data factory found.");
        } else {
            dataFactoryUse = dataFactoryUse[0];
        }

        const policyManager = await dataFactoryUse?.policyManager;
        const policyDetails = await dataFactoryUse?.policyDetails;

        let nameRegsitryAddress = await dataFactoryUse?.nameRegistry;

        let nameRegsitryContract = await new web3.eth.Contract(DataBlockchain?.NameRegistry?.abi, nameRegsitryAddress);

        let referralAddress = await nameRegsitryContract.methods.RL().call();

        web3.eth.getChainId().then(console.log);

        const queryData = await Getdata(`https://api.covest.finance/api/quotePolicy?user=${account[0]}&poolId=${poolId}&planId=${planId}&assets=${currency}`);

        if (queryData?.message) {
            setMessage(`${queryData?.message}`);
            setIsLoading(false);
            notify(`ERROR: ${queryData?.message}`, "error");
            return console.error(`ERROR: ${queryData?.message}`);
        }

        const currencyAddress = queryData?.Assets;

        const approveBalance = await CallTranscation(IERC20, currencyAddress, "allowance", [account[0], policyManager], account[0]);

        let balanceOfAssetsUser = await CallTranscation(IERC20, currencyAddress, "balanceOf", [account[0]], account[0]);

        if (referral) {
            if (referral === "0x0000000000000000000000000000000000000000") {
            } else {
                const isReferral = await CallTranscation(DataBlockchain?.Referral?.abi, referralAddress, "isReferral", [referral], account[0]);

                // console.log(isReferral);

                if (!isReferral) {
                    referral = "0x0000000000000000000000000000000000000000";
                }
            }
        } else {
            referral = "0x0000000000000000000000000000000000000000";
        }

        setMessage(`Allowance : ${approveBalance.toString()}`);

        // console.log(`Allowance : ${approveBalance.toString()}`);

        // console.log(`Balance : ${balanceOfAssetsUser.toString()}`);

        const decimalsOfAssets = await CallTranscation(IERC20, currencyAddress, "decimals", [], account[0]);

        // setMessage(`Allowance : ${decimalsOfAssets.toString()}`);

        let buyValue = buy * 10 ** decimalsOfAssets;

        const datapayload = await web3.eth.abi.encodeParameters(
            ["address", "string", "uint[]", "uint", "uint", "uint8", "bytes32", "bytes32"],
            [queryData.Assets, queryData.policyId, queryData.Pricing, queryData.generatedAt, queryData.expiresAt, queryData.v, queryData.r, queryData.s],
        );

        const buy = queryData.Pricing[0];

        // console.log(account[0], policyManager, queryData.policyId, queryData.Assets, queryData.Pricing, referral, datapayload);

        if (approveBalance >= buyValue) {
            if (balanceOfAssetsUser >= buyValue) {
                const buyPolicySendTranscation = await SendTranscation(
                    DataBlockchain?.PolicyManager?.abi,
                    policyManager,
                    "buyPolicy",
                    [queryData.policyId, queryData.Assets, queryData.Pricing, referral, datapayload],
                    account[0],
                );

                if (buyPolicySendTranscation) {
                    if (buyPolicySendTranscation.mesasge === "BoughtPolicy Successfully") {
                        alert("BoughtPolicy Successfully");
                        setMessage("BoughtPolicy Successfully");
                        setIsLoading(false);
                        router.push("/activecover");
                        // console.log("BoughtPolicy Successfully");
                        // console.log(buyPolicySendTranscation);
                    }
                }
            } else {
                notify("Balance Insufficient.", "error");
                console.error("Balance Insufficient.");
                setMessage("Balance Insufficient.");
                setIsLoading(false);
            }
        } else {
            balanceOfAssetsUser = await CallTranscation(IERC20, currencyAddress, "balanceOf", [account[0]], account[0]);
            console.log("balanceOfAssetsUser::");
            console.log(balanceOfAssetsUser);
            buyValue = buy * 10 ** decimalsOfAssets;

            const response = await SendTranscation(IERC20, currencyAddress, "approve", [policyManager, BigNumber(buyValue).toString()], account[0]);

            if (response?.returnData === "Error") {
                setMessage(response.message);
                setIsLoading(false);
            }

            if (balanceOfAssetsUser >= buyValue) {
                const buyPolicySendTranscation = await SendTranscation(
                    DataBlockchain?.PolicyManager?.abi,
                    policyManager,
                    "buyPolicy",
                    [queryData.policyId, queryData.Assets, queryData.Pricing, referral, datapayload],
                    account[0],
                );
                if (buyPolicySendTranscation) {
                    if (buyPolicySendTranscation.mesasge === "BoughtPolicy Successfully") {
                        console.log("BoughtPolicy Successfully");
                        setMessage("BoughtPolicy Successfully");
                        setIsLoading(false);
                        notify("BoughtPolicy Successfully", "success");
                        router.push("/activecover");
                        // console.log("BoughtPolicy Successfully");
                        // console.log(buyPolicySendTranscation);
                    }
                }
            } else {
                console.error("Balance Insufficient.");
                setMessage("Balance Insufficient.");
                setIsLoading(false);
                notify("Balance Insufficient.", "error");
            }
        }
        setIsLoading(false);
    }

    return (
        <CheckoutArea>
            <CheckoutLeftArea>
                <CardArea>
                    <CardInnerArea>
                        <H5Head>Purchase details</H5Head>
                        <Toaster />

                        <p>Your coverage will become effective 14 days after your purchase transaction is successfully recorded in the insurance pool contracts. On or around {waitingPeriodDay}.</p>
                        <p>In the event of a claim, you will be reimbursed in the specified token that you paid for the premium up to the insured amount.</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <CustomTextField
                                    fullWidth
                                    label="Period"
                                    placeholder="Period"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1 }}
                                    value={rangPeriodDay}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <CustomTextField fullWidth label="Amount" placeholder="Amount" id="outlined-start-adornment" sx={{ m: 1, width: "25ch" }} value={CoverDataByPlan[0]?.yearlyCost ?? 0} />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <SelectCurrency id="outlined-select-currency" select value={currency} onChange={handleChange}>
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </SelectCurrency>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <CustomTextField fullWidth label="Referral" id="outlined-start-adornment" sx={{ m: 1 }} value={referral} onChange={handleReferralChange} />
                            </Grid>
                        </Grid>
                    </CardInnerArea>
                </CardArea>
            </CheckoutLeftArea>
            <CheckoutRightArea>
                <CardArea>
                    <CardInnerArea>
                        <H5Head>Summary</H5Head>
                        <p>
                            <CurrencyListArea>
                                <InsuranceName>{CoverDataByPlan[0]?.name}</InsuranceName>
                            </CurrencyListArea>
                        </p>
                        <KeyValueArea>
                            <KeyText>Type:</KeyText>
                            <ValueText>{CoverDataByPlan[0]?.typeName}</ValueText>
                        </KeyValueArea>
                        <KeyValueArea>
                            <KeyText>Max Coverage:</KeyText>
                            <ValueText>
                                {CoverDataByPlan[0]?.maxCoverage} {currency}
                            </ValueText>
                        </KeyValueArea>

                        <KeyValueArea>
                            <KeyText>You will pay:</KeyText>
                            <ValueText>
                                {CoverDataByPlan[0]?.yearlyCost} {currency}{" "}
                            </ValueText>
                        </KeyValueArea>
                        <ButtonArea>
                            <Button variant="contained" onClick={() => handleLoading(paramValue.poolId, paramValue.planId, referral, currency)}>
                                Purchase
                            </Button>
                        </ButtonArea>
                        <Modal open={isLoading} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ borderRadius: "8px" }}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: 400,
                                    bgcolor: "background.paper",
                                    boxShadow: 24,
                                    p: 4,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <p>
                                    {" "}
                                    <CircularProgress />
                                </p>
                                <p style={{ fontSize: "20px" }}>{message}</p>
                            </Box>
                        </Modal>
                    </CardInnerArea>
                </CardArea>
            </CheckoutRightArea>
        </CheckoutArea>
    );
};

const MainSection = () => {
    const router = useRouter();
    const { poolId, planId } = router.query;

    const [account, setAccount] = React.useState("");
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

    async function GetAccount() {
        const accountData = await web3?.eth?.getAccounts();

        if (accountData != undefined && accountData.length > 0) {
            setAccount(accountData[0]);
        } else {
            setAccount("xx");
        }
    }

    useEffect(() => {
        if (!wallet?.provider) {
            provider = null;
            web3 = null;
        } else {
            provider = new ethers.providers.Web3Provider(wallet.provider, "any");

            web3 = new Web3(wallet.provider);
        }

        GetAccount();
    }, [wallet]);

    if ((poolId != undefined) & (account != undefined) && account != "xx") {
        return <RenderDetail poolId={poolId} planId={planId} account={account} router={router}></RenderDetail>;
    } else {
        return <div></div>;
    }
};

export default MainSection;
