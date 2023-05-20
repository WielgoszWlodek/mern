import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";

import { NavLink } from "react-router-dom";
const Header = () => {
  const [value, setValue] = useState();
  return (
    <div>
      <AppBar sx={{ backgroundColor: "#000066" }} position="sticky">
        <Toolbar>
          <NavLink to="/" style={{ color: "blue" }}>
  
          </NavLink> 
          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            
            <Tab LinkComponent={NavLink} to="/mainpage" label="Książki" />
            <Tab LinkComponent={NavLink} to="/users" label="Czytelnicy  " />
            <Tab LinkComponent={NavLink} to="/gridingrid" label="Stan" /> 
            <Tab LinkComponent={NavLink} to="/raport" label="Raporty" />
          
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;