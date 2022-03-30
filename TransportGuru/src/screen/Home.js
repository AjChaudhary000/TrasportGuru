import React from "react";
import {
    SafeAreaView,
    View,
    PermissionsAndroid,
    Platform,
    TouchableOpacity,
    Text
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"

const Home = () => {

    return (
        <View style={{ flex: 1 }}>
            <MapView
                showsUserLocation={true}
                style={{ flex: 1 }}
                zoomEnabled={true}
                scrollEnabled={true}
                showsBuildings={true}
                // showsMyLocationButton={true}
                provider={"google"}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >

            </MapView>
        </View>
    )
}

export default Home;