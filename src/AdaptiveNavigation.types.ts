import {
  DefaultNavigatorOptions,
  Descriptor,
  NavigationHelpers,
  NavigationProp,
  ParamListBase,
  RouteProp,
  TabActionHelpers,
  TabNavigationState,
  TabRouterOptions,
} from "@react-navigation/native";
import { StyleProp, ViewStyle } from "react-native";

export type AdaptiveNavigationHelpers = NavigationHelpers<
  ParamListBase,
  AdaptiveNavigationEventMap
> &
  TabActionHelpers<ParamListBase>;

export type NativeBottomTabDescriptor = Descriptor<
  AdaptiveNavigationOptions,
  AdaptiveNavigationProp<ParamListBase>,
  RouteProp<ParamListBase>
>;

export type AdaptiveNavigationDescriptorMap = Record<
  string,
  NativeBottomTabDescriptor
>;

export type AdaptiveNavigationViewProps = AdaptiveNavigationConfig & {
  state: TabNavigationState<ParamListBase>;
  navigation: AdaptiveNavigationHelpers;
  descriptors: AdaptiveNavigationDescriptorMap;
};

/**
 * Supported screen options
 */
export type AdaptiveNavigationOptions = {
  title?: string;
};

/**
 * Map of event name and the type of data (in event.data)
 * canPreventDefault: true adds the defaultPrevented property to the
 * emitted events.
 */
export type AdaptiveNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

export type AdaptiveNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = keyof ParamList,
  NavigatorID extends string | undefined = undefined,
> = NavigationProp<
  ParamList,
  RouteName,
  NavigatorID,
  TabNavigationState<ParamList>,
  AdaptiveNavigationOptions,
  AdaptiveNavigationEventMap
> &
  TabActionHelpers<ParamList>;

type AdaptiveNavigationConfig = {
  tabBarStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export type AdaptiveNavigatorProps = DefaultNavigatorOptions<
  ParamListBase,
  string | undefined,
  TabNavigationState<ParamListBase>,
  AdaptiveNavigationOptions,
  AdaptiveNavigationEventMap,
  AdaptiveNavigationProp<ParamListBase>
> &
  TabRouterOptions &
  AdaptiveNavigationConfig;
