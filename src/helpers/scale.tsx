import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024 ? 1.25 : 1;

const guideLineBaseWith = 375;
const guideLineBaseHeight = 812;

const widthScale = (size: number) => (width / guideLineBaseWith) * size;
const heightScale = (size: number) => (height / guideLineBaseHeight) * size;

const widthPercent = (percent: number) => (width / 100) * percent;
const heightPercent = (percent: number) => (height / 100) * percent * isTablet;

export {widthScale, heightScale, widthPercent, heightPercent};
