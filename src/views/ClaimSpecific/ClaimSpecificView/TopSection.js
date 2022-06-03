import * as React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ClaimArea = styled("div")(({ theme }) => ({
    marginTop: "2%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    marginLeft: "auto",
    marginRight: "auto",
}));
const FilterArea = styled("div")(({ theme }) => ({
    marginTop: "2%",
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "16px",
    paddingRight: "16px",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
    },
}));
const ClaimStatusArea = styled("div")(({ theme }) => ({
    width: "80%",
    display: "flex",
    flexDirection: "column",

    paddingLeft: "16px",
    paddingRight: "16px",
    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: "#f0faff",
    border: "1px solid #abdcff",
    borderRadius: "8px",
    padding: "15px",
}));
const HeaderText = styled("div")(({ theme }) => ({
    fontSize: "16px",
    fontWeight: 700,
}));
const InnerLinkArea = styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
}));
const ClaimLink = styled("h4")(({ theme }) => ({
    fontWeight: "700",
    fontSize: "20px",
    cursor: "pointer",
}));
const TopSection = () => {
    return (
        <ClaimArea>
            <FilterArea>
                <Link href="/myclaim" passHref>
                    <InnerLinkArea>
                        <ArrowBackIosIcon></ArrowBackIosIcon>
                        <ClaimLink>Claim</ClaimLink>
                    </InnerLinkArea>
                </Link>
            </FilterArea>
            <ClaimStatusArea>
                <div>
                    <HeaderText>Status: Rejected</HeaderText>
                </div>
                <div>This claim assessment has ended. Thanks for your participation.</div>
            </ClaimStatusArea>
        </ClaimArea>
    );
};

export default TopSection;
