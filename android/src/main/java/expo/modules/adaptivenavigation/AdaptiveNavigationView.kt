package expo.modules.adaptivenavigation

import android.content.Context
import android.view.View
import android.widget.FrameLayout
import com.google.android.material.bottomnavigation.BottomNavigationView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

class AdaptiveNavigationView(context: Context, appContext: AppContext) :
    ExpoView(context, appContext) {

    private val bottomNavigation = BottomNavigationView(context)
    private val frameLayout = FrameLayout(context)
    internal val navigation = bottomNavigation.apply {

    }

    init {
        orientation = VERTICAL

        addView(
            frameLayout, LayoutParams(
                LayoutParams.MATCH_PARENT,
                0,
            ).apply {
                weight = 1f
            } // expand to fill any remaining vertical space after bottomNavigation have been laid out
        )
        // it won’t preserve its state during configuration changes
        frameLayout.isSaveEnabled = false

//        layoutHolder.setBackgroundColor(Color.parseColor("#F3B63A"))
//        navigation.setBackgroundColor(Color.parseColor("#FF0000"))

        addView(navigation, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT))

    }

    override fun addView(child: View, index: Int) {
        when (child) {
            navigation, frameLayout -> {

                super.addView(child, index)
            }

            else -> {
                // Create a new container for this child
                val sceneContainer = createSceneContainer()

                // TEMP: to test Component is rendering or not
                sceneContainer.visibility = if (index == 0) View.VISIBLE else View.INVISIBLE
                sceneContainer.isEnabled = if (index == 0) true else false

                // Add container to layoutHolder
                frameLayout.addView(sceneContainer)

                // Add the child to its container
                sceneContainer.addView(child)
            }
        }
    }

    private fun createSceneContainer(): FrameLayout {
        val sceneContainer = FrameLayout(context).apply {
            layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            )
            visibility = INVISIBLE
            isEnabled = false
        }
        return sceneContainer
    }

}
