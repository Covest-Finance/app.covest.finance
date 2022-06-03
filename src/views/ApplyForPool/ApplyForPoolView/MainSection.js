import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const ApplyArea = styled("div")(({ theme }) => ({
    marginTop: "5%",
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingBottom: "5%",

    [theme.breakpoints.down("sm")]: {},
}));

const ApplyLeftArea = styled("div")(({ theme }) => ({
    width: "85%",
    background: "#caecdf url(applyforpool/bg-bridge.png) no-repeat top",
    backgroundSize: "cover",
    padding: "20px",
    borderRadius: "8px",
    minHeight: "120vh",
    [theme.breakpoints.down("sm")]: {},
}));
const H5Head = styled("h5")(({ theme }) => ({
    fontSize: "22px",
    color: "#515a6e",

    [theme.breakpoints.down("sm")]: {},
}));
const LinkText = styled(Link)(({ theme }) => ({
    fontSize: "18px !important",
    color: "#1db371 !important",

    [theme.breakpoints.down("sm")]: {},
}));
const DetailText = styled("p")(({ theme }) => ({
    fontSize: "18px ",
    marginTop: "3rem",

    [theme.breakpoints.down("sm")]: {},
}));
const ApplyRightArea = styled("div")(({ theme }) => ({
    width: "100%",

    [theme.breakpoints.down("sm")]: {},
}));
const FormRightArea = styled("div")(({ theme }) => ({
    padding: "40px 35px",
    borderRadius: "6px",
    height: "100%",
    border: "1px solid #ffffff14",
    boxShadow: "0 6px 25px 0 rgb(80 129 244 / 10%)",

    [theme.breakpoints.down("sm")]: {},
}));
const TitleRightArea = styled("h6")(({ theme }) => ({
    fontSize: "16px",
    fontWeight: "400",
    marginBottom: "10px",

    [theme.breakpoints.down("sm")]: {},
}));
const LabelRightArea = styled("p")(({ theme }) => ({
    fontSize: "14px",
    color: "#403d3d",

    [theme.breakpoints.down("sm")]: {},
}));

const BrowseFileArea = styled("p")(({ theme }) => ({
    position: "relative",
}));
const InputfileCustom = styled("input")(({ theme }) => ({
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0,
    cursor: "pointer",
}));

const FeatherUpload = styled("i")(({ theme }) => ({
    fontSize: "40px",
    strokeWidth: "1px",
    color: "##00a3ff",
    marginBottom: "10px",
}));

const TextCenter = styled("span")(({ theme }) => ({
    textAlign: "center",
}));

const FileUploadLabel = styled("label")(({ theme }) => ({
    border: "1px dashed rgba(87, 87, 87, 0.452)",
    width: "100%",
    height: "200px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    flexDirection: "column",
    marginBottom: "15px",
}));

const TextFieldCustom = styled(TextField)(({ theme }) => ({
    marginTop: "8px",
    marginBottom: "8px",
    width: "100%",
}));

const CheckBoxLabel = styled(FormControlLabel)(({ theme }) => ({
    fontSize: "12px",
    lineHeight: "17px",
    fontWeight: 400,
    paddingLeft: "25px",
}));
const MainSection = () => {
    return (
        <ApplyArea>
            <h4>Apply as Member of the pool</h4>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <ApplyLeftArea>
                            <H5Head>Bridge</H5Head>
                            <p>
                                <LinkText href="" passHref>
                                    My Transactions
                                </LinkText>
                            </p>
                            <p>
                                {" "}
                                <LinkText href="" passHref>
                                    All Transactions
                                </LinkText>
                            </p>
                            <p>
                                <LinkText href="" passHref>
                                    Proof of Assets
                                </LinkText>
                            </p>

                            <DetailText>
                                InsurAce.io Bridge provides bridge services, allowing users to transfer $INSUR tokens across Ethereum, Binance Smart Chain, Polygon and Avalanche. When using the bridge
                                service, please provide the correct wallet address to receive the tokens. We will not be responsible for token loss due to the wrong wallet address provided.To get
                                started, please read User Guide.
                            </DetailText>
                        </ApplyLeftArea>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormRightArea>
                            <TitleRightArea>Upload file</TitleRightArea>
                            <LabelRightArea>Drag or choose your file to upload</LabelRightArea>
                            <BrowseFileArea>
                                <InputfileCustom name="file" id="file" type="file" data-multiple-caption="{count} files selected" multiple=""></InputfileCustom>
                                <FileUploadLabel for="file" title="No File Choosen">
                                    <CloudUploadIcon fontSize="large"></CloudUploadIcon>
                                    <TextCenter>Choose a File</TextCenter>
                                    <p>
                                        <TextCenter>PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.</TextCenter>
                                    </p>
                                </FileUploadLabel>
                            </BrowseFileArea>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <Grid item xs={12} md={12}>
                                    <TextFieldCustom id="outlined-basic" label="Product Name" variant="outlined" placeholder="e. g. `Digital Awesome Game`" />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextFieldCustom
                                        id="filled-multiline-flexible"
                                        label="Description"
                                        placeholder="e. g. “After purchasing the product you can get item...”"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <TextFieldCustom id="outlined-basic" label="Item Price in $" variant="outlined" placeholder="e. g. `20$`" />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextFieldCustom id="outlined-basic" label="Size" variant="outlined" placeholder="e. g. Size" />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextFieldCustom id="outlined-basic" label="Number of Copies" variant="outlined" placeholder="e. g. `Propertie`" />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextFieldCustom id="filled-multiline-flexible" label="Royality" placeholder="e. g. `20%`" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Transfer Copyright When Purchased?" />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={2} direction="row">
                                        <Button variant="contained">Preview</Button>
                                        <Button variant="contained">Submit Item</Button>
                                    </Stack>
                                </Grid>
                            </FormControl>
                        </FormRightArea>
                    </Grid>
                </Grid>
            </Box>
        </ApplyArea>
    );
};

export default MainSection;
