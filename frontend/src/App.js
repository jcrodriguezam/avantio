import React from "react";
import "./App.css";
import Routes from "./routes/Routes";
import Header from "./components/Header";

// import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function App() {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          // mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: "#e93b56",
            light: "#e93b56a1",
            dark: "#c52c44",
          },
          secondary: {
            main: "#30d380",
            light: "#30d380b3",
            dark: "#7dd5a8",
          },
          tertiary: {
            main: "#fff",
            light: "#fff",
            dark: "#fff",
          },
          background: {
            default: "#231a32",
            paper: "#180f1e",
          },
        },
      }),
    []
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes />
      </ThemeProvider>
    </div>
  );
}
