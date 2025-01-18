import * as React from 'react';

import { AdaptiveNavigationViewProps } from './AdaptiveNavigation.types';

export default function AdaptiveNavigationView(props: AdaptiveNavigationViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
