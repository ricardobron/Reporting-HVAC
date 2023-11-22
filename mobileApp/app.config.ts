import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  runtimeVersion: '1.0.0',
  assetBundlePatterns: ['**/*'],
  // updates: {
  //   url: 'https://u.expo.dev/b2540c64-2d70-400d-9f54-caaea2e5fa23',
  // },
  name: 'AC',
  slug: 'AC',
  version: '1.0.0',
  orientation: 'portrait',
  owner: 'ricardobron',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#000000',
    },
    package: 'com.ssac.app',
  },
  ios: {
    supportsTablet: true,
  },
  plugins: [
    [
      'expo-barcode-scanner',
      {
        cameraPermission: 'Allow $(PRODUCT_NAME) to access camera.',
      },
    ],
  ],
  // extra: {
  //   eas: {
  //     projectId: 'b2540c64-2d70-400d-9f54-caaea2e5fa23',
  //   },
  // },
});
