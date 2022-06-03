import React, { useEffect, useState } from "react";
import useGetProvider from "../../../hooks/useGetProvider";
import useGetInsurance from "../../../hooks/useGetInsurance";
import Button from "@mui/material/Button";
import ProviderDetail from "./ProviderDetail";

import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";

const ProviderArea = styled("div")(({ theme }) => ({
    marginTop: "2%",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingLeft: "16px",
    paddingRight: "16px",
}));
const TabsList = styled(Tab)`
    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
        font-size: 16px;
        font-weight: 600;
        border: 1px solid #ccc;
        color: #000;
        background-color: #ccc;
    }
`;
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const CreateProviderTabDetail = (provider) => {
    const insuranceDataDetail = useGetInsurance(undefined, provider.provider.providerValue);
    const modLength = 12 / insuranceDataDetail.length;
    const insuranceCountGrid = insuranceDataDetail.length <= 3 ? modLength : 3;

    return (
        <Grid container spacing={2}>
            {insuranceDataDetail?.map((insurance, indexInsurance) => (
                <Grid key={insurance.id} item xs={12} md={insuranceCountGrid}>
                    <ProviderDetail
                        Id={insurance.contractAddress}
                        name={insurance.name}
                        imgUrl={insurance.logoUrl}
                        providerName={provider.provider.productType}
                        providerId={provider.provider.providerValue}
                        currentPower={insurance.currentPower}
                        maxPower={insurance.maxPower}
                        percentPower={insurance.percentPower}
                        exchangeRateMIToken={insurance.exchangeRateMIToken}
                    ></ProviderDetail>
                </Grid>
            ))}
        </Grid>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const CreateTabProvider = () => {
    const providerData = useGetProvider();

    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //Mui-disabled

    return (
        <>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {providerData?.map((provider, index) => (
                    <TabsList disabled={provider.disabledProp} key={index} label={provider.productType} {...a11yProps({ index })} />
                ))}
            </Tabs>

            {providerData.map((provider, panelIndex) => (
                <TabPanel key={panelIndex} value={value} index={panelIndex}>
                    <Box sx={{ flexGrow: 1 }}>
                        <CreateProviderTabDetail provider={provider}></CreateProviderTabDetail>
                        {/* {insuranceData?.map((insurance, indexInsurance) => (
                <Grid key={insurance.id} item xs={12} md={insuranceCountGrid}>
                  <ProviderDetail
                    Id={insurance.contractAddress}
                    name={insurance.name}
                    imgUrl={insurance.logoUrl}
                    providerName={provider.productType}
                    providerId={provider.id}
                  ></ProviderDetail>
                </Grid>
              ))} */}
                    </Box>
                </TabPanel>
            ))}
        </>
    );
};

const MainContent = () => {
    return (
        <ProviderArea>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <CreateTabProvider></CreateTabProvider>
            </Box>
        </ProviderArea>
    );
};

export default MainContent;
