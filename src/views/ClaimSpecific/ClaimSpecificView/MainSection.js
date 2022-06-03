import React from "react";
import TopSection from "./TopSection";
import FooterSection from "./FooterSection";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const MainSectionArea = styled("div")(({ theme }) => ({
  marginTop: "2%",
  width: "80%",
  display: "flex",
  flexDirection: "column",
  color: "rgb(81, 90, 110)",
  paddingLeft: "16px",
  paddingRight: "16px",

  borderRadius: "8px",
  padding: "20px 20px 0 20px",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "2%",
  boxShadow: "0 0 5px #ccc",
}));
const CountDownSectionArea = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: "2%",
}));
const CountDownBox = styled("div")(({ theme }) => ({
  width: "100px",
  color: "#1976d2",
  fontSize: "28px",
  fontWeight: 700,
  border: "1px solid #3b3b3b",
  borderRadius: "4px",
  padding: "5px 10px 5px 10px",
  textAlign: "center",
}));
const CountSeparator = styled("div")(({ theme }) => ({
  margin: "0 10px 0 10px",
  fontSize: "28px",
  fontWeight: 700,
  color: "#1976d2",
  verticalAlign: "middle",
}));
const InnerSectionArea = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
}));
const SmallBox = styled("div")(({ theme }) => ({
  width: "15%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#f6f8f9",
  borderRadius: "4px",
  padding: "15px",
  marginBottom: "10px",
  marginLeft: "5px",
  marginRight: "5px",
}));
const SmallNoBorderBox = styled("div")(({ theme }) => ({
  width: "20%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px",
  marginBottom: "10px",
  marginLeft: "5px",
  marginRight: "5px",
  fontSize: "30px",
}));
const MiddleUpBox = styled("div")(({ theme }) => ({
  width: "40%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f6f8f9",
  borderRadius: "4px",
  padding: "15px",
  marginBottom: "10px",
  marginLeft: "5px",
  marginRight: "5px",
  padding: "20px",
}));
const MiddleBox = styled("div")(({ theme }) => ({
  width: "25%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#f6f8f9",
  borderRadius: "4px",
  padding: "15px",
  marginBottom: "10px",
  marginLeft: "5px",
  marginRight: "5px",
}));
const LargeBox = styled("div")(({ theme }) => ({
  width: "35%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#f6f8f9",
  borderRadius: "4px",
  padding: "15px",
  marginBottom: "10px",
  marginLeft: "5px",
  marginRight: "5px",
}));
const HaftBox = styled("div")(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#f6f8f9",
  borderRadius: "4px",
  padding: "15px",
  marginBottom: "10px",
  marginLeft: "5px",
  marginRight: "5px",
}));
const FullWidthBox = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#f6f8f9",
  borderRadius: "4px",
  padding: "15px",
  marginBottom: "10px",
  marginLeft: "5px",
  marginRight: "5px",
}));
const InnerKeyBox = styled("div")(({ theme }) => ({
  width: "100%",
  fontSize: "20px",
  fontWeight: 700,
}));
const InnerValueBox = styled("div")(({ theme }) => ({
  width: "100%",
  fontSize: "14px",
}));
const InnerKeyVsBox = styled("div")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 700,
}));
const InnerValueVsBox = styled("div")(({ theme }) => ({
  fontSize: "32px",
  color: "#1976d2",
  marginBottom: "15px",
}));
const InnerRejectValueVsBox = styled("div")(({ theme }) => ({
  fontSize: "32px",
  color: "#f5542f",
  marginBottom: "15px",
}));
const HeadText = styled("div")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 700,
  borderLeft: "5px solid #1976d2",
  paddingLeft: "10px",
  margin: "50px 0 15px 0",
}));
const MainSection = (props) => {
  return (
    <div>
      <TopSection></TopSection>
      <MainSectionArea>
        <CountDownSectionArea>
          <CountDownBox>00</CountDownBox>
          <CountSeparator>:</CountSeparator>
          <CountDownBox>00</CountDownBox>
          <CountSeparator>:</CountSeparator>
          <CountDownBox>00</CountDownBox>
        </CountDownSectionArea>
        <InnerSectionArea>
          <SmallBox>
            <InnerKeyBox>1</InnerKeyBox>
            <InnerValueBox>Claim ID</InnerValueBox>
          </SmallBox>
          <LargeBox>
            <InnerKeyBox>2021/06/16</InnerKeyBox>
            <InnerValueBox>Loss Event Time</InnerValueBox>
          </LargeBox>
          <MiddleBox>
            <InnerKeyBox>2,794.8400 USDC</InnerKeyBox>
            <InnerValueBox>Loss Amount</InnerValueBox>
          </MiddleBox>
          <MiddleBox>
            <InnerKeyBox>2,794.8400 USDC</InnerKeyBox>
            <InnerValueBox>Claim Amount</InnerValueBox>
          </MiddleBox>
        </InnerSectionArea>
        <InnerSectionArea>
          <SmallBox>
            <InnerKeyBox>1</InnerKeyBox>
            <InnerValueBox>Cover ID</InnerValueBox>
          </SmallBox>
          <LargeBox>
            <InnerKeyBox>2021/06/15 - 2021/07/15</InnerKeyBox>
            <InnerValueBox>Cover Period</InnerValueBox>
          </LargeBox>
          <MiddleBox>
            <InnerKeyBox>0x5c10e3d8</InnerKeyBox>
            <InnerValueBox>Owner</InnerValueBox>
          </MiddleBox>
          <MiddleBox>
            <InnerKeyBox>20,000.0000 USDC</InnerKeyBox>
            <InnerValueBox>Cover Amount</InnerValueBox>
          </MiddleBox>
        </InnerSectionArea>
        <InnerSectionArea>
          <HaftBox>
            <InnerKeyBox>Autofarm</InnerKeyBox>
            <InnerValueBox>Protocol</InnerValueBox>
          </HaftBox>
          <HaftBox>
            <InnerKeyBox>Smart Contract Vulnerability</InnerKeyBox>
            <InnerValueBox>Cover Type</InnerValueBox>
          </HaftBox>
        </InnerSectionArea>
        <InnerSectionArea>
          <FullWidthBox>
            <InnerKeyBox>Description</InnerKeyBox>
            <InnerValueBox>
              1. I suffered a loss from the IRON-USDC SLP in Autofarm as a
              result of an attack on Titan
              (https://www.reddit.com/r/maticnetwork/comments/o1hpl7/there_is_an_active_spam_attack_happening_to/).
              2. The IRON stable coin lost it is peg and went to $0.70 from $1
              as a result of the attack 3. I deposited into Autofarm IRON-USDC
              SLP on 15/06/2021. On chain deposit evidence can be found on
              https://polygonscan.com/tx/0x4d62e25441ccbb6c360a16806e789f0edeafb01ed5c42982c35aad353d8f002c
              4. My Autofarm IRON-USDC SLP was worth $20,179.23 before the
              attack occurred. Screenshot of balance from Autofarm dashboard
              sent to claims@insurace.io. 5. I withdrew $17384 IRON-USDC SLP
              from auto farm pool as instructed by the Iron Finance team
              https://twitter.com/IronFinance/status/1405320650202419202 On
              chain withdrawal evidence can be found
              https://polygonscan.com/tx/0x8a087617ae9d1ad8b0586a4cb327e7af4c2006dd3e7899d11a704c9821993ada
              Screenshot of balance from Autofarm dashboard sent to
              claims@insurace.io. 6. My loss is 20179.23 - 17384.39 = 2794.84
              Please let me know if further evidence is required. Thanks
            </InnerValueBox>
          </FullWidthBox>
        </InnerSectionArea>
        <InnerSectionArea>
          <HeadText>Reference Report from Advisory Board</HeadText>
        </InnerSectionArea>
        <InnerSectionArea>
          <MiddleBox>
            <InnerKeyBox>1,000.0000 INSUR</InnerKeyBox>
            <InnerValueBox>Total Claim Assessment Reward</InnerValueBox>
          </MiddleBox>
          <MiddleBox>
            <InnerKeyBox>Not Voted</InnerKeyBox>
            <InnerValueBox>My Vote</InnerValueBox>
          </MiddleBox>
          <MiddleBox>
            <InnerKeyBox>0.0000</InnerKeyBox>
            <InnerValueBox>My Number of Votes</InnerValueBox>
          </MiddleBox>
          <MiddleBox>
            <InnerKeyBox>0.0000 INSUR</InnerKeyBox>
            <InnerValueBox>My Reward</InnerValueBox>
          </MiddleBox>
        </InnerSectionArea>
        <InnerSectionArea>
          <MiddleUpBox>
            <InnerKeyVsBox>Accept</InnerKeyVsBox>
            <InnerValueVsBox>3,451.5000</InnerValueVsBox>
            <Button variant="contained">Vote</Button>
          </MiddleUpBox>
          <SmallNoBorderBox>vs</SmallNoBorderBox>
          <MiddleUpBox>
            <InnerKeyVsBox>Reject</InnerKeyVsBox>
            <InnerRejectValueVsBox>79,562.5225</InnerRejectValueVsBox>
            <Button variant="contained">Vote</Button>
          </MiddleUpBox>
        </InnerSectionArea>
      </MainSectionArea>
    </div>
  );
};

export default MainSection;
