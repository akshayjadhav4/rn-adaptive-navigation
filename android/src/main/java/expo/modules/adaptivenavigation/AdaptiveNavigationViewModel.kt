package expo.modules.adaptivenavigation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch


class AdaptiveNavigationViewModel : ViewModel() {

    private val _tabs = MutableStateFlow<List<TabItem>>(emptyList())
    val tabs: StateFlow<List<TabItem>> = _tabs.asStateFlow()

    private val _selectedIndex = MutableStateFlow(0)
    val selectedIndex: StateFlow<Int> = _selectedIndex.asStateFlow()

    fun setTabs(newTabs: List<TabItem>) {
        viewModelScope.launch {
            _tabs.value = newTabs
            val newIndex = newTabs.indexOfFirst { it.isSelected }.takeIf { it != -1 } ?: 0
            _selectedIndex.value = newIndex
        }
    }

    fun selectTab(index: Int) {
        viewModelScope.launch {
            _selectedIndex.value = index
        }
    }
}