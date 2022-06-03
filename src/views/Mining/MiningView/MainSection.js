import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TopSection from "./TopSection";
import FooterSection from "./FooterSection";
import useGetInsurance from "../../../hooks/useGetInsurance";
import MainSectionDetail from "./MainSectionDetail";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

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

const InsuranceLogoArea = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "row",
}));
const InsuranceLogo = styled("img")(({ theme }) => ({
  width: "50px",
  height: "50px",
  marginRight: "15px",
  marginBottom: "15px",
}));
const ControlArea = styled("div")(({ theme }) => ({
  width: "80%",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "row",
  marginBottom: "16px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%",
  },
}));
const MainSection = (props) => {
  const router = useRouter();
  const { id, providerId } = router.query;
  const idParam = id == undefined ? "-" : id;

  const { insuranceId } = props;
  const insuranceData = useGetInsurance(idParam, providerId);

  const stakeData = [];
  stakeData.push({
    stakeName: "Total Staked Value",
    stakeValue: "1,548 $",
  });
  stakeData.push({
    stakeName: "Staked amount",
    stakeValue: "268 MI Tokens",
  });
  stakeData.push({
    stakeName: "Reward amount",
    stakeValue: "70 $",
  });
  stakeData.push({
    stakeName: "Penalty amount",
    stakeValue: "10 $",
  });
  console.log(insuranceData);
  if (insuranceData != undefined) {
    return (
      <div>
        <TopSection></TopSection>
        {insuranceData.map((insurance, insuranceIndex) => (
          <MainSectionArea key={insuranceIndex}>
            <InsuranceLogoArea>
              {/* <InsuranceLogo src={insurance.logoUrl}></InsuranceLogo> */}
              <p>{insurance.name}</p>
            </InsuranceLogoArea>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {stakeData.map((stake, indexStake) => (
                  <Grid key={indexStake} item xs={12} md={3}>
                    <MainSectionDetail
                      key={indexStake}
                      stakeName={stake.stakeName}
                      stakeValue={stake.stakeValue}
                    ></MainSectionDetail>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <ControlArea>
              <Button variant="outlined" size="large">
                Stake
              </Button>
              <Button variant="outlined" size="large">
                Unstake
              </Button>
              <Button variant="outlined" size="large">
                Withdraw
              </Button>
              <Button variant="outlined" size="large">
                Claim Reward
              </Button>
            </ControlArea>
          </MainSectionArea>
        ))}
        <FooterSection></FooterSection>
      </div>
    );
  } else {
    return <p>test</p>;
  }
};

export default MainSection;
