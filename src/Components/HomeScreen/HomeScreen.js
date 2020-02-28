import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ButtonImage from "../../../assets/images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { db } from "../firebase";

class LoginScreen extends Component {
  state = {
    InputValue: "",
    Item_Base_Value: "USD",
    Item_Convertion_Value: "EUR",
    indicator: false,
    ConversionValue: 1,
    ConversionType: "",
    Data: "",
    Data2: ""
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

  /*
  Storing = async () => {
    const Op = {
      Base_Value: this.state.Item_Base_Value,
      Conversion_ValueOne: this.state.Item_Convertion_Value,
      date: new Date().toUTCString(),
      InputValue: this.state.InputValue,
      Conversion_ValueTwo: this.state.ConversionValue
    };

    const key = Math.floor(Math.random() * 349343343344345345345 * 3230);
    try {
      await AsyncStorage.setItem(key.toString(), JSON.stringify(Op));
    } catch (error) {
      alert(error);
    }
    alert("Saved Data Succesfully");
  };
  */
  componentDidMount() {}
  save = () => {
    const time = new Date().toLocaleString();
    //
    /* data: {
      base: this.state.Item_Base_Value,
      convert: this.state.Item_Convertion_Value,
      date: new Date().toUTCString(),
      convertedValue: this.state.ConversionValue,
      InputValue: this.state.InputValue
    }*/

    db.ref("Data/name" + "/" + time)
      .set({
        base: this.state.Item_Base_Value,
        convert: this.state.Item_Convertion_Value,
        date: new Date().toUTCString(),
        convertedValue: this.state.ConversionValue,
        InputValue: this.state.InputValue
      })
      .then(() => alert("Data Saved Successfully"))
      .catch(() => alert("Data Not saved Error occured"));
  };

  render() {
    return (
      <KeyboardAvoidingView style={style.Main} enabled behavior="padding">
        <View
          style={{
            marginTop: 20,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start"
          }}
          onTouchEnd={() => this.props.navigation.navigate("ScreenConvertS")}
        >
          <Image
            source={ButtonImage.folder}
            style={{ width: wp("13%"), height: hp("10%"), tintColor: "white" }}
            resizeMode="contain"
          />
        </View>

        {/*Btn Logo */}

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={ButtonImage.logo}
            style={{
              width: wp("40%"),
              height: hp("30%")
            }}
            resizeMode="contain"
          />
        </View>

        <View style={style.View3}>
          {/*FirstInput */}
          <View style={style.View3Inside1}>
            <TouchableOpacity
              style={{ backgroundColor: "#19b5fe", width: wp("20%"), height: hp("6.6%") }}
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
                backgroundColor: "#19b5fe",
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
          <TouchableOpacity
            onPress={this.currencyConverter}
            style={{ marginTop: 30, justifyContent: "center", alignItems: "center" }}
          >
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
              style={{ marginTop: 30, textAlign: "center", color: "white", fontWeight: "bold" }}
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

        {this.state.indicator ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "white",
                width: 60
              }}
              onPress={this.save}
            >
              <Text style={{ marginLeft: 5, fontSize: 20, color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;

const style = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: "#19b5fe"
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
