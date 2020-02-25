import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import SelectIcon from "../../../../assets/images.js";
class ListContainer extends Component {
  state = {
    showIcon: false
  };
  render() {
    return (
      <View
        style={{
          width: wp("100%"),
          height: hp("7%"),
          backgroundColor: this.state.showIcon ? "gray" : "white"
        }}
        onTouchEnd={() => {
          this.setState({ showIcon: true });
          setTimeout(() => {
            this.props.NAV.navigate("HomeScreen", { itemOne: this.props.ITEM });
          }, 600);
        }}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch" }}
        >
          <Text style={{ fontSize: 18, marginLeft: 10 }}>{this.props.ITEM} </Text>
          {this.state.showIcon ? (
            <Image
              source={SelectIcon.select}
              style={{
                width: wp("10%"),
                height: hp("5%"),
                tintColor: "white",
                resizeMode: "contain"
              }}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

export default ListContainer;
