import {
  createNavigatorFactory,
  type NavigatorTypeBagBase,
  type ParamListBase,
  type StaticConfig,
  type TabActionHelpers,
  type TabNavigationState,
  TabRouter,
  type TabRouterOptions,
  type TypedNavigator,
  useNavigationBuilder,
} from "@react-navigation/native";

import {
  AdaptiveNavigationEventMap,
  AdaptiveNavigationOptions,
  AdaptiveNavigationProp,
  AdaptiveNavigatorProps,
} from "./AdaptiveNavigation.types";
import AdaptiveNavigationView from "./AdaptiveNavigationView";

function AdaptiveNavigator({
  id,
  initialRouteName,
  children,
  layout,
  screenListeners,
  screenOptions,
  screenLayout,
  backBehavior,
  tabBarStyle,
  contentStyle,
  UNSTABLE_getStateForRouteNamesChange,
  ...props
}: AdaptiveNavigatorProps) {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      AdaptiveNavigationOptions,
      AdaptiveNavigationEventMap
    >(TabRouter, {
      id,
      initialRouteName,
      children,
      layout,
      screenListeners,
      screenOptions,
      screenLayout,
      UNSTABLE_getStateForRouteNamesChange,
      backBehavior,
    });

  return (
    <NavigationContent>
      <AdaptiveNavigationView
        state={state}
        navigation={navigation}
        descriptors={descriptors}
        {...props}
      />
    </NavigationContent>
  );
}

export function createAdaptiveNavigator<
  /**
   * the routes and parameters for the navigator
   */
  const ParamList extends ParamListBase,
  /**
   * optional identifier for the navigator
   */
  const NavigatorID extends string | undefined = undefined,
  /**
   * relationships between the various elements of the navigator (e.g., state, events, options)
   */
  const TypeBag extends NavigatorTypeBagBase = {
    ParamList: ParamList;
    NavigatorID: NavigatorID;
    State: TabNavigationState<ParamList>;
    ScreenOptions: AdaptiveNavigationOptions;
    EventMap: AdaptiveNavigationEventMap;
    NavigationList: {
      [RouteName in keyof ParamList]: AdaptiveNavigationProp<
        ParamList,
        RouteName,
        NavigatorID
      >;
    };
    Navigator: typeof AdaptiveNavigator;
  },
  const Config extends StaticConfig<TypeBag> = StaticConfig<TypeBag>,
>(config?: Config): TypedNavigator<TypeBag, Config> {
  return createNavigatorFactory(AdaptiveNavigator)(config);
}
