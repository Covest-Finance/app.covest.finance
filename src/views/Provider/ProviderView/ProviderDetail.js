import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import useGetProviderDetailApi from "../../../hooks/useGetProviderDetailApi";

const ProviderCardArea = styled("div")(({ theme }) => ({
  paddingLeft: "10px",
  paddingRight: "10px",
  [theme.breakpoints.down("sm")]: {},
}));

const ProviderCardInnerArea = styled("div")(({ theme }) => ({
  position: "relative",
  height: "260px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 0 5px #ccc",
  [theme.breakpoints.down("sm")]: {},
}));
const ProviderDetailTopArea = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "relative",
}));

const ProviderNameBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "0px",
  top: "-10px",
  padding: "3px 10px",
  backgroundColor: "#f0faff",
  color: "#168de2",
  border: "1px solid #abdcff",
  borderRadius: "10px",
  fontSize: "12px",
}));
const ProviderDetailContentArea = styled("div")(({ theme }) => ({
  position: "relative",
  height: "105px",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {},
}));
const ProviderDetailContentValueArea = styled("div")(({ theme }) => ({
  position: "relative",
  height: "260px",
  display: "flex",
  flexDirection: "row",
  marginTop: "10px",
}));
const ProviderDetailFooterArea = styled("div")(({ theme }) => ({
  position: "relative",
  height: "160px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginTop: "10px",
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
  fontSize: "12px",
  fontWeight: "400",
  marginLeft: "10px",
  lineHeight: "1px",
}));
const CurrentText = styled("label")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#168de2",
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
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const ProviderDetail = ({
  Id,
  name,
  percentPower,
  providerName,
  providerId,
  currentPower,
  maxPower,
  exchangeRateMIToken,
}) => {
  const detailUrl = "/mining?id=" + Id + "&providerId=" + providerId;

  return (
    <ProviderCardArea>
      <ProviderCardInnerArea>
        <ProviderDetailTopArea>
          <Box>
            <InsuranceName>{name}</InsuranceName>
            <SmallDetailName>{Id}</SmallDetailName>
          </Box>
          <ProviderNameBox>{providerName}</ProviderNameBox>
        </ProviderDetailTopArea>

        <ProviderDetailContentArea>
          <BoxMIToken>
            <BoxMITokenValueText>{exchangeRateMIToken}$ </BoxMITokenValueText>
            <BoxMITokenUnitText> / MI Token</BoxMITokenUnitText>
          </BoxMIToken>
          <Box sx={{ flexGrow: 1 }}>
            <BorderLinearProgress variant="determinate" value={percentPower} />
          </Box>
          <ProviderDetailContentValueArea>
            <CurrentText>
              {currentPower}
              <MaxValueText> /{maxPower} MI Tokens</MaxValueText>
            </CurrentText>
          </ProviderDetailContentValueArea>
        </ProviderDetailContentArea>
        <ProviderDetailFooterArea>
          <Button variant="contained" size="large" href={detailUrl}>
            Mining
          </Button>
          {/* <Button variant="contained" size="large" href="/swap">
            Swap
          </Button> */}
          <Button variant="contained" size="large" href="/swap">
            Stake
          </Button>
        </ProviderDetailFooterArea>
      </ProviderCardInnerArea>
    </ProviderCardArea>
  );
};

export default ProviderDetail;
