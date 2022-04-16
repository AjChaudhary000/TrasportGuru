import { View, Text } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
import Header from '../../components/header'
import { getTracking } from '../../Redux/trackingSlice'
const Tracking = (props) => {
    const [token, setToken] = React.useState('');
    const fetchToken = async () => {
        try {
            const data = await getJWTToken();
            setToken(data)
        } catch (e) {
            console.log()
        }
    }
    React.useEffect(() => {
        fetchToken()
        props.getTracking(token);
    }, [token])
    console.log(props.trackingList)
    return (
        <View>
            <Header name={"Tracking"} />
            <Text>tracking</Text>
        </View>
    )
}


const useSelector = (state) => (
    {
        theme: state.token.theme,
        trackingList: state.tracking.trackingdata
    }
)
const useDispatch = (dispatch) => {
    return {
        getTracking: (data) => dispatch(getTracking(data))
    };
}
export default connect(useSelector, useDispatch)(Tracking);