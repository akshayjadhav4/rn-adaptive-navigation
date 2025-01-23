import { createAdaptiveNavigator } from "adaptive-navigation";
import { withLayoutContext } from "expo-router";
import React from "react";

/**
 * Issues:
 * initialRouteName not working as expected
 * Removing adding tabs does not refect immediately needs reload
 */

const Tabs = withLayoutContext(createAdaptiveNavigator().Navigator);
function TabLayout() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          title: "Inbox",
          tabBarIcon: "Inbox",
        }}
      />
      <Tabs.Screen
        name="sent"
        options={{
          title: "Sent",
          tabBarIcon: "Send",
        }}
      />
      <Tabs.Screen
        name="drafts"
        options={{
          title: "Drafts",
          tabBarIcon: "Drafts",
        }}
      />
      <Tabs.Screen
        name="spam"
        options={{
          title: "Span",
          tabBarIcon: "Report",
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
