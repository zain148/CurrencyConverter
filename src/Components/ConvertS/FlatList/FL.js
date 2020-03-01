import React, { Component, useState } from "react";

import { View, Text, FlatList, TouchableOpacity } from "react-native";

import firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { TextInput } from "react-native-gesture-handler";

import { db } from "../../firebase";
const ListContainer = ({ bV, cV, iV, cVV, date }) => {
  const [data, setData] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={{
          width: wp("100%"),
          height: hp("10%"),
          backgroundColor: data ? "#19b5fe" : "white"
        }}
        onPress={() => {
          setData(true);
        }}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch" }}
        >
          <Text style={{ fontSize: 18, marginLeft: 10 }}>
            You have converted {iV} {bV} to {cV} at total {cVV} as of {date}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

class FL extends Component {
  state = {
    indicator: false,
    value: "",
    getValue: "",
    filename: ""
  };
  Rename = () => {
    this.setState({ indicator: true });
    /*
     */
  };

  ReNamed = () => {
    db.ref("Data/filename")
      .set(this.state.value)
      .then(() => alert("File Renamed"))
      .catch(() => console.log("error"));
    this.setState({ indicator: false });
  };

  show = () => {
    /* var firebaseConfig = {
      apiKey: "AIzaSyD4OcMmCI8KYfma0NzgVO8VeLczSQAIr68",
      authDomain: "currenyconverter-b0ab5.firebaseapp.com",
      databaseURL: "https://currenyconverter-b0ab5.firebaseio.com",
      projectId: "currenyconverter-b0ab5",
      storageBucket: "currenyconverter-b0ab5.appspot.com",
      messagingSenderId: "49420125087",
      appId: "1:49420125087:web:c25e0fb318e8c67b7433aa",
      measurementId: "G-LX6KFQVGW9"
    };
*/
    // firebase.initializeApp({ databaseURL: "https://currenyconverter-b0ab5.firebaseio.com" });

    db.ref("Data/name").once("value", data => {
      const Data = data.toJSON();
      const Get = Object.values(Data);
      this.setState({ getValue: Get });
    });

    db.ref("Data/filename").once("value", data => {
      const Changed = data.toJSON();
      this.setState({ filename: Changed });
    });
  };

  render() {
    return (
      <View>
        <View
          style={{
            marginTop: 24,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#19b5fe"
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeScreen")}>
            <AntDesign name="back" size={30} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "white"
            }}
            onPress={this.show}
          >
            Show Your Saved Currencies
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch" }}
        >
          <Text>{""}</Text>

          <Text style={{ textAlign: "center", color: "#19b5fe", fontSize: 20 }}>
            {" "}
            FileName :{this.state.filename}
          </Text>
          <TouchableOpacity onPress={this.Rename}>
            <Text style={{ fontSize: 20, color: "#19b5fe" }}>Rename</Text>
          </TouchableOpacity>
        </View>

        {this.state.indicator ? (
          <View>
            <TextInput
              style={{ marginLeft: 50, width: wp("70%"), height: hp("10%") }}
              onChangeText={value => this.setState({ value })}
              value={this.state.value}
              placeholder="Please Enter you new file name"
            />
            <TouchableOpacity onPress={this.ReNamed}>
              <Text style={{ textAlign: "center", fontSize: 20 }}> Rename</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <FlatList
          data={this.state.getValue}
          renderItem={({ item }) => (
            <ListContainer
              bV={item.base}
              cV={item.convert}
              iV={item.InputValue}
              cVV={item.convertedValue}
              date={item.date}
            />
          )}
          keyExtractor={() => Math.floor(Math.random() * 2323232323).toString()}
          ItemSeparatorComponent={() => (
            <View style={{ widht: 10, borderWidth: 0.2, borderBottomColor: "black" }}></View>
          )}
        />
      </View>
    );
  }
}

export default FL;
