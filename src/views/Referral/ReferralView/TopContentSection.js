import { styled } from "@mui/material/styles";
import styles from "styled-components";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";
import { config } from "../../../config";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";

const ReferralTopContentArea = styled("div")(({ theme }) => ({
    height: "250px",
    width: "90%",
    position: "absolute",
    top: "-80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #ffffff14",
    backgroundColor: "#fff",
    border: "1px solid #e5e6ea",
    borderRadius: "20px",
    padding: "20px 0 20px 0",

    [theme.breakpoints.down("sm")]: {
        width: "100%",
        position: "relative",
        top: "unset",
    },
}));

const ReferralTopContentLeftArea = styles.div`
    color:#000;
    width:50%;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column`;

const ReferralTopContentRightArea = styles.div`
    color:#000;
    width:50%;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column`;

const ReferralClaimHeadText = styled("h4")(({ theme }) => ({
    fontWeight: 600,
    marginBottom: "10px",
    lineHeight: 1.25,
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
    },
}));

const ReferralClaimSubHeadText = styled("p")(({ theme }) => ({
    fontSize: "20px",
    fontWeight: 600,
    color: "#acacac",
    [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
    },
}));

const ReferralClaimButton = styled(Button)(({ theme }) => ({
    padding: "8px 8px",
    textTransform: "none",
}));

const getDataReferral = async (user) => {
    if (user !== "0x0000000000000000000000000000000000000000") {
        const { data } = await axios.get(`${config.url}/referralData?user=${user}`);
        return data;
    }
};

const TopContentSection = () => {
    const [dataRefer, setDataRefer] = useState(null);
    const connectedWallets = useWallets();

    async function getRefer(account) {
        const dataReturn = await getDataReferral(account);
        console.log(dataReturn);
        setDataRefer(dataReturn);
    }

    useEffect(() => {
        getRefer(connectedWallets[0]?.accounts[0]?.address);
    }, [connectedWallets]);

    return (
        <ReferralTopContentArea>
            <ReferralTopContentLeftArea>
                <ReferralClaimHeadText>{dataRefer?.referalRewards ?? 0} USD</ReferralClaimHeadText>
                <ReferralClaimSubHeadText>Referral Reward</ReferralClaimSubHeadText>
                <ReferralClaimButton size="large" variant="contained" startIcon={<AccountBalanceWalletIcon />}>
                    {" "}
                    Claim Reward
                </ReferralClaimButton>
            </ReferralTopContentLeftArea>
            <Divider orientation="vertical" flexItem></Divider>
            <ReferralTopContentRightArea>
                <ReferralClaimHeadText>{dataRefer?.referralStaking ?? 0} USD</ReferralClaimHeadText>
                <ReferralClaimSubHeadText>Staking Value </ReferralClaimSubHeadText>
                <ReferralClaimButton size="large" variant="contained" href="/provider" startIcon={<AccountBalanceWalletIcon />}>
                    {" "}
                    Become Referrer
                </ReferralClaimButton>
            </ReferralTopContentRightArea>
        </ReferralTopContentArea>
    );
};

export default TopContentSection;
