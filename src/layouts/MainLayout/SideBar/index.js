import * as React from "react";
import Link from "next/link";
import styled from "styled-components";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function SideBar() {
    const Logo = styled.img`
        max-height: 35px;
        object-fit: cover;
    `;

    const SideBarArea = styled(Box)(({ theme }) => ({
        backgroundColor: "#fff",
        height: "100vh",
        color: "#151521",
    }));
    const MenuItemArea = styled(ListItem)(({ theme }) => ({
        borderTop: "1px solid #e5e5ee",
    }));
    const MenuItemText = styled(ListItemText)(({ theme }) => ({
        color: "#acacac",
    }));
    const MenuHeadArea = styled(ListItem)(({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
    }));
    const MenuButtonArea = styled(MenuIcon)(({ theme }) => ({
        border: "1px solid #bababe",
        borderRadius: "50%",
        padding: "5px",
        fontSize: "21px",
        height: "40px",
        width: "40px",
    }));
    const [state, setState] = React.useState({ left: false });
    const anchor = "left";
    const listMenu = (anchor) => (
        <SideBarArea sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                <MenuHeadArea>
                    <Link href="/" passHref>
                        <Logo src="logo/logo-dark.png"></Logo>
                    </Link>
                    <CloseIcon onClick={toggleDrawer(anchor, false)}></CloseIcon>
                </MenuHeadArea>
                {[
                    { name: "", url: "/" },
                    { name: "Member", url: "/" },
                    { name: "Referral", url: "/referral" },
                    { name: "Insurance", url: "/" },
                    { name: "Underwriting", url: "/" },
                    { name: "Claim", url: "/" },
                    { name: "Statistic", url: "/" },
                    { name: "Swap", url: "/" },
                ].map((item, index) => (
                    <MenuItemArea button key={item.name}>
                        <Link href={item.url} passHref>
                            <MenuItemText primary={item.name} />
                        </Link>
                    </MenuItemArea>
                ))}
            </List>
        </SideBarArea>
    );
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            <MenuButtonArea onClick={toggleDrawer(anchor, true)} />
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {listMenu(anchor)}
            </Drawer>
        </div>
    );
}
