import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import useGetTotalData from "../../../hooks/useGetTotalData";

const PoolHeadArea = styled("div")(({ theme }) => ({
  height: "250px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
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

const PoolCardArea = styled("div")(({ theme }) => ({
  color: "#fff",
  padding: "15px",
  border: "1px solid #fff",
  borderRadius: "8px",
  margin: "10px 0 10px 0",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  filter: "drop-shadow(rgba(25, 19, 38, 0.15) 0px 1px 4px)",
  [theme.breakpoints.down("sm")]: {},
}));
const PoolCardTopArea = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  [theme.breakpoints.down("sm")]: {},
}));
const PoolCardTopicText = styled("h4")(({ theme }) => ({
  fontSize: "26px",
  fontWeight: "700",
  lineHeight: "1px",
  marginTop: "15px",
  [theme.breakpoints.down("sm")]: {},
}));
const PoolCardFooterArea = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {},
}));
const PoolCardDescText = styled("h4")(({ theme }) => ({
  fontSize: "14px",
  marginTop: "10px",
  lineHeight: "1px",
  [theme.breakpoints.down("sm")]: {},
}));
const PoolButton = styled(Button)(({ theme }) => ({
  color: "#ffff",
  [theme.breakpoints.down("sm")]: {},
}));
const TopSection = () => {
  const totalData = useGetTotalData();
  return (
    <>
      <PoolHeadArea>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <PoolCardArea>
                <PoolCardTopArea>
                  <PoolCardTopicText>
                    {totalData.totalPolicyValue ?? 0} USD
                  </PoolCardTopicText>
                  <PoolButton variant="outlined" href="/activecover" passHref>
                    My Policy
                  </PoolButton>
                </PoolCardTopArea>
                <PoolCardFooterArea>
                  <PoolCardDescText>My Total Policy Value</PoolCardDescText>
                </PoolCardFooterArea>
              </PoolCardArea>
            </Grid>
            <Grid item xs={12} md={4}>
              <PoolCardArea>
                <PoolCardTopArea>
                  <PoolCardTopicText>
                    {totalData.totalClaimValue ?? 0} USD
                  </PoolCardTopicText>
                  <PoolButton variant="outlined" href="/myclaim" passHref>
                    My Claims
                  </PoolButton>
                </PoolCardTopArea>
                <PoolCardFooterArea>
                  <PoolCardDescText>My Total Claim Value </PoolCardDescText>
                </PoolCardFooterArea>
              </PoolCardArea>
            </Grid>
            <Grid item xs={12} md={4}>
              <PoolCardArea>
                <PoolCardTopArea>
                  <PoolCardTopicText>
                    {totalData.totalMIValue ?? 0} USD
                  </PoolCardTopicText>
                  <PoolButton variant="outlined" href="/provider" passHref>
                    Become Provider
                  </PoolButton>
                </PoolCardTopArea>
                <PoolCardFooterArea>
                  <PoolCardDescText>My Total Mutual Value</PoolCardDescText>
                </PoolCardFooterArea>
              </PoolCardArea>
            </Grid>
          </Grid>
        </Box>
      </PoolHeadArea>
    </>
  );
};

export default TopSection;
