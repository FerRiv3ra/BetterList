import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import {RootStackParams} from '../navigator/StackNavigator';
import {ThemeContext} from '../context/ThemeContext';
import AppContext from '../context/AppContext';
import ListFooter from '../components/ListFooter';
import {useList} from '../hooks/useList';
import MenuOptionsList from '../components/MenuOptionsList';
import ModalNewCategory from '../components/ModalNewCategory';
import Category from '../components/Category';
import {useControlSwipeable} from '../hooks/useControlSwipeable';
import ListItems from '../components/ListItems';
import {KeyboardAvoidingScrollView} from '../components/KeyboardAvoidingScrollView';
import {FooterBannerAd} from '../components/FooterBannerAd';

interface Props extends StackScreenProps<RootStackParams, 'List'> {}

const List = ({
  navigation,
  route: {
    params: {listId},
  },
}: Props) => {
  const [category, setCategory] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const {addTask, handleTask, removeTask, selectedList, total, totalTasks} =
    useList(listId);
  const {t} = useTranslation();

  const {row, closeRow, closeSwipeable} = useControlSwipeable();

  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {showAds} = useContext(AppContext);

  const {top, bottom} = useSafeAreaInsets();

  const openModalAddCategory = () => {
    setMenuVisible(false);

    setCategoryModalVisible(true);
  };

  return (
    <View style={{backgroundColor: colors.card, flex: 1}}>
      <View
        style={{
          backgroundColor: colors.primary,
          height: top + 50,
          ...styles.header,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={25} color={colors.card} />
        </TouchableOpacity>
        <Text style={{...styles.title, color: colors.card}}>
          {selectedList.title}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setMenuVisible(!menuVisible)}>
          <Icon name="ellipsis-vertical" size={25} color={colors.card} />
        </TouchableOpacity>
      </View>
      {selectedList.type === 'todo' ? (
        <KeyboardAvoidingScrollView keyboardDismissMode="on-drag">
          <ListItems
            currentList={selectedList.items as []}
            selectedList={selectedList}
            category={category}
            handleTask={handleTask}
            removeTask={removeTask}
            totalTasks={totalTasks}
          />
        </KeyboardAvoidingScrollView>
      ) : !!selectedList.categories?.length ? (
        <KeyboardAvoidingScrollView keyboardDismissMode="on-drag">
          {selectedList.categories.map((cat, index) => (
            <Category
              key={index}
              category={cat}
              isOpen={cat === category}
              setCategory={setCategory}
              selectedList={selectedList}
              handleTask={handleTask}
              removeTask={removeTask}
              totalTasks={totalTasks}
              index={index}
              closeRow={closeRow}
              row={row}
              closeSwipeable={closeSwipeable}
            />
          ))}
        </KeyboardAvoidingScrollView>
      ) : (
        <View style={{...styles.noCategories}}>
          <Icon.Button
            name={'add-outline'}
            size={25}
            style={{...styles.button, borderColor: colors.primary}}
            color={colors.primary}
            onPress={openModalAddCategory}
            backgroundColor={colors.card}>
            {t('menu.addCategory')}
          </Icon.Button>
        </View>
      )}

      {showAds && <FooterBannerAd bottom={bottom + 42} />}

      <ListFooter
        onPress={() => addTask(category, selectedList.type)}
        total={total}
        type={selectedList.type}
      />
      <MenuOptionsList
        visible={menuVisible}
        list={selectedList}
        handleVisible={setMenuVisible}
        openModalAddCategory={openModalAddCategory}
      />
      <ModalNewCategory
        setModalVisible={setCategoryModalVisible}
        modalVisible={categoryModalVisible}
        list={selectedList}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  noCategories: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 3,
  },
});
