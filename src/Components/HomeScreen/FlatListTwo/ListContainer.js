import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import SelectIcon from "../../../../assets/images.js";
import { TouchableOpacity } from "react-native-gesture-handler";
class ListContainer extends Component {
  state = {
    showIcon: false
  };

  render() {
    return (
      <View onTouchEnd={() => {}}>
        <TouchableOpacity
          style={{
            width: wp("100%"),
            height: hp("7%"),
            backgroundColor: this.state.showIcon ? "#19b5fe" : "white"
          }}
          onPress={() => {
            this.setState({ showIcon: true });
            setTimeout(() => {
              this.props.NAV.navigate("HomeScreen", { itemTwo: this.props.ITEM });
            }, 600);
          }}
        >
          <View
            style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "stretch" }}
          >
            <Text style={{ fontSize: 20, marginLeft: 15 }}>{this.props.ITEM} </Text>
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
        </TouchableOpacity>
      </View>
    );
  }
}

export default ListContainer;
