import { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import listify from "listify";

const ItemImage = ({ item, index, src, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const artistNames = item.artists?.map(({ name }) => name);
  const artists = item.artists ? `by ${listify(artistNames)}` : "";
  const description =
    index !== undefined
      ? `${index + 1}. ${item.name} ${artists}`
      : `${item.name} ${artists}`;

  const descriptionIsTooLong = description.length > 45;

  const truncatedDescription = descriptionIsTooLong
    ? `${description.slice(0, 45)}...`
    : description;

  return (
    <Link
      className={className}
      href={item.external_urls.spotify}
      style={{ background: "transparent" }}
      sx={{ color: "#fff", textDecoration: "none" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 130,
          height: 130,
          backgroundSize: "cover",
          m: { xs: "0 0.3rem", md: 0 },
        }}
        style={{
          backgroundImage: `url(${src})`,
          transition: "background 600ms ease-in 500ms",
        }}
      />
      <Typography
        paragraph={true}
        sx={{
          p: 1,
          m: 0,
          maxWidth: 130,
          textAlign: "center",
          fontWeight: "500",
        }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {truncatedDescription}
      </Typography>
      {descriptionIsTooLong && (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
            backgroundColor: "grey",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Box sx={{ maxWidth: 500, backgroundColor: "grey" }}>
            <Typography sx={{ p: 1, color: "black" }}>{description}</Typography>
          </Box>
        </Popover>
      )}
    </Link>
  );
};

export default ItemImage;
