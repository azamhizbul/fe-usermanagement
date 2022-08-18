import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Collapse, List } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Link from "next/link";
import { useState } from "react";

export const MainListItems = () => {
  const [openUser, setOpenUser] = useState(false);
  return (
    <>
    <Link href={'/'}>
    <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon sx={{ color: "#9FA2A8" }} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      </Link>

      <ListItemButton onClick={() => setOpenUser(!openUser)}>
        <ListItemIcon>
          <DashboardIcon sx={{ color: "#9FA2A8" }} />
        </ListItemIcon>
        <ListItemText primary="User" />
        {openUser ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openUser} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href={'/users'}>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon sx={{ color: "#9FA2A8" }}>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="List User" />
          </ListItemButton>
          </Link>
        </List>
      </Collapse>
      
    </>
  );
};

export const secondaryListItems = (
  <>
    <ListSubheader
      component="div"
      inset
      sx={{ backgroundColor: "#0d121e", color: "#9FA2A8" }}
    >
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </>
);
