import { NativeModule, requireNativeModule } from 'expo';

import { AdaptiveNavigationModuleEvents } from './AdaptiveNavigation.types';

declare class AdaptiveNavigationModule extends NativeModule<AdaptiveNavigationModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<AdaptiveNavigationModule>('AdaptiveNavigation');
