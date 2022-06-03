import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useGetPool from "../../../hooks/useGetPool";

const PoolTableArea = styled("div")(({ theme }) => ({
  width: "100%",
  color: "#ffff",
  paddingRight: "5rem",
  paddingLeft: "5rem",

  [theme.breakpoints.down("sm")]: {},
}));
const PoolHeadText = styled("h3")(({ theme }) => ({
  fontSize: "25px",
  color: "#000",

  [theme.breakpoints.down("sm")]: {},
}));

const PoolItemArea = styled("div")(({ theme }) => ({
  color: "#000",
  flex: 1,
  background: "white",
  borderRadius: "6px",
  transition: "all 0.2s ease-in-out",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "relative",
  boxShadow: "0 6px 25px 0 rgb(80 129 244 / 10%)",
  padding: "10px",
  "&:hover": {
    boxShadow: "0 6px 25px 0 rgb(80 129 244 / 21%)",
    borderColor: "transparent",
  },
}));

const TitleText = styled("h4")(({ theme }) => ({
  color: "#1D144F",
  fontSize: "14px",
  fontWeight: "500",
  letterSpacing: "-0.09px",
  lineHeight: "22px",
  marginLeft: "12px",
  overflowWrap: "break-word",
  minWidth: "30%",
  maxHeight: "74px",
  overflowY: "hidden",
}));
const PoolLogo = styled("img")(({ theme }) => ({
  width: "auto",
  height: "40px",
  marginRight: "10px",
}));

const KeyValueArea = styled("h4")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "20%",
}));
const KeyText = styled("h4")(({ theme }) => ({
  fontSize: "12px",
  color: "rgb(122, 110, 170)",
  textAlign: "left",
  lineHeight: "26px",
  margin: "0px",
}));
const AccordionGroup = styled(Accordion)(({ theme }) => ({
  width: "100%",
}));

const ValueText = styled("h4")(({ theme }) => ({
  fontSize: "12px",
  color: "rgb(40, 13, 95);",
  textAlign: "left",
  lineHeight: "1px",
  margin: "0px",
}));

const PoolItemDetailArea = styled("div")(({ theme }) => ({
  color: "#000",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));
const PoolItemDetailEndArea = styled("div")(({ theme }) => ({
  color: "#000",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "2%",
}));
export default function MainSection() {
  const poolData = useGetPool();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <PoolTableArea>
      <PoolHeadText>Pool Summary</PoolHeadText>
      {poolData.map((pool, indexPool) => (
        <PoolItemArea key={indexPool}>
          <AccordionGroup
            expanded={expanded === "panel" + indexPool}
            onChange={handleChange("panel" + indexPool)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {/* <PoolLogo src="https://set-core.s3.amazonaws.com/img/portfolios/fli_btc.svg"></PoolLogo> */}
              <TitleText>{pool.name}</TitleText>
              <KeyValueArea>
                <KeyText>Total Active Coverage</KeyText>
                <ValueText>{pool.totalCoverage}</ValueText>
              </KeyValueArea>
              <KeyValueArea>
                <KeyText>Active Policy Value</KeyText>
                <ValueText>{pool.policyValue}</ValueText>
              </KeyValueArea>
              <KeyValueArea>
                <KeyText>Total Provided Capital (Premium & Reserve)</KeyText>
                <ValueText>{pool.totalProvidedCapital}</ValueText>
              </KeyValueArea>
            </AccordionSummary>
            <AccordionDetails>
              <PoolItemDetailArea>
                <KeyText>Pool Address</KeyText>
                <ValueText>{pool.poolAddress}</ValueText>
              </PoolItemDetailArea>
              <PoolItemDetailArea>
                <KeyText>Total Policy Active (Coverage)</KeyText>
                <ValueText>{pool.activePoliciesCoverageValue}</ValueText>
              </PoolItemDetailArea>
              <PoolItemDetailArea>
                <KeyText>Total Policy Active (Volume)</KeyText>
                <ValueText>{pool.totalCoverage}</ValueText>
              </PoolItemDetailArea>
              <PoolItemDetailArea>
                <KeyText>Total Policy Active (Value)</KeyText>
                <ValueText>{pool.policyValue}</ValueText>
              </PoolItemDetailArea>
              <PoolItemDetailArea>
                <KeyText>Total Policy Sold (Volume)</KeyText>
                <ValueText>{pool.totalPolicySoldVolume}</ValueText>
              </PoolItemDetailArea>
              <PoolItemDetailArea>
                <KeyText>Total Policy Sold (Value)</KeyText>
                <ValueText>{pool.totalPolicySoldValue}</ValueText>
              </PoolItemDetailArea>
              <PoolItemDetailArea>
                <KeyText>Total Claim Reserve (Value)</KeyText>
                <ValueText>{pool.totalClaimValueReserve}</ValueText>
              </PoolItemDetailArea>
              <PoolItemDetailArea>
                <KeyText>Total Claim Paid (Value)</KeyText>
                <ValueText>{pool.totalClaimValuePaid}</ValueText>
              </PoolItemDetailArea>

              <PoolItemDetailArea>
                <KeyText>CAR Radio</KeyText>
                <ValueText>{pool.cARRadio}</ValueText>
              </PoolItemDetailArea>
              <PoolItemDetailEndArea>
                <Button variant="contained" href={pool.buyCoverUrl}>
                  Buy Policy
                </Button>
              </PoolItemDetailEndArea>
            </AccordionDetails>
          </AccordionGroup>
        </PoolItemArea>
      ))}
    </PoolTableArea>
  );
}
