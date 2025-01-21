package expo.modules.adaptivenavigation

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition


class AdaptiveNavigationModule : Module() {

  override fun definition() = ModuleDefinition {

    Name("AdaptiveNavigation")

    View(AdaptiveNavigationView::class) {

    }
  }
}
