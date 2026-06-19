import { AppBar, Avatar, Box, Toolbar } from "@mui/material";
import logo from "../../assets/logo.png";

export const Header = () => {
  return (
    <AppBar sx={{ bgcolor: "custom.white" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component="div" sx={{ width: 40, height: 40 }}>
          <img src={logo} width="100%" />
        </Box>

        {/* For search */}
        {/* <Box>
        </Box> */}
        
        <Box>
          <Avatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
