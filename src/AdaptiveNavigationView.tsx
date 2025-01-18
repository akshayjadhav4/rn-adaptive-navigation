import { requireNativeView } from 'expo';
import * as React from 'react';

import { AdaptiveNavigationViewProps } from './AdaptiveNavigation.types';

const NativeView: React.ComponentType<AdaptiveNavigationViewProps> =
  requireNativeView('AdaptiveNavigation');

export default function AdaptiveNavigationView(props: AdaptiveNavigationViewProps) {
  return <NativeView {...props} />;
}
