import { Hub } from 'aws-amplify';
import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export const urlOpener = async (url: any) => {
  // fix open browser if logout after sign-in by social
  if ((url as string).includes('/logout')) {
    return;
  }
  await InAppBrowser.isAvailable();

  try {
    const authSession = await InAppBrowser.openAuth(url, 'initiate', {
      showTitle: false,
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      ephemeralWebSession: false, // TODO: set to true //clear cookies for social-provider in browser
    });

    if (authSession.type === 'success') {
      return Linking.openURL(authSession.url);
    }
    Hub.dispatch('auth', { event: 'cancelled', data: authSession });
  } catch (e) {
    console.log('e', e);
  }
};
