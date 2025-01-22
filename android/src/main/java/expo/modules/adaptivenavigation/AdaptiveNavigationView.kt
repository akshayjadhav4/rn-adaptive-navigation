package expo.modules.adaptivenavigation

import android.annotation.SuppressLint
import android.content.Context
import android.util.Log
import android.view.View
import android.widget.FrameLayout
import androidx.compose.foundation.layout.Box
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteScaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.viewinterop.AndroidView
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.NoteAlt
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.viewevent.EventDispatcher

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

@SuppressLint("ViewConstructor")
class AdaptiveNavigationView(context: Context, appContext: AppContext) :
    ExpoView(context, appContext) {

    var tabs: MutableList<Tabs> = mutableListOf()

    private val onPressEvent by EventDispatcher()

    private val frameLayout = FrameLayout(context).apply {
        isSaveEnabled = false // Prevent state preservation during configuration changes.
    }
    private val composeView = ComposeView(context).also {
        it.setContent {
            NavigationSuiteScaffold(
                navigationSuiteItems = {
                    tabs.forEachIndexed { index, tab ->
                        item(
                            selected = tab.isSelected,
                            onClick = { onPressEvent(mapOf("tabIndex" to index)) },
                            icon = {
                                val icon: ImageVector? = getImageVectorByName(tab.icon)
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
    }

    init {
        addView(composeView, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
    }

    override fun addView(child: View, index: Int) {
        when (child) {
            composeView, frameLayout -> super.addView(child, index)
            else -> {
                val sceneContainer = createSceneContainer()

                // TEST_PURPOSE:: Configure scene visibility based on the index
                 sceneContainer.visibility = if (index == 0) VISIBLE else INVISIBLE
                 sceneContainer.isEnabled = index == 0

                // Add the scene container to the frameLayout
                frameLayout.addView(sceneContainer)
                // Add the child view to the scene container
                sceneContainer.addView(child)
            }
        }
    }

    private fun createSceneContainer(): FrameLayout {
        Log.d("AdaptiveNavigationView", "createSceneContainer Called")
        return FrameLayout(context).apply {
            layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            )
            visibility = INVISIBLE
            isEnabled = false
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
        Log.d("AdaptiveNavigationView", tabs[0].isSelected.toString())
        this.tabs = tabs
    }


    /**
     * TEMP Solution to get Material Icons
     */
    private fun getImageVectorByName(iconName: String?): ImageVector? {
        return when (iconName) {
            "Home" -> Icons.Default.Home
            "Info" -> Icons.Default.NoteAlt
            else -> null
        }
    }
}
