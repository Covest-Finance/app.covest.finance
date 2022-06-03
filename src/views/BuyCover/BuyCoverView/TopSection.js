import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const BuyCoverHeadArea = styled("div")(({ theme }) => ({
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

const BuyCoverCardArea = styled("div")(({ theme }) => ({
  color: "#fff",
  padding: "15px",
  border: "1px solid #fff",
  borderRadius: "8px",
  margin: "10px 0 10px 0",
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  filter: "drop-shadow(rgba(25, 19, 38, 0.15) 0px 1px 4px)",
  [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverCardNameArea = styled("div")(({ theme }) => ({
  width: "20%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "15px",
  [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverProgressArea = styled(Box)(({ theme }) => ({
  // marginTop: "5%",
  position: "relative",
  [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverProgressFooterArea = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverCardTopArea = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverCardTopicText = styled("h4")(({ theme }) => ({
  fontSize: "26px",
  fontWeight: "700",
  lineHeight: "1px",
  marginTop: "15px",
  [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverCardFooterArea = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverCardDescText = styled("h4")(({ theme }) => ({
  fontSize: "14px",
  marginTop: "10px",
  lineHeight: "1px",
  [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverButton = styled(Button)(({ theme }) => ({
  color: "#ffff",
  [theme.breakpoints.down("sm")]: {},
}));
const BuyCoverLogo = styled("img")(({ theme }) => ({
  width: "auto",
  height: "40px",
  marginRight: "10px",
}));
const TitleText = styled("h4")(({ theme }) => ({
  color: "#ffff",
  fontSize: "14px",
  fontWeight: "500",
  letterSpacing: "-0.09px",
  lineHeight: "22px",
  marginLeft: "12px",
  overflowWrap: "break-word",
  minWidth: "30%",
  maxHeight: "74px",
  overflowY: "hidden",
  textalign: "left",
}));
const DetailText = styled("h4")(({ theme }) => ({
  color: "#ffff",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "22px",
  marginTop: "1px",
}));
const MiniBarProgress = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  top: "0rem",
  left: "0rem",
}));
const MiniBar = styled("div")(({ theme }) => ({
  height: "0.7rem",
  border: "1px solid #2775ca",
  borderRadius: "8px",
  position: "relative",
  width: "-webkit-calc(100% - 2rem)",
  width: "-moz-calc(100% - 2rem)",
  width: "calc(100% - 2rem)",
  marginRight: "0.5rem",
}));
const TopSection = () => {
  return (
    <>
      <BuyCoverHeadArea>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <BuyCoverCardArea>
                <BuyCoverCardNameArea>
                  {/* <BuyCoverLogo src="https://set-core.s3.amazonaws.com/img/portfolios/fli_btc.svg"></BuyCoverLogo> */}
                  <TitleText>USD VALUE</TitleText>
                </BuyCoverCardNameArea>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <BuyCoverLogo src="logo/usdt.png"></BuyCoverLogo>
                      <div>USDT 30%</div>
                    </div>
                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <BuyCoverLogo src="logo/busd.png"></BuyCoverLogo>
                      <div>BUSD 40%</div>
                    </div>
                    <div
                      style={{
                        width: "30%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <BuyCoverLogo src="logo/usdc.png"></BuyCoverLogo>
                      <div>USDC 30%</div>
                    </div>
                  </div>

                  <BuyCoverProgressArea sx={{ flexGrow: 1 }}>
                    {/* <BorderLinearProgress variant="determinate" value={50} /> */}
                    <MiniBar>
                      <MiniBarProgress
                        style={{
                          left: 0,
                          width: "30%",
                          backgroundColor: "#26a17b",
                        }}
                      ></MiniBarProgress>
                      <MiniBarProgress
                        style={{
                          left: "30%",
                          width: "40%",
                          backgroundColor: "#f0b90b",
                        }}
                      ></MiniBarProgress>
                      <MiniBarProgress
                        style={{
                          left: "70%",
                          width: "30%",
                          backgroundColor: "#2775ca",
                        }}
                      ></MiniBarProgress>
                    </MiniBar>
                    {/* <BuyCoverProgressFooterArea>
                      <DetailText>1,601.0114 (used)</DetailText>
                      <DetailText>(total) 3,848.5296</DetailText>
                    </BuyCoverProgressFooterArea> */}
                  </BuyCoverProgressArea>
                </div>
              </BuyCoverCardArea>
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <BuyCoverCardArea>
                <BuyCoverCardNameArea>
                  <BuyCoverLogo src="https://app.insurace.io/asset/token/usdc.png"></BuyCoverLogo>
                  <TitleText>USD Capacity</TitleText>
                </BuyCoverCardNameArea>
                <BuyCoverProgressArea sx={{ flexGrow: 1 }}>
                  <BorderLinearProgress variant="determinate" value={50} />
                  <BuyCoverProgressFooterArea>
                    <DetailText>1,601.0114 (used)</DetailText>
                    <DetailText>(total) 3,848.5296</DetailText>
                  </BuyCoverProgressFooterArea>
                </BuyCoverProgressArea>
              </BuyCoverCardArea>
            </Grid>
            <Grid item xs={12} md={4}>
              <BuyCoverCardArea>
                <BuyCoverCardNameArea>
                  <BuyCoverLogo src="https://app.insurace.io/asset/token/usdc.png"></BuyCoverLogo>
                  <TitleText>USD Capacity</TitleText>
                </BuyCoverCardNameArea>
                <BuyCoverProgressArea sx={{ flexGrow: 1 }}>
                  <BorderLinearProgress variant="determinate" value={50} />
                  <BuyCoverProgressFooterArea>
                    <DetailText>1,601.0114 (used)</DetailText>
                    <DetailText>(total) 3,848.5296</DetailText>
                  </BuyCoverProgressFooterArea>
                </BuyCoverProgressArea>
              </BuyCoverCardArea>
            </Grid> */}
          </Grid>
        </Box>
      </BuyCoverHeadArea>
    </>
  );
};

export default TopSection;
