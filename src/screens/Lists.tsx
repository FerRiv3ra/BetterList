import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import AppContext from '../context/AppContext';

interface Props extends StackScreenProps<RootStackParams, 'Lists'> {}

const Lists = ({
  navigation,
  route: {
    params: {type},
  },
}: Props) => {
  const {
    theme: {colors, listText},
  } = useContext(ThemeContext);
  const {lists} = useContext(AppContext);

  const {top} = useSafeAreaInsets();

  return (
    <View style={{backgroundColor: colors.card, flex: 1, paddingTop: top}}>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: colors.primary,
          top: top + 5,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" color={colors.text} size={18} />
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.listView}>
          {!!lists.filter(li => li.type === type).length ? (
            lists
              .filter(l => l.type === type)
              .map(list => <ListItem {...list} key={list.id} />)
          ) : (
            <Text style={{...styles.nothingText, color: listText}}>
              Nothing to show
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Lists;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    padding: 15,
    borderRadius: 50,
    left: 15,
    zIndex: 999,
  },
  listView: {
    marginTop: 70,
    marginHorizontal: 20,
  },
  nothingText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    marginTop: 30,
  },
});
