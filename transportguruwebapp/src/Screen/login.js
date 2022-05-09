import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Image from "../Contents/Images";
import SignInWithPhone from "../Components/SignInWithPhone";
import SignIn from "../Components/SignIn";
import Box from "@mui/material/Box";
import icons from "../Contents/icons";
import colors from "../Contents/colors";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme();
const Login = () => {
  const [emailBox, setEmailBox] = React.useState(true)
  const sendEmail = (val) => {
    console.log("my email :", val)
  }
  const sendSms = (val) => {
    console.log("my sms :", val)
  }
  return (
    <ThemeProvider theme={theme} >
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid

          xs={false}
          sm={false}
          md={6}
          sx={{
            backgroundImage: `url(${Image.transport})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
          }}
        />
        <Grid xs={12} sm={7} md={6}>
          <Container
            component="main"
            maxWidth={"sm"}
            sx={{ justifyContent: "center" }}
          >
            <CssBaseline />
            {emailBox ?
              <SignIn onSendEmail={(val) => { sendEmail(val) }} /> :
              <SignInWithPhone onSendSms={(val) => { sendSms(val) }} />}
            <Divider>Or</Divider>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid
                container
                xs={10}
                sm={8}
                sx={{
                  border: `1px solid #4185F4`,
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "5px",
                }}
              >
                <Grid
                  xs={2}
                  sm={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src={icons.google} alt="" width={35} height={35} />
                </Grid>
                <Grid
                  xs={10}
                  sm={10}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#4185F4",
                    color: "white",
                  }}
                >
                  Sign In with Google
                </Grid>
              </Grid>
            </Box>
            {emailBox ?
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => setEmailBox(false)}
              >
                <Grid
                  container
                  xs={10}
                  sm={8}
                  sx={{
                    border: `1px solid ${colors.primaryColors}`,
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  <Grid
                    xs={2}
                    sm={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img src={icons.phone} alt="" width={35} height={35} />
                  </Grid>
                  <Grid
                    xs={10}
                    sm={10}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: colors.primaryColors,
                      color: "white",
                    }}
                  >
                    Sign In with Mobile No
                  </Grid>
                </Grid>
              </Box> :
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => setEmailBox(true)}
              >
                <Grid
                  container
                  xs={10}
                  sm={8}
                  sx={{
                    border: `1px solid ${colors.primaryColors}`,
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  <Grid
                    xs={2}
                    sm={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img src={icons.gmail} alt="" width={35} height={35} />
                  </Grid>
                  <Grid
                    xs={10}
                    sm={10}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: colors.primaryColors,
                      color: "white",
                    }}
                  >
                    Sign In with Gmail
                  </Grid>
                </Grid>
              </Box>}
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
};
export default Login;
