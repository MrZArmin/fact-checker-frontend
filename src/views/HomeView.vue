<template>
  <div class="home">
    <Sidebar @hide-sidebar="handleHideSidebar" @add-new-conversation="handleAddNewConversation" :items=history />
  </div>
</template>
<script setup>
  import Sidebar from '@/components/Sidebar.vue';
  const history = ['asdasdsasadsadasdsadsaddadsadsaddadsadsaddadsadsadda', 'asdasdsasadsadsadsaddadsadsaddadsadsaddadasdsadsadda', 'asdadsadsaddadsadsaddasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda', 'asdasdsasadsadasdsadsadda'];

  const handleHideSidebar = () => {
    console.log("hiding sidebar");
  };

  const handleAddNewConversation = () => {
    console.log("adding new conversation");
  };

</script>
