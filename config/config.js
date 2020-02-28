import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SplashScreen from "../src/Components/SplashScreen/SplashScreen";
import HomeScreen from "../src/Components/HomeScreen/HomeScreen";
import FlatL from "../src/Components/HomeScreen/FlatList/FL";
import FlatLTwo from "../src/Components/HomeScreen/FlatListTwo/FL";
import Converter from "../src/Components/ConvertS/FlatList/FL";
const Data = createStackNavigator(
  {
    ScreenFirt: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    ScreenInputFlatListOne: {
      screen: FlatL,
      navigationOptions: {
        header: null
      }
    },
    ScreenInputFlatListTwo: {
      screen: FlatLTwo,
      navigationOptions: {
        header: null
      }
    },
    ScreenConvertS: {
      screen: Converter,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    mode: "card"
  }
);

const Navigator = createAppContainer(Data);

export default Navigator;
