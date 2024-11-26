<template>
  <div class="home">
    <Sidebar v-if="isSidebarOpen" @hide-sidebar="handleHideSidebar" @add-new-conversation="handleAddNewConversation" :items=history />
    <Conversation :loading="false" :conversation="conv" />
  </div>
</template>
<script setup>
  import Sidebar from '@/components/Sidebar.vue';
  import Conversation from '@/components/Conversation.vue';
  const history = ['asdasdsasadsadasdsadsaddadsadsaddadsadsaddadsadsadda', 'asdasdsasadsadsadsaddadsadsaddadsadsaddadasdsadsadda', 'asdadsadsaddadsadsaddasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda'];
  const conv = {
    '1':"What services do you offer?",
    '2':"We provide AI and software development services.",
    '3':"Can you elaborate on the AI services?",
    '4':"Sure, we specialize in machine learning, natural language processing, and computer vision.",
    '5':"Are you loading?"
  }

  const isSidebarOpen = true;

  const handleHideSidebar = () => {
    console.log("hiding sidebar");
  };

  const handleAddNewConversation = () => {
    console.log("adding new conversation");
  };

</script>
