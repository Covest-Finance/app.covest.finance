import * as React from "react";
import { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";

import InputUnstyled from "@mui/base/InputUnstyled";
import Button from "@mui/material/Button";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";

const blue = { 200: "#80BFFF", 400: "#3399FF" };

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputElement = styled("input")(({ theme }) => ({
  marginRight: "10px",
  width: "320px",
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: 1.5,
  color: theme.palette.mode === "dark" ? grey[300] : grey[900],
  background: theme.palette.mode === "dark" ? grey[900] : grey[50],
  border:
    theme.palette.mode === "dark"
      ? `1px solid ${grey[800]}`
      : `1px solid ${grey[300]}`,
  borderRadius: "8px",
  padding: "12px 12px",
  transition: "all 150ms ease",
  "&:hover": {
    background: theme.palette.mode === "dark" ? "" : grey[100],
    borderColor: theme.palette.mode === "dark" ? grey[700] : grey[400],
  },
  "&:focus": {
    outline: `2px solid ${
      theme.palette.mode === "dark" ? blue[400] : blue[200]
    }`,
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

const RefferalHeadArea = styled("div")(({ theme }) => ({
  height: "350px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#ffff",
  paddingRight: "5rem",
  paddingLeft: "5rem",
  transition: "0.3s",
  borderBottom: "1px solid #ffffff14",
  background: "linear-gradient(0deg ,#37609d,#081587)",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    paddingRight: "1rem",
    paddingLeft: "1rem",
  },
}));

const RefferalHeadLeftArea = styled("div")(({ theme }) => ({
  marginLeft: "30px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0px",
  },
}));

const RefferalHeadRightArea = styled("div")(({ theme }) => ({
  marginLeft: "30px",
  width: "35%",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0px",
    width: "100%",
  },
}));

const RefferalHeaderText = styled("h2")(({ theme }) => ({
  fontSize: "40px",
  fontWeight: 700,
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
    fontWeight: 700,
  },
}));

const RefferalHeaderHightlightText = styled("span")(({ theme }) => ({
  backgroundImage: "linear-gradient(90deg,#fad14a,#f5a624)",
  fontSize: "40px",
  fontWeight: 700,
  borderRadius: "8px",
  padding: "4px 8px 4px 8px",
  marginLeft: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
    fontWeight: 700,
  },
}));

const RefferalSubHeaderText = styled("p")(({ theme }) => ({
  fontSize: "18px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));

const RefferalStackCopyArea = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flext-start",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});

const RefferalRemarkText = styled("p")(({ theme }) => ({
  fontSize: "14px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

const TopSection = () => {
  const connectedWallets = useWallets();
  let linkReferrer = "https://app.covest.finance/ref?addr=";
  const [reffererLink, setReffererLink] = React.useState(linkReferrer);
  useEffect(() => {
    const account = connectedWallets[0]?.accounts[0]?.address;
    if (account && account !== "0x0000000000000000000000000000000000000000") {
      linkReferrer = `${linkReferrer}${account}`;
      setReffererLink(linkReferrer);
    }
  });

  const handleChange = (event) => {
    setReffererLink(event.target.value);
  };

  return (
    <RefferalHeadArea>
      <RefferalHeadLeftArea>
        <RefferalHeaderText>
          Refer Friends
          <RefferalHeaderHightlightText>
            Earn Rewards
          </RefferalHeaderHightlightText>
        </RefferalHeaderText>
        <RefferalSubHeaderText>
          When your friends successfully purchase covers using your referral
          link or code,
        </RefferalSubHeaderText>
        <RefferalSubHeaderText>
          you will both get a reward for the covers purchased.
        </RefferalSubHeaderText>
      </RefferalHeadLeftArea>
      <RefferalHeadRightArea>
        <RefferalStackCopyArea>
          <CustomInput
            label="Link URL"
            variant="outlined"
            value={reffererLink}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              navigator.clipboard.writeText(reffererLink);
            }}
          >
            Copy
          </Button>
        </RefferalStackCopyArea>
        <RefferalRemarkText>
          Share your referral link or code and get rewards!
        </RefferalRemarkText>
      </RefferalHeadRightArea>
    </RefferalHeadArea>
  );
};

export default TopSection;
