package expo.modules.adaptivenavigation

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

data class TabItem(
    @Field val key: String,
    @Field val label: String,
    @Field val icon: String? = null,
    @Field val isSelected: Boolean = false
) : Record