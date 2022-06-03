import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const BuyCoverCardArea = styled("div")(({ theme }) => ({
    paddingLeft: "10px",
    paddingRight: "10px",
    "&::before": {
        position: "absolute",
        top: "auto",
        bottom: 0,
        left: 0,
        borderRadius: "15px",
        backgroundImage: "linear-gradient(100deg, #13131d, #0398ed)",
        backgroundRepeat: "repeat-x",
        "-webkit-transition": "all .5s",
        transition: "all .5s",
        width: "100%",
        height: "100%",
        zIndex: "-2",
        transform: "rotate(2deg) translateX(-7px) translateY(11px)",
    },
    [theme.breakpoints.down("sm")]: {},
}));

const BuyCoverCardInnerArea = styled("div")(({ theme }) => ({
    height: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 0 5px #ccc",

    [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverDetailTopDetailArea = styled("div")(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
    backgroundColor: "#f0faff",
    border: "1px solid #abdcff",
    borderRadius: "8px",
    marginBottom: "20px",
}));
const SmallTopDetailName = styled("h5")(({ theme }) => ({
    fontSize: "12.5px",
    fontWeight: "700",
    width: "30%",
    textAlign: "center",
}));
const BuyCoverDetailTopArea = styled("div")(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
}));

const KeyValueArea = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "20%",
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
const BuyCoverDetailContentFooterArea = styled("div")(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: "#f0faff",
    border: "1px solid #abdcff",
    borderRadius: "8px",
    marginBottom: "20px",
    padding: "10px",
    marginTop: "10px",
}));
const BuyCoverNameBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    right: "0px",
    top: "-10px",
    padding: "5px 20px",
    backgroundColor: "#e8f7f0",
    color: "#1db371",
    border: "1px solid #1db371",
    borderRadius: "10px",
}));
const BuyCoverDetailContentArea = styled("div")(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverDetailContentValueArea = styled("div")(({ theme }) => ({
    position: "relative",
    height: "260px",
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
}));
const BuyCoverDetailFooterArea = styled("div")(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "10px",
    borderTop: "0.5px solid #ccc",
    paddingTop: "10px",
}));

const InsuranceLogo = styled("img")(({ theme }) => ({
    width: "auto",
    height: "40px",
    marginRight: "10px",
}));
const InsuranceName = styled("h4")(({ theme }) => ({
    fontSize: "18px",
    fontWeight: "700",
    marginLeft: "10px",
    lineHeight: "1px",
}));
const SmallDetailName = styled("h5")(({ theme }) => ({
    fontSize: "14px",
    fontWeight: "400",
    marginLeft: "10px",
    lineHeight: "1px",
}));
const CurrentText = styled("label")(({ theme }) => ({
    fontSize: "14px",
    fontWeight: "400",
    color: "#1db371",
}));
const BoxMIToken = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
}));
const BoxMITokenValueText = styled("h2")(({ theme }) => ({
    fontSize: "38px",
    fontWeight: "700",
    lineHeight: "1px",
}));
const BoxMITokenUnitText = styled("h5")(({ theme }) => ({
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "1px",
}));
const MaxValueText = styled("span")(({ theme }) => ({
    fontSize: "14px",
    fontWeight: "400",
    color: "#000",
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
}));

const BuyCoverDetail = ({ detail }) => {
    const [value, setValue] = React.useState(2);

    return (
        <BuyCoverCardArea>
            <BuyCoverCardInnerArea>
                <BuyCoverDetailTopArea>
                    {/* <InsuranceLogo src="https://app.insurace.io/asset/product/Biswap.png" /> */}
                    <Box>
                        <InsuranceName>{detail.typeName}</InsuranceName>
                        <SmallDetailName>{detail.name}</SmallDetailName>
                    </Box>
                </BuyCoverDetailTopArea>
                {/* <BuyCoverDetailTopDetailArea>
          <SmallTopDetailName>{detail.detail1}</SmallTopDetailName>
          <SmallTopDetailName>{detail.detail2}</SmallTopDetailName>
          <SmallTopDetailName>{detail.detail3}</SmallTopDetailName>
        </BuyCoverDetailTopDetailArea> */}
                <BuyCoverDetailContentArea>
                    <KeyValueArea>
                        <KeyText>Investment Rating</KeyText>
                        <ValueText>
                            <Box sx={{ "& > legend": { mt: 2 } }}>
                                <Rating
                                    name="simple-controlled"
                                    readOnly="true"
                                    value={value}
                                    // onChange={(event, newValue) => {
                                    //   setValue(newValue);
                                    // }}
                                />
                            </Box>
                        </ValueText>
                    </KeyValueArea>
                    <KeyValueArea>
                        <KeyText>Investment Risk</KeyText>
                        <ValueText>{detail.investmentRisk} </ValueText>
                    </KeyValueArea>
                    <KeyValueArea>
                        <KeyText>Daily Cost</KeyText>
                        <ValueText>{detail.dailyCost}</ValueText>
                    </KeyValueArea>
                    <KeyValueArea>
                        <KeyText>Monthly Cost</KeyText>
                        <ValueText>{detail.monthlyCost}</ValueText>
                    </KeyValueArea>
                    <KeyValueArea>
                        <KeyText>Yearly Cost</KeyText>
                        <ValueText>{detail.yearlyCost}</ValueText>
                    </KeyValueArea>
                    <KeyValueArea>
                        <KeyText>Max Coverage</KeyText>
                        <ValueText>{detail.maxCoverage}</ValueText>
                    </KeyValueArea>
                    <KeyValueArea>
                        <KeyText>Pool Statistic</KeyText>
                        <ValueText>View Detail </ValueText>
                    </KeyValueArea>
                    <KeyValueArea>
                        <KeyText>Coverage Detail</KeyText>
                        <ValueText>Read more</ValueText>
                    </KeyValueArea>

                    {/* <KeyValueArea>
            <KeyText>Profit Sharing (APY)</KeyText>
            <ValueText>{detail.profitSharing}</ValueText>
          </KeyValueArea> */}
                    {/* <BuyCoverDetailContentFooterArea>
            <KeyValueArea>
              <KeyText>Profit Earned</KeyText>
              <ValueText>{detail.profitEarned}</ValueText>
            </KeyValueArea>
            <KeyValueArea>
              <KeyText>LP Staked Value</KeyText>
              <ValueText>{detail.stakedValue}</ValueText>
            </KeyValueArea>
          </BuyCoverDetailContentFooterArea> */}
                </BuyCoverDetailContentArea>
                <BuyCoverDetailFooterArea>
                    <Button variant="contained">REDEEM</Button>
                    <Button variant="contained" href={detail.buyCoverUrl} passHref>
                        BUY
                    </Button>
                </BuyCoverDetailFooterArea>
            </BuyCoverCardInnerArea>
        </BuyCoverCardArea>
    );
};

export default BuyCoverDetail;
