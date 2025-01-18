import { registerWebModule, NativeModule } from 'expo';

import { AdaptiveNavigationModuleEvents } from './AdaptiveNavigation.types';

class AdaptiveNavigationModule extends NativeModule<AdaptiveNavigationModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(AdaptiveNavigationModule);
