import {Platform} from 'react-native';
import {useCallback, useEffect, useState} from 'react';

import {useFocusEffect} from '@react-navigation/native';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';

const interstitial = InterstitialAd.createForAdRequest(
  __DEV__
    ? TestIds.INTERSTITIAL
    : Platform.OS === 'ios'
    ? 'ca-app-pub-1171426954858897/6296831259'
    : 'ca-app-pub-1171426954858897/7688119760',
  {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  },
);

export const useAdUnit = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  const banneUnitId = __DEV__
    ? TestIds.BANNER
    : Platform.OS === 'ios'
    ? 'ca-app-pub-1171426954858897/2441346726'
    : 'ca-app-pub-1171426954858897/8046340277';

  return {
    banneUnitId,
    interstitial,
    loaded,
  };
};
