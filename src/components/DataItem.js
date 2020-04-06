import React from 'react';
import {ListItem, Text, Left, Body, Right} from 'native-base';
import {SvgUri} from 'react-native-svg';

class DataItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidCatch(error, info) {
    console.log('error');
    this.props.onError(error, info);
  }
  render() {
    const price = parseFloat(this.props.value.price).toFixed(2);
    const name = this.props.value.name;
    const symbol = this.props.value.symbol;
    const photo = this.props.value.iconUrl;
    const color = this.props.value.color;
    return (
      <ListItem
        thumbnail
        onPress={() =>
          this.props.navigation.navigate('Details', {value: this.props.value})
        }>
       {/* <Left> <SvgUri width="40" height="40" uri={//photo} /></Left>*/}
        <Body>
          <Text style={{color: color, fontSize:18}}>
            {name} - {symbol}
          </Text>
        </Body>
        <Right>
          <Text style={{color: color, fontSize:16,marginRight:15}}>{price} $</Text>
        </Right>
      </ListItem>
    );
  }
}

export default DataItem;
