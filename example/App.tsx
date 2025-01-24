import { NavigationContainer } from "@react-navigation/native";
import { createAdaptiveNavigator } from "adaptive-navigation";

import DraftsScreen from "./screens/Drafts";
import InboxScreen from "./screens/Inbox";
import SentScreen from "./screens/Sent";
import SpamScreen from "./screens/Spam";

const Tab = createAdaptiveNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Inbox"
          component={InboxScreen}
          options={{ title: "Inbox", tabBarIcon: "Inbox" }}
        />
        <Tab.Screen
          name="Sent"
          component={SentScreen}
          options={{ title: "Sent", tabBarIcon: "Send" }}
        />
        <Tab.Screen
          name="Drafts"
          component={DraftsScreen}
          options={{ title: "Drafts", tabBarIcon: "Drafts" }}
        />
        <Tab.Screen
          name="Spam"
          component={SpamScreen}
          options={{ title: "Spam", tabBarIcon: "Report" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
