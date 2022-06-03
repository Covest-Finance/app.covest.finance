import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

import useGetPool from "../../../hooks/useGetPool";

const columns = [
    { id: "index", label: "No." },
    { id: "policyId", label: "Policy ID", align: "left" },
    {
        id: "coverageName",
        label: "Coverage Name",
        align: "left",
    },
    {
        id: "coveragePeriod",
        label: "Coverage Period",
        align: "left",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "maxCoverage",
        label: "Max Coverage",
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "totalClaimPaid",
        label: "Total Claim Paid ",
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "status",
        label: "Status",
    },
];
const CoverToolbarArea = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function TableSection(props) {
    const { data } = props;
    let policyData = data;
   
    const [poolId, setPoolId] = React.useState("all");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const poolData = useGetPool();

    const EnhancedTableToolbar = (props) => {
        const theme = useTheme();

        const HandleChange = (event) => {
            const {
                target: { value },
            } = event;
            setPoolId(typeof value === "string" ? value.split(",") : value);
        };

        function getStyles(name, poolId, theme) {
            return {
                fontWeight: poolId.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
            };
        }

        return (
            <div>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}
                >
                    <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
                        My Policies
                    </Typography>
                </Toolbar>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}
                >
                    <CoverToolbarArea>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">pool</InputLabel>
                            <Select labelId="demo-multiple-name-label" id="demo-multiple-name" value={poolId} onChange={HandleChange} input={<OutlinedInput label="Name" />} MenuProps={MenuProps}>
                                <MenuItem key={0} value={"all"} style={getStyles("all", poolId, theme)}>
                                    All
                                </MenuItem>
                                {poolData.map((pool, index) => (
                                    <MenuItem key={index} value={pool.poolId} style={getStyles(pool.name, poolId, theme)}>
                                        {pool.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant="contained" href="/pool">
                            Get Insured
                        </Button>
                    </CoverToolbarArea>
                </Toolbar>
            </div>
        );
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (poolId != "all") {
        policyData = data.filter((item) => item.poolId == poolId);
    }

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <EnhancedTableToolbar />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell key={index} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {policyData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column, index) => {
                                        const value = row[column.id];

                                        return (
                                            <TableCell key={index} align={column.align}>
                                                {column.format && typeof value === "number" ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={policyData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
