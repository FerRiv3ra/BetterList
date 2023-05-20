import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  // ** Drawer **
  drawerButton: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerButtons: {
    marginHorizontal: 25,
    marginVertical: 20,
  },
  drawerContainer: {
    flex: 1,
  },
  drawerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // ** General **
  globalMargin: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },

  // ** Ads **
  bannerAd: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
