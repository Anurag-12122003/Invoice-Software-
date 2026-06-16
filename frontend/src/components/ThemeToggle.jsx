import { useContext } from "react";
import { ThemeContext } from "../utils/Context/ThemeContext";
import { Box, Typography } from "@mui/material";
import { GoSun } from "react-icons/go";
import { BsMoonStars } from "react-icons/bs";

export const ThemeToggle = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  //   return (
  //     <Button
  //       variant="contained"
  //       onClick={toggleTheme}
  //       startIcon={<BsMoonStars color="#BDC0C6" />}
  //       sx={{
  //         position: "absolute",
  //         top: "4px",
  //         right: "4px",
  //         borderRadius: "20px",
  //         boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.3)",
  //         color: mode === "light" ? "#BDC0C6" : "#BDC0C6",
  //         fontWeight: "bold",
  //         "&::before": {
  //             content: '"red"',
  //             position: "absolute",
  //             left: "0",
  //             width: "32",
  //             height: "32",
  //             borderRadius: "50%",
  //             backgroundColor: "red"
  //         }
  //       }}
  //     >
  //       {mode === "light" ? "Dark Mode" : "Light Mode"}
  //     </Button>
  //   );

  return (
    <Box
      onClick={toggleTheme}
      sx={{
        // border: "2px solid",
        // borderBottomColor: "white",
        // borderRightColor: "white",
        // borderLeftColor: "#D3D7DC",
        // borderTopColor: "#D3D7DC",
        width: 96,
        height: 42,
        borderRadius: "45px",
        position: "absolute",
        top: 10,
        right: 5,
        cursor: "pointer",
        backgroundColor: mode === "light" ? "#3D4450" : "#EEF0F2",
        boxShadow:
          mode === "light"
            ? `inset 6px 6px 9px 1px rgba(0, 0, 0, 1)`
            : `inset 6px 6px 9px 1px rgba(171, 175, 182, 1)`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 5,
          left: mode === "light" ? 5 : 60,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "linear-gradient(to bottom, #F1F3F4, #EDEFF1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all .45s ease",
          zIndex: 2,
          boxShadow: `inset 0 2px rgba(255, 255, 255, 1), inset 0 -2px rgba(211, 215, 220, 1), inset 2px 0 0 rgba(255, 255, 255, 1), inset -2px 0 rgba(211, 215, 220, 1)`,
        }}
      >
        {mode === "light" ? (
          <BsMoonStars size={18} color="#C5C9CE" />
        ) : (
          <GoSun size={18} color="#65707D" />
        )}
      </Box>

      <Box
        sx={{
          //   border: "1px solid green",
          position: "absolute",
          top: 6,
          right: mode === "light" ? 12 : 48,
          display: "flex",
          alignItems: "center",
          justifyContent: mode === "light" ? "flex-end" : "flex-start",
          transition: "all .45s ease",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "bold",
            lineHeight: 1.3,
            color: mode === "light" ? "#D2D5DD" : "#65707D",
            transition: "all .45s ease",
          }}
        >
          {mode === "light" ? (
            <>
              DARK
              <br />
              MODE
            </>
          ) : (
            <>
              LIGHT
              <br />
              MODE
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
};
