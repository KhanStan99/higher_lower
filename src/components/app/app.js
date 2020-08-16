import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./app.css";
import Item from "../items/item";
import purple from "@material-ui/core/colors/purple";
import blue from "@material-ui/core/colors/blue";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: purple[400],
      },
      secondary: {
        main: blue[600],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Item />
    </ThemeProvider>
  );
}

export default App;
