import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Router from './src/router/router'
import LottieView from 'lottie-react-native';
import { Provider } from 'react-redux'
import store from './src/Redux/store';
const App = () => {
  const [isloading, setloadingData] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setloadingData(false)
    }, 2000)

  }, [])
  // if (isloading) {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <StatusBar hidden />
  //       <View style={{ height: "100%" }}>
  //         <LottieView source={require('./src/assets/json/loading.json')} autoPlay loop />
  //       </View>
  //       <Text style={{ textAlign: 'center', bottom: "45%", fontSize: 20, letterSpacing: 2, color: '#1C22B8', fontWeight: 'bold' }}>Trasport guru</Text>
  //     </View>
  //   );
  // }
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <Router />
      </Provider>

    </View>
  )
}

export default App