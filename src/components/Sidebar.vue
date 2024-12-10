<template>
  <div class="sidebar">
    <div class="sidebar-icons">
      <i 
        @click="handleLogout" 
        class="icon exit white large" 
        />
      <i
        @click="handleAddNewConversation"
        class="icon add white large"
      />
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
        <li
          v-for="item in items"
          :key="item.id"
          @click="handleOpenChat(item.id)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['logout', 'add-new-conversation', 'open-chat']);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const handleLogout = () => {
  emit('logout');
};

const handleAddNewConversation = () => {
  emit('add-new-conversation');
};

const handleOpenChat = (id) => {
  emit('open-chat', id);
};
</script>
