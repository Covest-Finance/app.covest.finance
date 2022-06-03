import * as React from "react";
import TopSection from "./TopSection";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Fab from "@mui/material/Fab";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const MainSectionArea = styled("div")(({ theme }) => ({
  marginTop: "2%",
  width: "80%",
  display: "flex",
  flexDirection: "column",

  paddingLeft: "16px",
  paddingRight: "16px",

  borderRadius: "8px",
  padding: "20px 20px 0 20px",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "2%",
  boxShadow: "0 0 5px #ccc",
}));

const InnerSectionArea = styled("div")(({ theme }) => ({
  marginTop: "2%",
  width: "100%",

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: "16px",
  paddingRight: "16px",

  padding: "20px 20px 0 20px",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "2%",
}));
const InnerLeftSectionArea = styled("div")(({ theme }) => ({
  marginTop: "2%",
  height: "347px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "flex-start",
  marginBottom: "2%",
  paddingTop: "2%",
}));

const InnerCenterSectionArea = styled("div")(({ theme }) => ({
  marginTop: "2%",
  width: "20%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: "16px",
  paddingRight: "16px",
  padding: "20px 20px 0 20px",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "2%",
}));
const InnerRightSectionArea = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  boxShadow: "0 0 5px #ccc",
  marginBottom: "2%",
}));
const ReceiveValueArea = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
  backgroundColor: "#f0faff",
  border: "1px solid #abdcff",
  padding: "5px 5px 0 5px",

  marginBottom: "2%",
}));
const ReceiveValueCenterArea = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
}));
const ReceiveValueFooterArea = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
}));
const InfoArea = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  marginBottom: "2%",
}));
const InfoDetailArea = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "2%",
}));
const InfoRightDetailArea = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  marginBottom: "2%",
}));
const LabelRightText = styled("label")(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "400",
}));
const InputBoxArea = styled(Box)(({ theme }) => ({
  width: 500,
  maxWidth: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
const SwapButtonBoxArea = styled(Box)(({ theme }) => ({
  marginLeft: "36px",
  marginRight: "16px",
  [theme.breakpoints.down("sm")]: {
    // width: '100%'
  },
}));
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    color: "#1db371",
    borderLeft: "1px solid #1db371 !important",
    border: "1px solid #1db371",

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
const MainSection = () => {
  const [alignment, setAlignment] = React.useState("0");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <TopSection></TopSection>
      <MainSectionArea>
        <InnerSectionArea>
          <InnerLeftSectionArea>
            <InputBoxArea>
              <TextField fullWidth label=" BUSD to" />
            </InputBoxArea>
            <SwapButtonBoxArea>
              <Fab color="primary" aria-label="add">
                <SwapHorizIcon />
              </Fab>
            </SwapButtonBoxArea>
          </InnerLeftSectionArea>

          <InnerRightSectionArea>
            <ReceiveValueArea>
              <InputLabel shrink htmlFor="bootstrap-input">
                You receive{" "}
              </InputLabel>
              <ReceiveValueCenterArea>
                <InputLabel shrink htmlFor="bootstrap-input">
                  0{" "}
                </InputLabel>
                <InputLabel shrink htmlFor="bootstrap-input">
                  NXM{" "}
                </InputLabel>
              </ReceiveValueCenterArea>
              <ReceiveValueFooterArea>
                <InputLabel shrink htmlFor="bootstrap-input">
                  ~$ 0{" "}
                </InputLabel>
              </ReceiveValueFooterArea>
            </ReceiveValueArea>
            <InfoArea>
              <InfoDetailArea>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Rate:{" "}
                </InputLabel>
                <LabelRightText>1 NXM ~ 0.0332 ETH </LabelRightText>
              </InfoDetailArea>
              <InfoDetailArea>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Inverse rate:{" "}
                </InputLabel>
                <LabelRightText>1ETH ~ 30.0634 NXM </LabelRightText>
              </InfoDetailArea>
              <InfoDetailArea>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Slippage tolerance:{" "}
                </InputLabel>
                <StyledToggleButtonGroup
                  size="small"
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                  aria-label="text alignment"
                >
                  <ToggleButton value="0.1" aria-label="left aligned">
                    0.1%
                  </ToggleButton>
                  <ToggleButton value="0.5" aria-label="centered">
                    0.5%
                  </ToggleButton>
                  <ToggleButton value="1.0" aria-label="right aligned">
                    1.0%
                  </ToggleButton>
                  <ToggleButton value="0" aria-label="justified">
                    0%
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </InfoDetailArea>
              <InfoDetailArea>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Minimum received:{" "}
                </InputLabel>
                <LabelRightText>0.0000 NXM </LabelRightText>
              </InfoDetailArea>
              <InfoRightDetailArea>
                <Button variant="contained">Connect wallet</Button>
              </InfoRightDetailArea>
            </InfoArea>
          </InnerRightSectionArea>
        </InnerSectionArea>
      </MainSectionArea>
    </div>
  );
};

export default MainSection;
