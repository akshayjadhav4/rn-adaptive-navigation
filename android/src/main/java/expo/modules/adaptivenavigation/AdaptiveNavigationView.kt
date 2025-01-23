package expo.modules.adaptivenavigation

import android.annotation.SuppressLint
import android.content.Context
import android.view.View
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
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.types.Enumerable

class Tabs : Record {
    @Field
    val key: String = ""

    @Field
    val label: String = ""

    @Field
    val icon: String? = null

    @Field
    val isSelected: Boolean = false
}

enum class NavigationType(val value: String) : Enumerable {
    BOTTOM_NAVIGATION("bottom_navigation"),
    NAVIGATION_RAIL("navigation_rail"),
    PERMANENT_NAVIGATION_DRAWER("permanent_navigation_drawer")
}

@SuppressLint("ViewConstructor")
class AdaptiveNavigationView(context: Context, appContext: AppContext) :
    ExpoView(context, appContext) {

    var tabs: MutableList<Tabs> = mutableListOf()
    private var selectedIndex = 0

    private val onPressEvent by EventDispatcher()

    private val frameLayout = FrameLayout(context).apply {
        isSaveEnabled = false // Prevent state preservation during configuration changes.
    }
    private val composeView = ComposeView(context).also {
        it.setContent {
            AdaptiveNavigationSuite(
                tabs = tabs,
                onTabSelected = { index ->
                    onPressEvent(mapOf("tabIndex" to index))
                }
            )
        }
    }

    init {
        addView(composeView, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
    }

    override fun addView(child: View, index: Int) {
        when (child) {
            composeView, frameLayout -> super.addView(child, index)
            else -> {
                val sceneContainer = createSceneContainer(index)
                // Add the child view to the scene container
                sceneContainer.addView(child)
                // Add the scene container to the frameLayout
                frameLayout.addView(sceneContainer)
            }
        }
    }

    private fun createSceneContainer(index: Int): FrameLayout {
        return FrameLayout(context).apply {
            layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            )
            visibility = if (index == 0) VISIBLE else INVISIBLE
            isEnabled = index == 0
        }
    }

    @Composable
    fun AdaptiveNavigationSuite(
        tabs: List<Tabs>,
        onTabSelected: (Int) -> Unit
    ) {
        var activeTab by remember { mutableIntStateOf(selectedIndex) }
        NavigationSuiteScaffold(
            navigationSuiteItems = {
                tabs.forEachIndexed { index, tab ->
                    item(
                        selected = index == activeTab,
                        onClick = {
                            activeTab = index
                            onTabSelected(index)
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
            }
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

    fun setTabs(tabs: ArrayList<Tabs>) {
        if (this.tabs.size != tabs.size) {
            this.tabs = tabs
        }
        selectedIndex = tabs.indexOfFirst { it.isSelected }
        updateSceneVisibility(selectedIndex)
    }

    private fun updateSceneVisibility(selectedIndex: Int) {
        for (i in 0 until frameLayout.childCount) {
            val sceneContainer = frameLayout.getChildAt(i)
            sceneContainer.visibility = if (i == selectedIndex) View.VISIBLE else View.INVISIBLE
            sceneContainer.isEnabled = i == selectedIndex
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


fun getNavigationType(): NavigationType {
    // Default value for navigation type
    val navigationType: NavigationType = NavigationType.BOTTOM_NAVIGATION
    return navigationType
}