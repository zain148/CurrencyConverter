import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Image, ActivityIndicator, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ButtonImage from "../../../assets/images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
class LoginScreen extends Component {
  state = {
    InputValue: "",
    Item_Base_Value: "USD",
    Item_Convertion_Value: "EUR",
    indicator: false,
    ConversionValue: 1,
    ConversionType: "",
    Data: ""
  };

  currencyConverter = async () => {
    const { state } = this.props.navigation;
    const IBV = state.params.itemOne;
    const ICV = state.params.itemTwo;
    this.setState({ Item_Base_Value: IBV, Item_Convertion_Value: ICV });

    this.state.InputValue !== ""
      ? await fetch(
          "https://api.exchangeratesapi.io/latest?base=" +
            this.state.Item_Base_Value +
            "&symbols=" +
            this.state.Item_Convertion_Value,
          {
            method: "GET"
          }
        )
          .then(Response => Response.json())
          .then(responseJSON => {
            this.setState({ Data: responseJSON, ShowStatus: false });
            Alert.alert("Good News", "Your Currency is Succesfully converted.!");
          })
          .catch(error => alert(error.message))
      : alert("Please type currency Value");

    if (this.state.Data) {
      const values = this.state.Data.rates;
      const key = Object.keys(values);
      const value = Object.values(values);
      const getValue = value[0];
      this.setState({ ConversionType: key, ConversionValue: getValue, indicator: true });
    }
  };

  render() {
    return (
      <View style={style.Main}>
        <Text style={style.textStyle}>Currency Converter</Text>

        <View style={style.View3}>
          {/*FirstInput */}
          <View style={style.View3Inside1}>
            <TouchableOpacity
              style={{ backgroundColor: "gray", width: wp("20%"), height: hp("6.6%") }}
              onPress={() => {
                this.props.navigation.navigate("ScreenInputFlatListOne");
              }}
            >
              <Text style={{ marginTop: 5, textAlign: "center", fontSize: 20, color: "white" }}>
                {this.state.Item_Base_Value}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={{ marginLeft: 65, width: wp("70%"), fontSize: 16 }}
              placeholder="Type currency Value"
              keyboardType="numeric"
              onChangeText={InputValue => this.setState({ InputValue })}
              value={this.state.InputValue}
            />
          </View>

          <View>
            <Text style={{ fontSize: 18, fontWeight: "400", marginRight: 10, color: "white" }}>
              To
            </Text>
          </View>

          {/*SecondInput*/}
          <View style={style.View3Inside2}>
            <TouchableOpacity
              style={{
                backgroundColor: "gray",
                width: wp("20%"),
                height: hp("6.6%")
              }}
              onPress={() => this.props.navigation.navigate("ScreenInputFlatListTwo")}
            >
              <Text style={{ marginTop: 5, textAlign: "center", fontSize: 20, color: "white" }}>
                {this.state.Item_Convertion_Value}
              </Text>
            </TouchableOpacity>

            <Text style={{ marginLeft: 70, textAlign: "center", color: "black" }}>
              {this.state.indicator
                ? this.state.InputValue * this.state.ConversionValue +
                  this.state.Item_Convertion_Value
                : null}
            </Text>
          </View>
        </View>

        {this.state.InputValue != "" ? (
          <TouchableOpacity onPress={this.currencyConverter} style={{ marginTop: 30 }}>
            <Image
              source={ButtonImage.currencyConvert}
              resizeMode={"contain"}
              style={{
                width: wp("18%"),
                height: hp("10%"),
                tintColor: "white"
              }}
            />
          </TouchableOpacity>
        ) : null}

        {this.state.indicator ? (
          <View>
            <Text
              style={{ marginTop: 30, textAlign: "center", color: "black", fontWeight: "bold" }}
            >
              {"1 " +
                this.state.Item_Base_Value +
                "= " +
                this.state.ConversionValue +
                this.state.Item_Convertion_Value +
                " " +
                "as of " +
                new Date().toUTCString()}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

export default LoginScreen;

const style = StyleSheet.create({
  Main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray"
  },
  textStyle: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold"
  },
  View3: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  View3Inside1: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("90%"),
    height: hp("7%"),
    borderRadius: wp("8%"),
    backgroundColor: "#f2f1ef"
  },
  View3Inside2: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("90%"),
    height: hp("7%"),
    borderRadius: wp("8%"),
    marginTop: 10,
    backgroundColor: "#f2f1ef"
  }
});
