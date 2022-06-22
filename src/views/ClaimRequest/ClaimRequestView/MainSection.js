import React, { useState, useEffect } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import useGetPolicyForDropdown from "../../../hooks/useGetPolicyForDropdown";
import useRequestClaim from "../../../hooks/useRequestClaim";
import axios from "axios";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { ethers, ContractFactory } from "ethers";
import Web3 from "web3";
import moment from "moment";
import { config } from "../../../config";
import PreviewIcon from "@mui/icons-material/Preview";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";
import useGetNetworks from "../../../hooks/useGetNetworks";

let provider;
let web3;

const ApplyArea = styled("div")(({ theme }) => ({
    marginTop: "5%",
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingBottom: "5%",

    [theme.breakpoints.down("sm")]: {},
}));

const ApplyLeftArea = styled("div")(({ theme }) => ({
    background: "#caecdf url(applyforpool/bg-bridge.png) no-repeat top",
    backgroundSize: "cover",
    padding: "20px",
    borderRadius: "8px",
    backgroundPositionX: "100%",
    backgroundPositionY: "100%",
    minHeight: "100vh",
    width: "85%",
    height: "auto",
    [theme.breakpoints.down("sm")]: {},
}));
const DatePickerArea = styled(FormControl)(({ theme }) => ({
    // marginTop: "15px",
    marginBottom: "10px",
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

const SelectCurrency = styled(TextField)(({ theme }) => ({
    marginTop: "8px",

    [theme.breakpoints.down("sm")]: {},
}));

async function SendFiles(file) {
    let formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(`${config.urlUploadFile}/uploadFile`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

async function sendObject(data) {
    // let base64Data = await getBase64(file);

    // console.log(base64Data);

    const response = await axios.post(`http://165.22.109.117:8081/uploadObject`, {
        data,
    });

    return response.data;
}
function makeFileType(fileName) {
    var parts = fileName.split(".");
    return parts[parts.length - 1];
}
function getFileType(fileName) {
    var ext = makeFileType(fileName);
    switch (ext.toLowerCase()) {
        case "jpg":
            return "image";
        case "jpeg":
            return "image";
        case "gif":
            return "image";
        case "bmp":
            return "image";
        case "png":
            return "image";
        case "m4v":
            return "video";
        case "avi":
            return "video";
        case "mpg":
            return "video";
        case "mp4":
            return "video";
        case "zip":
            return "zip";
        //etc
    }
    return "other";
}

const RenderAfterSectedPolicy = (props) => {
    const router = useRouter();
    const { isSelectedPool, policyData, accountAddress } = props;
    const [lossEvent, setLossEvent] = React.useState(null);
    const [fileValue, setFileValue] = React.useState(null);
    const [fileUrl, setFileUrl] = React.useState(null);
    const [fileName, setFileName] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState("Inprogress...");
    const [values, setValues] = React.useState({
        lossEvent: "",
        lossAmount: "450",
        claimAmount: "500",
        description: "รายละเอียดการ request claim",
        topic: "ทดสอบ request claim",
    });
    const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
    const [networksAvailable, setNetworksAvailable] = useState([]);
    const [networksIsInit, setNetworksIsInit] = useState(false);
    let networks = useGetNetworks();
    if (networks.message === undefined) {
        if (!networksIsInit) {
            setNetworksIsInit(true);
            setNetworksAvailable(networks);
        }
    }

    const getNetworksId = (chainId) => {
        if (networksAvailable.length > 0) {
            if (networksAvailable.some((item) => item === Number(chainId))) {
                return parseInt(chainId, 16);
            } else {
                return config.networkId;
            }
        } else {
            return config.networkId;
        }
    };

    const today = moment();
    const untilDate = moment(policyData?.endPeriodDay);
    const handleEventChange = (event) => {
        setLossEvent(event.target.value);
    };

    const handleInputChange = (prop) => (event) => {
        if (prop === "claimAmount") {
            if (policyData.remainClaim >= event.target.value) {
                setValues({ ...values, [prop]: event.target.value });
            }
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    };

    const RenderPreviewFile = (fileUrl, fileName) => {
        if (fileUrl != null && fileName !== null) {
            return (
                <div>
                    <TitleRightArea>Reference Report:</TitleRightArea>
                    <LabelRightArea>Drag or choose your file to upload</LabelRightArea>
                    <BrowseFileArea>
                        <FileUploadLabel
                            style={{
                                display: "flex",
                                position: "relative",
                                flexDirection: "column",
                                marginTop: "15px",
                                marginBottom: "15px",
                                padding: "15px",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                }}
                            >
                                <a>
                                    <ClearIcon
                                        style={{
                                            color: "#000",
                                            cursor: "pointer",
                                            marginLeft: "5px",
                                        }}
                                        onClick={() => clearFile()}
                                    ></ClearIcon>
                                </a>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <CloudUploadIcon></CloudUploadIcon>
                                <a
                                    target="_blank"
                                    href={fileUrl}
                                    style={{
                                        fontSize: "14px",
                                        marginLeft: "5px",
                                        marginBottom: "2px",
                                    }}
                                    rel="noopener noreferrer"
                                >
                                    {fileName}
                                </a>
                            </div>
                        </FileUploadLabel>
                    </BrowseFileArea>
                </div>
            );
        } else {
            return (
                <div>
                    <TitleRightArea>Reference Report:</TitleRightArea>
                    <LabelRightArea>Drag or choose your file to upload</LabelRightArea>
                    <BrowseFileArea>
                        <InputfileCustom name="file" id="file" type="file" data-multiple-caption="{count} files selected" multiple="" onChange={handleFileChange}></InputfileCustom>
                        <FileUploadLabel for="file" title="No File Choosen">
                            <CloudUploadIcon fontSize="large"></CloudUploadIcon>
                            <TextCenter>Choose a File</TextCenter>
                            <p>
                                <TextCenter>PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.</TextCenter>
                            </p>
                        </FileUploadLabel>
                    </BrowseFileArea>
                </div>
            );
        }
    };

    const clearFile = async () => {
        setFileValue(null);
        setFileUrl(null);
        setFileName(null);
    };

    const handleFileChange = async (event) => {
        if (event.target.files[0]) {
            setFileValue(event.target.files[0]);

            const fileResponse = await SendFiles(event.target.files[0]);
            setFileUrl(`https://ipfs.covest.finance/ipfs/${fileResponse}`);
            setFileName(event.target.files[0].name);
        }
    };

    const handleLoading = (topic, policyData, amount, lossAmount, description, file, userAddress) => {
        setIsLoading(true);
        RequestClaim(topic, policyData, amount, lossAmount, description, file, userAddress);
    };
    const handleClose = (event, reason) => {
        if (reason && reason == "backdropClick") return;
        myCloseModal();
    };

    async function RequestClaim(topic, policyData, amount, lossAmount, description, file, userAddress) {
        let chainId = await getNetworksId(connectedChain?.id);
        const response = await useRequestClaim(
            {
                topic: topic,
                amount: amount,
                lossAmount: lossAmount,
                description: description,
                file: file,
            },
            policyData.policyId,
            policyData.poolId,
            policyData.coverageName,
            userAddress,
            policyData.assetAddress,
            policyData.assetName,
            web3,
            chainId,
        );
        //setMessage(response.message);
        // setIsLoading(false);
        router.push("/myclaim");
    }

    if (isSelectedPool == true) {
        var end_date = untilDate.add("days", 0); //today < untilDate ? today : untilDate.add("days", 0);
        var start_date = moment(policyData.startPeriodDay).add("days", 1);

        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextFieldCustom label="Topic" placeholder="e. g. “0.00”" variant="outlined" value={values.topic} onChange={handleInputChange("topic")} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextFieldCustom
                            id="filled-multiline-flexible"
                            label="Description"
                            placeholder="e. g. “After purchasing the product you can get item...”"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={values.description}
                            onChange={handleInputChange("description")}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextFieldCustom label="Loss Amount" placeholder="e. g. “0.00”" variant="outlined" value={values.lossAmount} onChange={handleInputChange("lossAmount")} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextFieldCustom label="Claim Amount" placeholder="e. g. “0.00”" variant="outlined" value={values.claimAmount} onChange={handleInputChange("claimAmount")} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DatePicker
                                    label="Loss Event Time"
                                    renderInput={(params) => <TextField {...params} />}
                                    value={lossEvent}
                                    onChange={(newValue) => {
                                        setLossEvent(newValue);
                                    }}
                                    minDate={start_date}
                                    maxDate={end_date}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                </Grid>

                {RenderPreviewFile(fileUrl, fileName)}

                <FormControl fullWidth>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" href="/myclaim">
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={() => handleLoading(values.topic, policyData, values.claimAmount, values.lossAmount, values.description, fileValue, accountAddress)}>
                                Submit Item
                            </Button>
                        </Stack>
                    </Grid>
                </FormControl>

                <Modal open={isLoading} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <p>
                            {" "}
                            <CircularProgress />
                        </p>
                        <p style={{ fontSize: "20px" }}>{message}</p>
                    </Box>
                </Modal>
            </div>
        );
    } else {
        return <div></div>;
    }
};

async function GetPolicyData(account) {
    let poolData = await useGetPolicyForDropdown(undefined, account);

    if (!poolData?.message) {
        return poolData;
    } else {
        return null;
    }
}

const MainSection = () => {
    const theme = useTheme();
    const [isSelectedPool, setIsSelectedPool] = React.useState(false);
    const [poolId, setPoolId] = React.useState("all");
    const [poolIdNow, setPoolIdNow] = React.useState("");
    const [policyData, setPolicyData] = React.useState([]);
    const [initListPolicies, setInitListPolicies] = React.useState(false);
    const connectedWallets = useWallets();

    const [account, setAccount] = React.useState(null);
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

    async function GetAccount() {
        const accountData = connectedWallets[0]?.accounts[0]?.address;

        if (accountData != undefined || accountData != null || accountData != "0x0000000000000000000000000000000000000000") {
            setAccount(accountData);
        }
    }

    useEffect(() => {
        if (!wallet?.provider) {
            provider = null;
            web3 = null;
        } else {
            // console.log(wallet.provider);
            provider = new ethers.providers.Web3Provider(wallet.provider, "any");

            web3 = new Web3(wallet.provider);
        }
    }, [wallet, account]);

    useEffect(() => {
        GetAccount();
    }, [connectedWallets]);

    const handleChange = (event) => {
        setPoolId(event.target.value);
        if (poolId != "all") {
            setIsSelectedPool(false);
        } else {
            setIsSelectedPool(true);
        }
    };
    function getStyles(name, poolId, theme) {
        return {
            fontWeight: poolId.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        };
    }

    const callDataPolicies = async () => {
        let poolData = await GetPolicyData(account);
        if (account && account.length === 42 && poolData) {
            //let poolData = GetPolicyData(account);
            // console.log("poolData IF");
            // console.log(poolData);
            // setInitListPolicies(true);
            console.log(poolData);
            setPolicyData(poolData);

            if (poolId != "all" && poolData != null && poolData != undefined) {
                setPolicyData(poolData.filter((item) => item.poolId == poolId));
            }
        }
    };

    if (policyData.length == 0 && account) {
        callDataPolicies();
    } else {
        let poolData = policyData;
        if (poolId != "all" && poolId !== poolIdNow && poolData != null && poolData != undefined) {
            setPolicyData(poolData.filter((item) => item.poolId == poolId));
            setPoolIdNow(poolId);
        }
    }

    if (policyData != undefined && policyData.length >= 0 && account) {
        ฌ;
        return (
            <ApplyArea>
                <h4>Claim Request</h4>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ApplyLeftArea></ApplyLeftArea>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormRightArea>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Cover</InputLabel>
                                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={poolId} label="Cover" onChange={handleChange}>
                                                <MenuItem key={0} value={"all"} style={getStyles("all", poolId, theme)}>
                                                    All
                                                </MenuItem>
                                                {policyData.map((pool) => (
                                                    <MenuItem
                                                        key={pool.poolId}
                                                        value={pool.poolId}
                                                        style={getStyles(pool.coverageName, poolId, theme)}
                                                        disabled={pool.claimPending !== 0 || pool.remainClaim === 0 ? true : false}
                                                    >
                                                        {pool.coverageName} {pool.claimPending !== 0 ? "[Pending]" : ""}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <RenderAfterSectedPolicy isSelectedPool={isSelectedPool} policyData={policyData[0]} accountAddress={account}></RenderAfterSectedPolicy>
                            </FormRightArea>
                        </Grid>
                    </Grid>
                </Box>
            </ApplyArea>
        );
    } else {
        return <div></div>;
    }
};

export default MainSection;
