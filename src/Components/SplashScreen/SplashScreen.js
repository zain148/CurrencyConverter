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
          source={SelectIcon.currencyConvert}
          style={{
            width: widthPercentageToDP("40%"),
            height: heightPercentageToDP("20%"),
            tintColor: "white",
            resizeMode: "contain"
          }}
        />
        <Text style={{ fontSize: 25, color: "white", fontWeight: "700" }}>Currency Converter</Text>
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
    backgroundColor: "rgba(149, 165, 166, 1)"
  }
});
