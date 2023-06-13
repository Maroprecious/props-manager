import { Dimensions } from 'react-native';

export const DEVICE_SCALE = Dimensions.get('window').width / 375;
export const DEVICE_SCALE_HEIGHT = Dimensions.get('window').height / 768;

const space_mono = 'space-mono';

function normalize(size: number): number {
    return Math.round(DEVICE_SCALE * size);
}

export default {
    h: (size: number): number => Math.round(DEVICE_SCALE_HEIGHT * size),
    w: normalize,

    space_mono,
}
