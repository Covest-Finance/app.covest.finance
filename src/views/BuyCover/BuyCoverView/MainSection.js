import React, { useEffect, useState } from "react";

import useBuyCover from "../../../hooks/useBuyCover";
import BuyCoverDetail from "./BuyCoverDetail";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";

import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { ethers, ContractFactory } from "ethers";
import Web3 from "web3";

let provider;
let web3;

const BuyCoverArea = styled("div")(({ theme }) => ({
  marginTop: "2%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  paddingLeft: "16px",
  paddingRight: "16px",
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreateTabBuyCover = (props) => {
  const router = useRouter();
  const { poolId } = router.query;
  const { account } = props;

  const BuyCoverData = useBuyCover(poolId, account);
  if (BuyCoverData.message === undefined) {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {BuyCoverData.map((detail, indexDetail) => (
              <Grid key={indexDetail} item xs={12} md={4}>
                <BuyCoverDetail detail={detail}></BuyCoverDetail>
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    );
  } else {
    return <div>{BuyCoverData.message}</div>;
  }
};
const MainContent = () => {
  const router = useRouter();
  const { poolId } = router.query;

  const [account, setAccount] = React.useState("");
  const connectedWallets = useWallets();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  async function GetAccount() {
    const accountUserLasted = connectedWallets[0]?.accounts[0]?.address;

    if (
      connectedWallets != undefined &&
      connectedWallets[0]?.accounts[0]?.address
    ) {
      setAccount(accountUserLasted);
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

  if (poolId != undefined && account != "xx") {
    return (
      <BuyCoverArea>
        <CreateTabBuyCover account={account}></CreateTabBuyCover>
      </BuyCoverArea>
    );
  } else {
    return <div></div>;
  }
};

export default MainContent;
