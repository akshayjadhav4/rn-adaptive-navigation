import { CommonActions } from "@react-navigation/native";
import { requireNativeView } from "expo";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import {
  AdaptiveNavigationDimensions,
  AdaptiveNavigationViewProps,
  NativeAdaptiveNavigationViewProps,
} from "./AdaptiveNavigation.types";

const NativeView: React.ComponentType<NativeAdaptiveNavigationViewProps> =
  requireNativeView("AdaptiveNavigation");

export const AdaptiveNavigationContext = React.createContext<
  AdaptiveNavigationDimensions | undefined
>(undefined);

export function useAdaptiveNavigationDimensions() {
  const context = React.useContext(AdaptiveNavigationContext);
  if (context === undefined) {
    console.warn(
      "useAdaptiveNavigationDimensions must be used within an AdaptiveNavigationView"
    );
  }
  return context;
}

export default function AdaptiveNavigationView({
  state,
  descriptors,
  navigation,
  ...props
}: Readonly<AdaptiveNavigationViewProps>) {
  const [viewDimensions, setViewDimensions] = React.useState<
    AdaptiveNavigationDimensions | undefined
  >();
  const routes = React.useMemo(() => {
    return state.routes;
  }, [state.routes]);
  const focusedScreenKey = routes[state.index].key;

  const tabs = React.useMemo(
    () =>
      routes.map((route) => {
        const options = descriptors[route.key]?.options;
        return {
          label:
            options?.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options?.title !== undefined
                ? options.title
                : route.name,
          icon: descriptors[route.key].options.tabBarIcon ?? null,
          isSelected: route.key === focusedScreenKey,
          key: route.key,
        };
      }),
    [routes, descriptors]
  );

  return (
    <AdaptiveNavigationContext.Provider value={viewDimensions}>
      <NativeView
        style={{
          width: "100%",
          height: "100%",
        }}
        tabs={tabs}
        onPressEvent={(event) => {
          const index = event.nativeEvent.tabIndex;
          const route = state.routes[index];
          if (!route) {
            return;
          }
          const isFocused = route.key === focusedScreenKey;
          const navigationEvent = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
            data: {
              isAlreadyFocused: isFocused,
            },
          });

          if (!isFocused && !navigationEvent.defaultPrevented) {
            navigation.dispatch({
              ...CommonActions.navigate(route),
              target: state.key,
            });
          }
        }}
        onResize={({ nativeEvent }) => {
          setViewDimensions(nativeEvent);
        }}
      >
        {routes.map((route) => {
          const isFocused = route.key === focusedScreenKey;
          return (
            <View
              key={route.key}
              collapsable={false}
              pointerEvents={isFocused ? "auto" : "none"}
              style={[
                StyleSheet.absoluteFill,
                viewDimensions,
                { display: isFocused ? "flex" : "none" },
              ]}
            >
              {descriptors[route.key].render()}
            </View>
          );
        })}
      </NativeView>
    </AdaptiveNavigationContext.Provider>
  );
}
