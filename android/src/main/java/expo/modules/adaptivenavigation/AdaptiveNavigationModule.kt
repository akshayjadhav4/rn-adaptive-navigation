package expo.modules.adaptivenavigation

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition


class AdaptiveNavigationModule : Module() {

  override fun definition() = ModuleDefinition {

    Name("AdaptiveNavigation")

    Function("getNavigationType") {
      return@Function getNavigationType()
    }

    View(AdaptiveNavigationView::class) {

      Events("onPressEvent")

      Prop("tabs") { view: AdaptiveNavigationView, prop: ArrayList<Tabs> ->
        view.setTabs(prop)
      }
    }
  }
}
