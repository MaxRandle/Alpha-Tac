import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./Index.scss";
import BoardStateContextProvider from "./contexts/BoardStateContext";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: red[500]
//     },
//     secondary: {
//       main: grey[50]
//     }
//   }
// });

// <ThemeProvider theme={theme}></ThemeProvider>

ReactDOM.render(
  <BoardStateContextProvider>
    <App />
  </BoardStateContextProvider>,
  document.getElementById("root")
);
