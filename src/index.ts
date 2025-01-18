// Reexport the native module. On web, it will be resolved to AdaptiveNavigationModule.web.ts
// and on native platforms to AdaptiveNavigationModule.ts
export { default } from './AdaptiveNavigationModule';
export { default as AdaptiveNavigationView } from './AdaptiveNavigationView';
export * from  './AdaptiveNavigation.types';
