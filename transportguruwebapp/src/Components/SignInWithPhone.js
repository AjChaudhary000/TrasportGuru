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
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CountryCode from "../Contents/CountryCode";
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
const StyledFormControl = styled(FormControl)({
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, code, theme) {
  return {
    fontWeight:
      code.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const SignInWithPhone = (props) => {
  const theme = useTheme();
  const [code, setCode] = React.useState(["+91"]);
  const [mobileno, setMobileNo] = React.useState()
  const [isMobileValid, setIsMobileValid] = React.useState(true);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setCode(typeof value === "string" ? value.split(",") : value);
  };
  const mobileHandle = (event) => {
    if (event.currentTarget.value.length < 10) {
      setIsMobileValid(false)
    } else {
      if (event.currentTarget.value.length === 10) {
        setIsMobileValid(true)
        setMobileNo(event.currentTarget.value)
      }
    }
  }
  const sendSms = (event) => {
    event.preventDefault();
    if (mobileno.length === 10) {
      props.onSendSms(`${code[0]}${mobileno}`)
    } else {
      setIsMobileValid(false)
    }
  }
  return (
    <Box
      component="form"
      onSubmit={sendSms}
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
        Provide your mobile no ,so we can be able to send your confirmation
        code.
      </Typography>
      <Grid
        container
        xs={12}
        sm={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid
          xs={5}
          sm={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <StyledFormControl sx={{ width: 350, mt: 3 }}>
            <InputLabel id="demo-multiple-name-label">Code</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={code}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {CountryCode.map((item) => (
                <MenuItem
                  key={item.dial_code}
                  value={item.dial_code}
                  style={getStyles(item.dial_code, code, theme)}
                >
                  {`${item.dial_code}     ${item.name.en}    ${item.flag} `}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid>
        <Grid
          xs={7}
          sm={7}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <StyledTextField
            fullWidth
            label="Mobile no"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            error={!isMobileValid}
            helperText={!isMobileValid && "enter valid email"}
            onChange={mobileHandle}
          />
        </Grid>
      </Grid>

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
export default SignInWithPhone;
