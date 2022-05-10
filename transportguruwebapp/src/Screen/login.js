import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Image from "../Contents/Images";
import SignIn from "../Components/SignIn";
import Box from "@mui/material/Box";
import icons from "../Contents/icons";
import colors from "../Contents/colors";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { sendEmail } from "../Redux/Action/loginAction";

const theme = createTheme();
const Login = (props) => {
  const [email, setEmail] = React.useState('')
  const nav = useNavigate()
  const sendEmailData = (val) => {
    setEmail(val)
    props.sendEmail(val)
  }
  React.useEffect(() => {
    if (props.otpData.status) {
      props.reset()
      nav('/Otp', { state: { type: 'email', item: email } }, { replace: true })
    }

  }, [props, email, nav])
  return (
    <ThemeProvider theme={theme} >
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
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
        <Grid item xs={12} sm={7} md={6}>
          <Container
            component="main"
            maxWidth={"sm"}
            sx={{ justifyContent: "center" }}
          >
            <CssBaseline />
            <SignIn onSendEmail={(val) => { sendEmailData(val) }} />
            <Divider > Or</Divider>
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
                item
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
                  item
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
                  item
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
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={() => nav('/LoginWithMobile', { replace: true })}
            >
              <Grid
                container
                item
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
                  item
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
                  item
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
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
};
const useDispatch = dispatch => {
  return {
    sendEmail: data => dispatch(sendEmail(data)),
    reset: () => dispatch({ type: "LOGIN_RESET" })
  };
};
const useSelector = state => ({
  otpData: state.login.otpData,
  loading: state.login.loading,
  error: state.login.error
});
export default connect(useSelector, useDispatch)(Login);
