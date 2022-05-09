import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import Image from "../Contents/Images";
import colors from "../Contents/colors";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: colors.primaryColors,
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
  {
    borderColor: colors.primaryColors,
  },
  [`& .${inputLabelClasses.outlined}`]: {
    color: colors.primaryColors,
  },
});

const SignIn = (props) => {
  const [email, setEmail] = React.useState()
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const sendEmail = (event) => {
    event.preventDefault();
    
    props.onSendEmail(email)
  }
  const emailHandle = (event) => {
    const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    !regex.test(event.currentTarget.value) ? setIsEmailValid(false) : setIsEmailValid(true);
    setEmail(event.currentTarget.value);
  }
  return (
    <Box
      component="form"
      onSubmit={sendEmail}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img src={Image.logo} alt="" width={300} height={200} />
      <Typography variant="h5" component="div" sx={{ color: "black" }}>
        Welcome To Transport Guru
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ color: "gray", fontSize: 16 }}
      >
        Provide your email id,so we can be able to send your confirmation
        code.
      </Typography>
      <StyledTextField
        fullWidth
        label="Email Id"
        variant="outlined"
        id={'emailid'}
        error={!isEmailValid}
        helperText={!isEmailValid && "enter valid email"}
        onChange={emailHandle}
        sx={{ mt: 3, mb: 2 }}
      />
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
        Verify
      </Button>
    </Box>
  );
};
export default SignIn;
