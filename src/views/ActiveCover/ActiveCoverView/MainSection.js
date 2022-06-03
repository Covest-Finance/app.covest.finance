import * as React from "react";
import { styled } from "@mui/material/styles";

import useGetPolicy from "../../../hooks/useGetPolicy";
import TableSection from "./TableSection";

const CoverTableArea = styled("div")(({ theme }) => ({
    width: "100%",
    color: "#ffff",
    paddingRight: "3rem",
    paddingLeft: "3rem",
    marginTop: "2rem",

    [theme.breakpoints.down("sm")]: {},
}));

export default function MainSection() {
    const policyData = useGetPolicy(undefined);

    const rows = policyData?.listData;

    console.log(rows);

    if (rows != undefined) {
        return (
            <CoverTableArea>
                <TableSection data={rows}></TableSection>
            </CoverTableArea>
        );
    } else {
        return <></>;
    }
}
