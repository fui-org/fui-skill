<template>
  <div class="uc-component-name">
    <v-card outlined>
      <v-card-title v-if="title" class="subtitle-1 font-weight-bold">
        <slot name="title">
          {{ title }}
        </slot>
      </v-card-title>

      <v-card-text>
        <div v-if="loading">
          <slot name="loading">
            Loading...
          </slot>
        </div>
        <div v-else-if="!hasItems">
          <slot name="empty">
            No data
          </slot>
        </div>
        <div v-else>
          <slot :items="localItems" :selected-item="localValue">
            <v-list dense>
              <v-list-item
                v-for="(item, index) in localItems"
                :key="item.id || item.value || index"
                @click="handleSelect(item)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ getItemLabel(item) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </slot>

          <v-btn
            v-if="showAction"
            small
            color="primary"
            :disabled="disabled"
            @click="handleAction"
          >
            {{ actionLabel }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/**
 * Component Name: uc-component-name
 * Description: Reusable starter component. Prefer generic props, emits, and slots.
 * Usage: <uc-component-name :items="rows" :value="selectedRow" @select="handleSelect"></uc-component-name>
 */
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Object, Array],
      default: null
    },
    items: {
      type: Array,
      default: function() {
        return [];
      }
    },
    itemText: {
      type: String,
      default: 'label'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showAction: {
      type: Boolean,
      default: true
    },
    actionLabel: {
      type: String,
      default: 'Action'
    },
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      localValue: null,
      localItems: []
    }
  },
  computed: {
    hasItems() {
      return this.localItems.length > 0;
    },
    resolvedItemText() {
      return this.options.itemText || this.itemText;
    },
    resolvedItemValue() {
      return this.options.itemValue || 'value';
    }
  },
  watch: {
    value: {
      handler(val) {
        this.localValue = val;
      },
      immediate: true
    },
    items: {
      handler(val) {
        this.localItems = Array.isArray(val) ? val : [];
      },
      immediate: true
    }
  },
  methods: {
    getItemLabel(item) {
      if (!item || typeof item !== 'object') {
        return item;
      }

      return item[this.resolvedItemText] || item.label || item.name || '';
    },
    getItemValue(item) {
      if (!item || typeof item !== 'object') {
        return item;
      }

      return item[this.resolvedItemValue] || item.value || item.id || item;
    },
    handleSelect(item) {
      var nextValue = this.getItemValue(item);
      this.localValue = nextValue;
      this.$emit('input', nextValue);
      this.$emit('select', item);
      this.$emit('change', nextValue);
    },
    handleAction() {
      this.$emit('action', {
        value: this.localValue,
        items: this.localItems
      });
    }
  }
}
</script>

