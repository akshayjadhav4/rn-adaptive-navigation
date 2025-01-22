import { createAdaptiveNavigator } from "adaptive-navigation";
import { withLayoutContext } from "expo-router";
import React from "react";

const Tabs = withLayoutContext(createAdaptiveNavigator().Navigator);

function TabLayout() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: "Home",
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          title: "Details",
          tabBarIcon: "Info",
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
