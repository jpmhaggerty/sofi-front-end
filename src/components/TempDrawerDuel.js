import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import SimpleAccordion from "./SimpleAccordion.js";
import { Link } from "react-router-dom";

export default function TempDrawerDuel({ match, handleChipClick }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  //develop the list name from the page URI
  let listTitle =
    window.location.pathname.slice(1, 2).toUpperCase() +
    window.location.pathname.slice(2);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, match) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link
          to="/characters"
          style={{ textDecoration: "none", color: "black" }}
        >
          {/* Title */}

          <ListItem
            disablePadding
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <h3>{listTitle}</h3>
          </ListItem>
        </Link>
      </List>
      <List>
        <SimpleAccordion match={match} handleChipClick={handleChipClick} />
      </List>
      <Divider />
    </Box>
  );
  console.log(handleChipClick);

  return (
    <Box>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <h1 color="primary">See Full List</h1> */}

          {/* BUTTON CHANGE */}
          <Button variant="contained" onClick={toggleDrawer(anchor, true)}>
            Select Your Character
          </Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor, match)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}
