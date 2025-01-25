package expo.modules.adaptivenavigation

import android.annotation.SuppressLint
import android.content.Context
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.compose.foundation.layout.Box
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteScaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.viewinterop.AndroidView
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material.icons.filled.Drafts
import androidx.compose.material.icons.filled.Inbox
import androidx.compose.material.icons.filled.Report
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.adaptive.currentWindowAdaptiveInfo
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteScaffoldDefaults
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteType
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.core.view.children
import androidx.core.view.forEachIndexed
import expo.modules.kotlin.viewevent.EventDispatcher

fun Context.convertPixelsToDp(px: Int): Float {
    val density = resources.displayMetrics.density
    return px / density
}

@SuppressLint("ViewConstructor")
class AdaptiveNavigationView(context: Context, appContext: AppContext) :
    ExpoView(context, appContext) {
    private  var adaptiveNavigationViewModel = AdaptiveNavigationViewModel()

    private val onPressEvent by EventDispatcher()
    private val onResize by EventDispatcher()
    var navigationType = NavigationSuiteType.NavigationBar

    private val frameLayout = FrameLayout(context).apply {
        isSaveEnabled = false // Prevent state preservation during configuration changes.
    }
    private val composeView = ComposeView(context).also {
        it.setContent {
            AdaptiveNavigationSuite()
        }
    }

    init {
        addView(composeView, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
        frameLayout.addOnLayoutChangeListener { v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom ->
            val width = context.convertPixelsToDp(right - left) // rightEdge - leftEdge
            val height = context.convertPixelsToDp(bottom - top) // bottomEdge - topEdge
            onResize(
                mapOf(
                    "width" to width,
                    "height" to height,
                    "navigationType" to navigationType.toString()
                )
            )
        }
    }

    override fun addView(child: View, index: Int, params: ViewGroup.LayoutParams?) {
        when (child) {
            composeView, frameLayout -> super.addView(child, index, params)
            else -> {
                val sceneContainer = createSceneContainer(index)
                child.isEnabled = false
                // Add the child view to the scene container
                sceneContainer.addView(child, params)
                // Add the scene container to the frameLayout
                frameLayout.addView(sceneContainer, index)
            }
        }
    }

    private fun createSceneContainer(index: Int): FrameLayout {
        return FrameLayout(context).apply {
            layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            )
            visibility =
                if (index == adaptiveNavigationViewModel.selectedIndex.value) VISIBLE else INVISIBLE
            isEnabled = index == adaptiveNavigationViewModel.selectedIndex.value
        }
    }

    @Composable
    fun AdaptiveNavigationSuite() {
        val tabs by adaptiveNavigationViewModel.tabs.collectAsState()
        val navSuiteType =
            NavigationSuiteScaffoldDefaults.calculateFromAdaptiveInfo(currentWindowAdaptiveInfo())
        navigationType = navSuiteType
        NavigationSuiteScaffold(
            navigationSuiteItems = {
                tabs.forEachIndexed { index, tab ->
                    item(
                        selected = tab.isSelected,
                        onClick = {
                            adaptiveNavigationViewModel.selectTab(index)
                            onPressEvent(mapOf("tabIndex" to index))
                        },
                        icon = {
                            val icon = getImageVectorByName(tab.icon)
                            icon?.let { iv ->
                                Icon(imageVector = iv, contentDescription = null)
                            }
                        },
                        label = { Text(tab.label) },
                    )
                }
            },
        ) {
            FrameLayoutContainer()
        }
    }

    @Composable
    private fun FrameLayoutContainer() {
        // Embed the  FrameLayout inside the Compose Scaffold
        Box(modifier = Modifier.fillMaxSize()) {
            AndroidView(
                factory = { frameLayout }, // Use the existing FrameLayout instance
                modifier = Modifier.fillMaxSize()
            )
        }
    }

    fun setTabs(tabs: ArrayList<TabItem>) {
        adaptiveNavigationViewModel.setTabs(tabs)
        updateSceneVisibility(adaptiveNavigationViewModel.selectedIndex.value)
    }

    private fun updateSceneVisibility(selectedIndex: Int) {
        frameLayout.forEachIndexed { index, view ->
            check(view is ViewGroup) { }
            view.visibility = if (index == selectedIndex) View.VISIBLE else View.INVISIBLE
            view.isEnabled = index == selectedIndex
            view.children.first().isEnabled = index == selectedIndex
        }
    }

}

/**
 * TEMP Solution to get Material Icons
 */
private fun getImageVectorByName(iconName: String?): ImageVector? {
    return when (iconName) {
        "Inbox" -> Icons.Default.Inbox
        "Send" -> Icons.AutoMirrored.Filled.Send
        "Drafts" -> Icons.Default.Drafts
        "Report" -> Icons.Default.Report
        else -> null
    }
}