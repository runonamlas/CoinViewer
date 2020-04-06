import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {H1, H2, H3} from 'native-base';
import {SvgUri} from 'react-native-svg';
export default function Details({route, navigation}) {
  const {name, iconUrl, price, description, symbol} = route.params.value;
  const pricetwo = parseFloat(price).toFixed(2);

  useEffect(() => {
    navigation.setOptions({title: name + ' - ' + symbol});
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <SvgUri style={{marginTop: 20}} width="120" height="120" uri={iconUrl} />
      <H1 style={{marginTop: 15}}>{name}</H1>
      <H2 style={{marginTop: 10, fontWeight: 'bold'}}>{pricetwo} $</H2>
      <H3 style={{margin: 15}}>{description}</H3>
      <Text style={{marginTop: 15, color: '#808080'}}>Onur Salman</Text>
      <Text style={{marginTop: 5, color: '#808080'}}>
        Data provided byCoinranking
      </Text>
    </View>
  );
}
