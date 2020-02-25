import React, { Component } from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ListContainer from "./ListContainer";
class FL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        "EUR",
        "CAD",
        "HKD",
        "ISK",
        "PHP",
        "DKK",
        "HUF",
        "CZK",
        "AUD",
        "RON",
        "SEK",
        "IDR",
        "INR",
        "BRL",
        "RUB",
        "HRK",
        "JPY",
        "THB",
        "CHF",
        "SGD",
        "PLN",
        "BGN",
        "TRY",
        "CNY",
        "NOK",
        "NZD",
        "ZAR",
        "USD",
        "MXN",
        "ILS",
        "GBP",
        "KRW",
        "MYR"
      ]
    };
  }

  render() {
    return (
      <View>
        <View
          style={{
            marginTop: 24,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray"
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center"
            }}
          >
            Available Currencies
          </Text>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <ListContainer ITEM={item} NAV={this.props.navigation} />}
          keyExtractor={item => item.toString()}
          ItemSeparatorComponent={() => (
            <View style={{ widht: 10, borderWidth: 0.2, borderBottomColor: "black" }}></View>
          )}
        />
      </View>
    );
  }
}

export default FL;
