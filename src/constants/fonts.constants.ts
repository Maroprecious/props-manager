import { Dimensions } from 'react-native';

export const DEVICE_SCALE = Dimensions.get('window').width / 375;
export const DEVICE_SCALE_HEIGHT = Dimensions.get('window').height / 768;

const space_mono = 'space-mono';
const American_Typewriter_Regular = 'FontsFree-Net-american-typewriter';
const American_Typewriter_Bold = 'American-Typewriter-Bold';
const SF_Pro_Rounded_Medium = 'FontsFree-Net-SF-Pro-Rounded-Medium';
const Inter_Bold = 'Inter-Bold';
const Inter_Medium = 'Inter-Medium';
const Inter_Regular = 'Inter-Regular';
const Inter_SemiBold = 'Inter-SemiBold';
const Lato_Bold = 'Lato-Bold';
const Lato_Regular = 'Lato-Regular';
const Lora_Bold = 'Lora-Bold';
const Lora_Medium = 'Lora-Medium';
const Lora_Regular = 'Lora-Regular';
const Lora_SemiBold = 'Lora-SemiBold';
const Raleway_Regular = 'Raleway-Regular';
const Roboto_Light = "Roboto-Light";
const Roboto_Black = "Roboto-Black";
const Roboto_Bold = "Roboto-Bold";
const Avenir_Medium = "Avenir-Medium";
const Roboto_Regular = "Roboto-Regular";
const Roboto_Medium = "Roboto-Medium";
const Montserrat_Medium = "Montserrat-Medium";


function normalize(size: number): number {
    return Math.round(DEVICE_SCALE * size);
}

export default {
    h: (size: number): number => Math.round(DEVICE_SCALE_HEIGHT * size),
    w: normalize,

    space_mono,
    American_Typewriter_Regular,
    American_Typewriter_Bold,
    SF_Pro_Rounded_Medium,
    Inter_Bold,
    Inter_Medium,
    Inter_Regular,
    Inter_SemiBold,
    Lato_Bold,
    Lato_Regular,
    Lora_Bold,
    Lora_Medium,
    Lora_Regular,
    Lora_SemiBold,
    Raleway_Regular,
    Roboto_Light,
    Roboto_Black,
    Roboto_Bold,
    Avenir_Medium,
    Roboto_Regular,
    Roboto_Medium,
    Montserrat_Medium
}
