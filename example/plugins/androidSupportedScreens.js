const { withAndroidManifest } = require("@expo/config-plugins");

const withAndroidSupportedScreens = (config) => {
  return withAndroidManifest(config, async (config) => {
    config.modResults = addAndroidSupportedScreens(config.modResults);
    return config;
  });
};

function addAndroidSupportedScreens(config) {
  const manifest = config.manifest;
  const supportsScreens = { $: {} };
  supportsScreens.$ = {
    ...supportsScreens.$,
    ...{
      "android:smallScreens": true,
      "android:normalScreens": true,
      "android:largeScreens": true,
      "android:xlargeScreens": true,
    },
  };

  manifest["supports-screens"] = supportsScreens;
  if (!manifest.application || manifest.application.length === 0) {
    return config;
  }
  const application = manifest.application.find(
    (item) => item.$["android:name"] === ".MainApplication"
  );
  if (!application?.activity || application.activity.length === 0) {
    return config;
  }
  const activity = application?.["activity"]?.find(
    (item) => item.$["android:name"] === ".MainActivity"
  );
  if (!activity) {
    return config;
  }
  activity.$["android:screenOrientation"] = "unspecified";
  return config;
}

module.exports = withAndroidSupportedScreens;
