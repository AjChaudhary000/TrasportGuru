import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "../Contents/Images";
import colors from "../Contents/colors";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom'
import icons from "../Contents/icons";
import OTPInput, { ResendOTP } from "otp-input-react";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontSize: 18,
    marginRight: 15,
    color: theme.palette.text.secondary,
}));
const OtpScreen = (props) => {

    const nav = useNavigate()
    const [otp, setOtp] = React.useState('')
    const otpVerify = (event) => {
        event.preventDefault();
        if (otp.length === 4) {
            props.onOtpVerify(otp)
        } else {
        }

    }
    const renderButton = (buttonProps) => {
        return (
            <button
                style={{
                    backgroundColor: colors.primaryColors,
                    height: 40, border: 'none',
                    color: 'white',
                    borderRadius: '5px'
                }}>
                {buttonProps?.remainingTime !== 0 ? `Please wait for ${buttonProps?.remainingTime} sec` : "Resend"}
            </button>
        );
    };
    const resendBtn = () => {
        props.onResendBtn()
    }
    return (
        <Box
            component="form"
            onSubmit={otpVerify}
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <img src={Image.logo} alt="" width={300} height={200} />
            <Typography variant="h5" component="div" sx={{ color: "black" }}>
                Verification
            </Typography>
            <Typography
                variant="h6"
                component="div"
                sx={{ color: "gray", fontSize: 16 }} >
                {props.type === 'email' ?
                    `We have sent you an Gmail with a code to the number that you
                provided.`:
                    ` We have sent you an SMS with a code to the number that you
                    provided.`}
            </Typography>

            <Box sx={{ width: '50%', alignSelf: 'center', mt: 2, }}>
                <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'row', }}>
                    <Item>{props.name}</Item>
                    <img src={icons.edit} alt="" width={32} height={32}
                        onClick={() => {
                            props.type === 'email' ?
                                nav('/', { replace: true }, { replace: true }) :
                                nav('/LoginWithMobile', { replace: true })
                        }} />
                </Stack>

            </Box>
            <Box sx={{ width: '50%', alignSelf: 'center', mt: 2, }}>
                <OTPInput value={otp} onChange={setOtp}
                    autoFocus OTPLength={4}
                    otpType="number" disabled={false} inputStyles={{
                        border: `2px solid ${colors.primaryColors}`,
                        borderRadius: '5px'
                    }} />
            </Box>
            <Box sx={{ width: '100%', alignSelf: 'center', mt: 2, }}>
                <ResendOTP onResendClick={resendBtn}
                    renderButton={renderButton} />
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: colors.primaryColors,
                    color: "white",
                    height: 50,
                }}
            >
                Finish
            </Button>
        </Box>
    );
};

export default OtpScreen;
