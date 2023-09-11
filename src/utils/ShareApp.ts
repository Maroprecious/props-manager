import { Platform, Share } from "react-native";
import { showToast } from "src/components/Toast";

const ShareApp = async (code: string) => {
  try {
    const link = Platform.OS === "android" ? "http://playstore.com" : "http://appstore.com"
    const shareResult = await Share.share({
      message: `Hi there! I am using MPM Mobile. Download app ${link} and use my referral code: ${code}`,
      title: `MPM Invite`,
    });
    if (shareResult.action === Share.sharedAction) {
      showToast({
        title: 'Share',
        message: `Thank you for inviting your friends!`,
        type: `info`
      });
      if (shareResult.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (shareResult.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    console.log(error)     
  }
}

export default ShareApp;