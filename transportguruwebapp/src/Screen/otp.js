import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Image from "../Contents/Images";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import OtpScreen from "../Components/OtpScreen";
import { useLocation, useNavigate } from 'react-router-dom'
import { sendEmail, sendSms, verifyemail, verifyMobileNo } from "../Redux/Action/loginAction";
import { connect } from 'react-redux'
const theme = createTheme();
const Otp = (props) => {
    const location = useLocation();
    const nav = useNavigate()
    const otpVerify = (val) => {
        location.state.type === 'email' && props.verifyemail({ email: location.state.item, otp: val })
        location.state.type === 'mobileno' && props.verifyMobileNo({ mobileno: location.state.item, otp: val })
    }
    const resendBtn = () => {
        location.state.type === 'email' && props.sendEmail(location.state.item)
        location.state.type === 'mobileno' && props.sendSms(location.state.item)
    }
    React.useEffect(() => {
        if (props.otpData.status && props.otpData.account === "1") {
            props.reset()
            nav('/Home', { replace: true })
        }
    }, [props, nav])
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
                        <OtpScreen
                            onOtpVerify={(val) => { otpVerify(val) }}
                            onResendBtn={() => { resendBtn() }}
                            type={location.state.type}
                            name={location.state.item} />
                    </Container>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
};
const useDispatch = dispatch => {
    return {
        verifyemail: data => dispatch(verifyemail(data)),
        verifyMobileNo: data => dispatch(verifyMobileNo(data)),
        sendEmail: data => dispatch(sendEmail(data)),
        sendSms: data => dispatch(sendSms(data)),
        reset: () => dispatch({ type: "LOGIN_RESET" })
    };
};
const useSelector = state => ({
    otpData: state.login.otpData,
    loading: state.login.loading,
    error: state.login.error
});
export default connect(useSelector, useDispatch)(Otp);
