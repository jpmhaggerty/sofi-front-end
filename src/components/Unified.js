import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TempDrawerChar from "./TempDrawerChar.js";
import Box from "@mui/material/Box";
import "../App.css";
import StickyHeadTable from "./StickyHeadTable.js";
import CardDetailsHousesAndOrders from "./CardDetailsHousesAndOrders.js";
import CardDetailsCharacters from "./CardDetailsCharacters.js";

function Unified({
  source,
  dataCard,
  dataGroup,
  dataTable,
  dataDrawer,
  tableColumns,
  handleChipClick,
  handleTableSort,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  let cardDetails;
  if (source === "house" || source === "order") {
    cardDetails = (
      <CardDetailsHousesAndOrders
        dataCard={dataGroup}
        handleChipClick={handleChipClick}
      />
    );
  } else {
    cardDetails = (
      <CardDetailsCharacters
        dataCard={dataCard}
        handleChipClick={handleChipClick}
      />
    );
  }

  //card will be populated based upon the first element in the array
  return (
    <body>
      <article>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ maxWidth: 290 }}>
            <CardHeader title={dataCard[0] ? dataCard[0].name : ""} />
            <CardMedia
              component="img"
              height="194"
              image={dataCard[0] ? dataCard[0].image : ""}
              alt={dataCard[0] ? dataCard[0].name : ""}
              onClick={(event) =>
                handleChipClick(
                  dataCard[0].name,
                  window.location.pathname.slice(1, -1)
                )
              }
            />
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>{cardDetails}</CardContent>
            </Collapse>
          </Card>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <TempDrawerChar
            match={dataDrawer}
            handleChipClick={handleChipClick}
          />
        </Box>
      </article>

      <main>
        <StickyHeadTable
          dataTable={dataTable}
          matchColumns={tableColumns}
          handleChipClick={handleChipClick}
          handleTableSort={handleTableSort}
          sx={{ display: "flex", alignItems: "center" }}
        ></StickyHeadTable>
      </main>
    </body>
  );
}

export default Unified;
