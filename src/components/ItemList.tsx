import React from "react";
import Box from "@mui/material/Box";

import ItemImage from "./ItemImage";

type ItemListProps = {
  topList: SpotifyApi.TrackObjectFull[] | SpotifyApi.AlbumObjectFull[];
};

const ItemList = ({ topList }: ItemListProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      {topList.map((topItem, index) => {
        return (
          <ItemImage
            key={topItem.id}
            item={topItem}
            index={index}
          />
        );
      })}
    </Box>
  );
};

export default ItemList;
