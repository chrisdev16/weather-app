import { Container, CssBaseline, Typography } from "@mui/material";
import { useContext } from "react";
import { LayoutContext } from "../Services/DefaultLayoutContext";

const DefaultLayout = ({ children }) => {
  const { bgImage } = useContext(LayoutContext);

  return (
    <>
      <CssBaseline />
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Typography
          variant="h3"
          style={{
            color: "#FFF",
            marginTop: 0,
            padding: "30px 0",
            textAlign: "center",
          }}
        >
          Weather Summary App
        </Typography>
        {children}
      </Container>
    </>
  );
};

export default DefaultLayout;
