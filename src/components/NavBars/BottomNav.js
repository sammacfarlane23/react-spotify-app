import { useState } from "react";
import { Link } from "@reach/router";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import navConfig from "./config";

const BottomNav = () => {
  const [value, setValue] = useState("artists");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        {navConfig.map(({ href, title, value, icon }, index) => (
          <BottomNavigationAction
            key={title}
            label={title}
            component={Link}
            to={href}
            {...{ value, icon }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
