import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import SelectIcon from "../../../assets/images";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";
class FirstPage extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("HomeScreen");
    }, 3000);
  }

  render() {
    return (
      <View style={styles.Main}>
        <Image
          source={SelectIcon.logo}
          style={{
            width: widthPercentageToDP("50%"),
            height: heightPercentageToDP("30%"),
            resizeMode: "contain"
          }}
        />
      </View>
    );
  }
}

export default FirstPage;

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#19b5fe"
  }
});
