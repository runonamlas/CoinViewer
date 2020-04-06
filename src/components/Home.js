import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Button, Text, Icon} from 'native-base';

import DataItem from '../components/DataItem';

export default function Home({navigation}) {
  const [loading, setloading] = useState(true);
  const [response, setresponse] = useState({coins: []});
  const [page, setpage] = useState(0);

  useEffect(() => {
    setloading(true);
    getData();
  }, [page]);

  const getData = async () => {
    try {
      const apiURL =
        'https://api.coinranking.com/v1/public/coins?limit=10&offset=' + page;
      await fetch(apiURL, {
        headers: {
          packageName: 'com.coinviewer',
        },
      })
        .then((res) => res.json())
        .then(
          (resJson) => {
            setloading(false);
            setresponse(resJson.data);
          },
          (error) => {
            Alert.alert('Error', 'Something went wrong!');
          },
        );
    } catch (error) {
      throw error;
    }
  };

  const renderRow = ({item}) => {
    return <DataItem value={item} navigation={navigation} />;
  };

  const handleLoadBack = () => {
    if (page >= 10) {
      setpage(page - 10);
    }
  };

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#ff6d00" animating={loading} />
          <Text style={{marginTop: 20, fontSize: 20}}>Please Wait..</Text>
        </View>
      ) : (
        <View>
          <FlatList
            style={{marginBottom: 40}}
            keyExtractor={(item, index) => index.toString()}
            data={response.coins}
            renderItem={renderRow}
            ListFooterComponent={() => (loading ? <ActivityIndicator /> : null)}
          />
          <View style={styles.pagination}>
            <Button transparent onPress={handleLoadBack} title="<">
              <Icon
                style={{fontSize: 30, color: '#ff6d00'}}
                name="ios-arrow-back"
              />
            </Button>
            <Text style={styles.text}> {page / 10 + 1}</Text>
            <Button transparent onPress={() => setpage(page + 10)}>
              <Icon
                style={{fontSize: 30, color: '#ff6d00'}}
                name="ios-arrow-forward"
              />
            </Button>
          </View>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 40,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    margin: 0,
  },
  text: {
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    color: '#ff6d00',
  },
});
