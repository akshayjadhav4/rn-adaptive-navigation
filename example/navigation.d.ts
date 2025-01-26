import { StackNavigationProp } from "@react-navigation/stack";
import { MailboxType } from "./types";

export type RootStackParamList = {
  TabNavigator: undefined;
  MailDetail: { email: Email }; // Define the parameter for MailDetail
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
