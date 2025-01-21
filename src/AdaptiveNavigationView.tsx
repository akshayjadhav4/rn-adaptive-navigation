import { requireNativeView } from "expo";
import * as React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { AdaptiveNavigationViewProps } from "./AdaptiveNavigation.types";

const NativeView: React.ComponentType<ViewProps> =
  requireNativeView("AdaptiveNavigation");

export default function AdaptiveNavigationView({
  state,
  descriptors,
  ...props
}: Readonly<AdaptiveNavigationViewProps>) {
  const routes = React.useMemo(() => {
    return state.routes;
  }, [state.routes]);
  const focusedScreenKey = routes[state.index].key;

  return (
    <NativeView
      style={{
        width: "100%",
        height: "100%",
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
              { display: isFocused ? "flex" : "none" },
            ]}
          >
            {descriptors[route.key].render()}
          </View>
        );
      })}
    </NativeView>
  );
}
