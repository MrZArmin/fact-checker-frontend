<template>
  <div class="sidebar">
    <div class="sidebar-icons">
      <i @click="handleHideSidebar" class="icon exit white large" /><i @click="handleAddNewConversation" class="icon add white large" />
    </div>
    <div class="sidebar-title">
      <i class="icon logo white large" />
      <div>Fact-Checker</div>
    </div>
    <div class="sidebar-history-title">
      <div class="line"></div>
      <div>History</div>
      <div class="line"></div>
    </div>
    <div class="sidebar-history">
      <ul>
        <li v-for="item in items" :key="item">
          {{ item.length > 30 ? item.slice(0, 30) + '...' : item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['hide-sidebar', 'add-new-conversation']);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const handleHideSidebar = () => {
  emit('hide-sidebar');
};

const handleAddNewConversation = () => {
  emit('add-new-conversation');
};

</script>
