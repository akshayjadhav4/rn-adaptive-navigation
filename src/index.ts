import { NavigationType } from "./AdaptiveNavigation.types";
import AdaptiveNavigationModule from "./AdaptiveNavigationModule";

export { default as AdaptiveNavigationView } from "./AdaptiveNavigationView";
export * from "./AdaptiveNavigation.types";
export { createAdaptiveNavigator } from "./createAdaptiveNavigator";

export function getNavigationType(): NavigationType {
  return AdaptiveNavigationModule.getNavigationType();
}
