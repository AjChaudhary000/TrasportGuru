import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import colors from '../Contents/colors';
const Home = () => {
    const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = useGoogle({
        apiKey: 'AIzaSyDwIVgIMPOY0UMpmXrqO0hOBNSTM7dH2pA',
    });
    const [value, setValue] = React.useState("");
    const nav = useNavigate()
    React.useEffect(() => {
        const data = localStorage.getItem("@token");
        (data === null) && nav('/', { replace: true })
    }, [nav])
    const defaultCenter = {
        lat: 41.3851, lng: -122.1734
    }
    return (
        <div>
            <Header />
            <Grid container component="main" sx={{ height: "100vh" }}>
                <Grid
                    item
                    xs={12}
                    sm={7}
                    md={7}
                >
                    <LoadScript
                        googleMapsApiKey='AIzaSyDwIVgIMPOY0UMpmXrqO0hOBNSTM7dH2pA'>
                        <GoogleMap
                            mapContainerStyle={{
                                height: "100vh",
                                width: "100%"
                            }}
                            zoom={13}
                            center={defaultCenter}>
                        </GoogleMap>
                    </LoadScript>
                </Grid>
                <Grid item xs={12} sm={5} md={5}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: { xs: 500, sm: 'none', md: 800 }
                        }}
                    >
                        <Typography sx={{ color: 'gray', fontSize: 20, fontWeight: 'bold' }}>
                            Search Source / Destination City
                        </Typography>
                        <Box sx={{ justifyContent: "center", mt: 2 }}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={placePredictions}
                                getOptionLabel={(option) => option.description}
                                sx={{ width: { xs: 300, sm: 300, md: 450 } }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        label="From"
                                        value={value}
                                        onChange={(evt) => {
                                            getPlacePredictions({ input: evt.currentTarget.value });
                                            setValue(evt.currentTarget.value);
                                        }}
                                        loading={isPlacePredictionsLoading}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{ justifyContent: "center", mt: 2 }}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo1"
                                options={placePredictions}
                                getOptionLabel={(option) => option.description}
                                sx={{ width: { xs: 300, sm: 300, md: 450 } }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        label="Destination"
                                        value={value}
                                        onChange={(evt) => {
                                            getPlacePredictions({ input: evt.currentTarget.value });
                                            setValue(evt.currentTarget.value);
                                        }}
                                        loading={isPlacePredictionsLoading}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: { xs: 300, sm: 300, md: 450 }
                        }}>
                            <Box sx={{ marginRight: 1 }}>
                                <Typography sx={{ color: 'gray', fontSize: 16, fontWeight: 'bold' }}>
                                    Goods Weight
                                </Typography>
                            </Box>
                            <Box sx={{ marginRight: 1 }}>
                                <TextField
                                    label="capicity"
                                    variant="outlined"
                                    id={'capicity'}

                                    sx={{ mt: 3, mb: 2, width: { xs: 100, sm: 100, md: 150 } }}
                                />
                            </Box>
                            <Box>
                                <Typography sx={{ color: 'gray', fontSize: 16, fontWeight: 'bold' }}>
                                    / Tonnes
                                </Typography>
                            </Box>
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
                                width: { xs: 300, sm: 350, md: 450 }
                            }}
                        >
                            Search
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}
export default Home

