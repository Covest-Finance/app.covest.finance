import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "next/link";

const Hero = styled("div")(({ theme }) => ({
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
        minHeight: "70vh",
        flexDirection: "column",
        height: "unset",
    },
}));
const HeroLeftArea = styled("div")(({ theme }) => ({
    width: "40%",
    padding: "1.5rem",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));
const HeroRightArea = styled("div")(({ theme }) => ({
    width: "35%",
    padding: "1.5rem",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));
const HeroHeaderText = styled("h2")(({ theme }) => ({
    fontSize: "60px",
    fontWeight: 400,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
        fontSize: "45px",
        fontWeight: 400,
    },
}));
const HeroSubHeadText = styled("p")(({ theme }) => ({
    fontSize: "22px",
    color: "#acacac",
    [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
        color: "#acacac",
    },
}));
const HeroPrimaryButton = styled(Button)(({ theme }) => ({
    padding: "15px 34px",
    backgroundColor: "#00a3ff",
    fontWeight: 500,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
        padding: "8px 34px",
        lineHeight: "1.2rem",
    },
}));
const HeroSecondaryButton = styled(Button)(({ theme }) => ({
    padding: "15px 34px",
    backgroundColor: "#212e48",
    fontWeight: 500,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
        padding: "8px 34px",
        lineHeight: "1.2rem",
    },
}));
const HeroImage = styled("img")(({ theme }) => ({
    width: "100%",
    height: "auto",
    verticalAlign: "middle",
}));

const HeroButtonArea = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
    },
}));

export default function Home() {
    return (
        <Hero>
            <HeroLeftArea>
                <HeroHeaderText>Decentralized Risk Sharing Network</HeroHeaderText>
                <HeroSubHeadText>cost-effective and people-powered insurance products</HeroSubHeadText>
                <HeroButtonArea spacing={2} direction="row">
                    <Link href="https://docs.covestfinance.org/" passHref>
                        <HeroPrimaryButton variant="contained" size="large">
                            Documentations
                        </HeroPrimaryButton>
                    </Link>

                    <HeroSecondaryButton variant="contained" size="large">
                        Get Coverage
                    </HeroSecondaryButton>
                </HeroButtonArea>
            </HeroLeftArea>
            <HeroRightArea>
                <HeroImage src="landing/hero.png"></HeroImage>
            </HeroRightArea>
        </Hero>
    );
}
