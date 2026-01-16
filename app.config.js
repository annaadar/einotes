export default {
  expo: {
    name: "einotes",
    slug: "einotes",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
    },
    ios: {
      supportsTablet: true,
      googleServicesFile:
        process.env.GOOGLE_SERVICES_INFO_PLIST ?? "GoogleService-info.plist",
      bundleIdentifier: "com.annaad.einotes",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-firebase/crashlytics",
      "@react-native-google-signin/google-signin",
      "expo-router",
    ],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
      },
      package: "com.annaad.einotes",
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "1e170a54-0af5-4c1b-a891-bbb5e83376d7",
      },
    },
  },
};
