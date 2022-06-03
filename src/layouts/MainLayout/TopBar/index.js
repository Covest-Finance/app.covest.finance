import Link from "next/link";
import * as React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SideBar from "../SideBar";
import Web3 from "web3";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { ethers, ContractFactory } from "ethers";
import { initWeb3Onboard } from "../../../wallet";
import { initNotify } from "../../../notify";
import Stack from "@mui/material/Stack";

let provider;
let web3;

const NavDesktop = styled.nav`
  height: 80px;
  background: #ffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  padding-right: 3rem;
  padding-left: 3rem;
  width: 100%;
  transition: 0.3s;
  border-bottom: 1px solid #ffffff14;
`;

const Logo = styled.img`
  max-height: 35px;
  object-fit: cover;
`;

const StyleLink = styled.a`
  padding: 0rem 2rem;
`;

const NavLeftArea = styled.div`
  display: flex;
  align-items: center;
`;

const NavRightArea = styled.div`
  display: flex;
  align-items: center;
`;

const NavMobile = styled.div`
  color: #000;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
`;

String.prototype.replaceBetween = function (start, end, what) {
  return this.substring(0, start) + what + this.substring(end);
};

const Topbar = () => {
  const theme = useTheme();
  const [onboard, setOnboard] = useState(null);
  const [notify, setNotify] = useState(null);
  const connectedWallets = useWallets();
  const [isInitChain, setInitChain] = useState(false);
  const [isUnsubOnboard, setUnsubOnboard] = useState(false);
  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain, // boolean indicating if the chain is in the process of being set
    },
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("isUnsubOnboard started::", isUnsubOnboard);
  async function changeChain() {
    if (settingChain) return;

    const changeChain = await setChain({ chainId: "0x6545" });

    return changeChain;
  }

  async function connectWallet() {
    if (!wallet) {
      await connect();
      if (!settingChain) {
        const isChangeChainInternal = await changeChain();
        if (isChangeChainInternal) {
          console.log("Welcome to Covest Finance");
        }
      }
    }
  }

  async function unsubscribeOnboard() {
    if (!onboard) {
      return;
    }
    if (!isUnsubOnboard) {
      const wallets = onboard.state.select("wallets");
      const { unsubscribe } = wallets.subscribe((update) =>
        console.log("wallets update: ", update)
      );

      // unsubscribe when updates are no longer needed
      unsubscribe();
      setUnsubOnboard(true);
    }
  }

  useEffect(() => {
    setOnboard(initWeb3Onboard);
    setNotify(initNotify());
    connectWallet();
  }, []);

  useEffect(() => {
    if (!connectedChain) return;
    if (settingChain) return;

    if (isInitChain === false) {
      setInitChain(true);
      return;
    }

    if (connectedChain?.id !== "0x6545") {
      console.log(connectedChain);
      changeChain();
    }
  }, [connectedChain]);

  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      "connectedWallets",
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets]);

  useEffect(() => {
    if (!wallet?.provider) {
      provider = null;
    } else {
      provider = new ethers.providers.Web3Provider(wallet.provider, "any");

      web3 = new Web3(wallet.provider);
    }
  }, [wallet]);

  useEffect(() => {
    const isLoginShowed = JSON.parse(
      window.localStorage.getItem("isLoginShowed")
    );
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets")
    );
    let thisTime = new Date().getTime();
    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        console.log("isUnsubOnboard::", isUnsubOnboard);
        if (!isLoginShowed || thisTime > isLoginShowed?.timeOut) {
          await connect({
            autoSelect: { label: previouslyConnectedWallets[0] },
          });
          if (!isUnsubOnboard) {
            unsubscribeOnboard();
          }

          let timeOut = new Date();
          timeOut.setHours(timeOut.getHours() + 2);
          let dataWrite = {
            isLoginShowed: true,
            timeOut: timeOut.getTime(),
          };
          window.localStorage.setItem(
            "isLoginShowed",
            JSON.stringify(dataWrite)
          );
        } else {
          await connect({
            autoSelect: {
              label: previouslyConnectedWallets[0],
              disableModals: true,
            },
          });
          if (!isUnsubOnboard) {
            unsubscribeOnboard();
          }
        }
      }
      setWalletFromLocalStorage();
    }
  }, [onboard, connect]);

  const ButtonDisconnect = styled(Button)(({ theme }) => ({
    padding: "15px 34px",
    backgroundColor: "#212E48",
    fontWeight: 500,
    textTransform: "none",
  }));

  const ButtonConnect = styled(Button)(({ theme }) => ({
    padding: "15px 34px",
    backgroundColor: "#01A3FF",
    fontWeight: 500,
    textTransform: "none",
  }));

  const disconnectOnboard = async () => {
    await disconnect(wallet);
    window.localStorage.removeItem("isLoginShowed");
    window.localStorage.removeItem("connectedWallets");
  };

  const connectOnboard = async () => {
    if (!connecting || !connectedWallets[0]?.accounts[0]) {
      await connectWallet();
    }
  };

  const IsAuthenRender = React.forwardRef(function IsAuthenRender(props, ref) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [address, setAddress] = useState("");

    //
    const accountUserLasted = connectedWallets[0]?.accounts[0]?.address;

    const returnData = () => {
      return connectedWallets[0]?.accounts[0] ? (
        <div className="div-showed">
          <ButtonDisconnect
            onClick={() => disconnectOnboard()}
            className="div-showed-spacing"
            variant="contained"
            size="large"
          >
            Disconnect
          </ButtonDisconnect>
          <h4 className="div-showed-spacing">
            {accountUserLasted.slice(0, 5)}...
            {accountUserLasted.slice(accountUserLasted.length - 5)}
          </h4>
        </div>
      ) : (
        <div className="div-showed">
          <ButtonConnect
            onClick={() => connectOnboard()}
            className="div-showed-spacing"
            variant="contained"
            size="large"
          >
            Connect
          </ButtonConnect>
        </div>
      );
    };

    return (
      <div className="div-btn">
        {!onboard || !notify ? <div>Loding...</div> : <></>}
        <div>{returnData()}</div>
        {/* <button className="btn btn-primary" onClick={Login}>
          {status}
        </button> */}
      </div>
    );
    // if (connectedWallets[0]?.accounts[0]) {
    //   return (
    //     <Button
    //       variant="contained"
    //       onClick={() => {
    //         Login();
    //       }}
    //     >
    //       ConnectWallet
    //     </Button>
    //   );
    // } else {
    //    return <Button variant="contained"> {connectedWallets[0]?.accounts[0]?.address}</Button>;

    // }
  });

  return (
    <div>
      <AppBar>
        <NavMobile style={{ display: isMobile ? "flex" : "none" }}>
          <SideBar></SideBar>
          <Link href="https://covest.finance" passHref>
            <Logo src="logo/logo-dark.png"></Logo>
          </Link>
        </NavMobile>
        <NavDesktop style={{ display: isMobile ? "none" : "flex" }}>
          <NavLeftArea>
            <Link href="https://covest.finance" passHref>
              <Logo src="logo/logo-dark.png"></Logo>
            </Link>

            <Link href="https://covest.finance" passHref>
              <StyleLink>Home</StyleLink>
            </Link>
            <Link href="/referral" passHref>
              <StyleLink>Referral</StyleLink>
            </Link>

            <Link href="/pool" passHref>
              <StyleLink>Get Insured</StyleLink>
            </Link>

            <Link href="/provider" passHref>
              <StyleLink>Become Provider</StyleLink>
            </Link>
            <Link href="https://docs.covest.finance" passHref>
              <StyleLink>Docs</StyleLink>
            </Link>
          </NavLeftArea>
          <NavRightArea>
            <IsAuthenRender></IsAuthenRender>
          </NavRightArea>
        </NavDesktop>
      </AppBar>
    </div>
  );
};

export default Topbar;
