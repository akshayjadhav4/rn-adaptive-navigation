import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { createAdaptiveNavigator } from "adaptive-navigation";
import React from "react";
import { Provider } from "react-redux";

import type { RootStackParamList } from "./navigation";
import EmailDetailScreen from "./screens/EmailDetailScreen";
import MailScreen from "./screens/MailScreen";
import { store } from "./store";
import { MailboxType } from "./types";

const Tab = createAdaptiveNavigator();
const Stack = createStackNavigator<RootStackParamList>();

type MailDetailScreenProps = StackScreenProps<RootStackParamList, "MailDetail">;

const MailDetailScreenWrapper: React.FC<MailDetailScreenProps> = (props) => {
  return <EmailDetailScreen {...props} />;
};

const SentScreen: React.FC = () => {
  return <MailScreen mailboxType={MailboxType.Sent} />;
};

const InboxScreen: React.FC = () => {
  return <MailScreen mailboxType={MailboxType.Inbox} />;
};

const DraftsScreen: React.FC = () => {
  return <MailScreen mailboxType={MailboxType.Drafts} />;
};

const SpamScreen: React.FC = () => {
  return <MailScreen mailboxType={MailboxType.Spam} />;
};

function TabScreens() {
  return (
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
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MailDetail"
        options={{ headerShown: false }}
        component={MailDetailScreenWrapper}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
