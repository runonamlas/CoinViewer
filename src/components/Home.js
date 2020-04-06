import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import DataItem from '../components/DataItem';

export default function Home({navigation}) {
  const [loading, setloading] = useState(true);
  const [response, setresponse] = useState({coins: []});
  const [page, setpage] = useState(0);

  useEffect(() => {
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

  const handleLoadMore = () => {
    console.log('burda');
    setpage(page + 10);
    console.log(page);
  };

  const handleLoadBack = () => {
    if (page >= 10) {
      console.log('burda');
      setpage(page - 10);
      console.log(page);
    }
  };
  return (
    <View>
      {loading ? (
        <View>
          <ActivityIndicator style={{marginTop: 50}} animating={loading} />
          <Text style={{margin: 50, marginLeft: 140}}>Please Wait..</Text>
        </View>
      ) : (
        <FlatList
          style={{marginBottom: 45}}
          keyExtractor={(item, index) => index.toString()}
          data={response.coins}
          renderItem={renderRow}
          ListFooterComponent={() => (loading ? <ActivityIndicator /> : null)}
        />
      )}
      <View style={styles.pagination}>
        <Button color="#ff6d00" onPress={handleLoadBack} title="<" />
        <Text style={styles.text}> {page / 10 + 1}</Text>
        <Button color="#ff6d00" onPress={handleLoadMore} title=">" />
      </View>
    </View>
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
    height: 45,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  text: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    color: '#ff6d00',
  },
});
