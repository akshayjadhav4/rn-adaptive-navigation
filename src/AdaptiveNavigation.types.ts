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
import { StyleProp, ViewProps, ViewStyle } from "react-native";

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
  tabBarLabel?: string;
  tabBarIcon?: string;
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

export type OnPressEvent = {
  tabIndex: string;
};
export type AdaptiveNavigationDimensions = {
  width: number;
  height: number;
  navigationType: NavigationType;
};
export type NativeAdaptiveNavigationViewProps = ViewProps & {
  tabs: {
    label: string;
    icon: string | null;
    isSelected: boolean;
    key: string;
  }[];
  onPressEvent: (event: { nativeEvent: OnPressEvent }) => void;
  onResize: (event: { nativeEvent: AdaptiveNavigationDimensions }) => void;
};

export type NavigationType =
  | "NavigationBar"
  | "NavigationRail"
  | "NavigationDrawer"
  | "None";
