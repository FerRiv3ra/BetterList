import {View} from 'react-native';
import React from 'react';

import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

import {globalStyles} from '../theme/globalStyles';
import {useAdUnit} from '../hooks/useAdUnit';

interface Props {
  bottom?: number;
}

export const FooterBannerAd = ({bottom = 0}: Props) => {
  const {banneUnitId} = useAdUnit();

  return (
    <View style={{...globalStyles.bannerAd, bottom: bottom}}>
      <BannerAd
        unitId={banneUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};
