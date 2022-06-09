import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TopSectionDetail from "./TopSectionDetail";
import Link from "next/link";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import useGetInsurance from "../../../hooks/useGetInsurance";

const MiningArea = styled("div")(({ theme }) => ({
  marginTop: "2%",
  width: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingLeft: "16px",
  paddingRight: "16px",
  marginLeft: "auto",
  marginRight: "auto",
}));
const FilterArea = styled("div")(({ theme }) => ({
  marginTop: "2%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
const FilterRightArea = styled("Box")(({ theme }) => ({
  width: "30%",
  display: "flex",
  flexDirection: "column",
  marginBottom: "16px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
const FilterRightControlArea = styled("Box")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  marginBottom: "16px",
}));
const FilterRightLabelArea = styled("Box")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "16px",
}));
const InnerLinkArea = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
}));
const PoolLink = styled("h4")(({ theme }) => ({
  fontWeight: "700",
  fontSize: "20px",
  cursor: "pointer",
}));
const TopSection = () => {
  const router = useRouter();
  const { id, providerId } = router.query;
  // console.log("providerId::", providerId);
  const idParam = id == undefined ? "-" : id;
  const providerIdParam = providerId == undefined ? "-" : providerId.toString();
  const poolData = [];
  poolData.push({
    poolName: "Estimated Pool APY",
    poolValue: "0%",
  });
  poolData.push({
    poolName: "Unstaked Lock Date",
    poolValue: "86400",
  });
  poolData.push({
    poolName: "Unstaked Lock Period",
    poolValue: "≈ 15 days",
  });
  poolData.push({
    poolName: "Max Staked Amount",
    poolValue: "0.0000",
  });
  const providerUrl = "/provider";
  const [provider, setProvider] = React.useState("");
  const insuranceData = useGetInsurance(idParam);
  const handleChange = (event) => {
    setProvider(event.target.value);
  };
  if (insuranceData.length > 0) {
    if (provider == "") {
      setProvider(providerIdParam);
    }

    return (
      <MiningArea>
        <FilterArea>
          <Link href={providerUrl} passHref>
            <InnerLinkArea>
              <ArrowBackIosIcon></ArrowBackIosIcon>
              <PoolLink>{insuranceData[0].name}</PoolLink>
            </InnerLinkArea>
          </Link>

          <FilterRightArea>
            <FilterRightControlArea>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Service Provider
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={provider}
                  label="Service Provider"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Referral</MenuItem>
                  <MenuItem value={2}>Claim Assessor</MenuItem>
                  <MenuItem value={3}>Underwriter</MenuItem>
                  <MenuItem value={4}>Capital Reserve</MenuItem>
                </Select>
              </FormControl>
            </FilterRightControlArea>
            <FilterRightLabelArea></FilterRightLabelArea>
          </FilterRightArea>
        </FilterArea>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {poolData.map((pool, indexPool) => (
              <Grid key={indexPool} item xs={12} md={3}>
                <TopSectionDetail
                  key={indexPool}
                  poolName={pool.poolName}
                  poolValue={pool.poolValue}
                ></TopSectionDetail>
              </Grid>
            ))}
          </Grid>
        </Box>
      </MiningArea>
    );
  } else {
    return <div></div>;
  }
};

export default TopSection;
