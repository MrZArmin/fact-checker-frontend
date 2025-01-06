<!-- ArticleModal.vue -->
<template>
  <VueFinalModal
    :model-value="isModalOpen"
    @update:model-value="$emit('update:isModalOpen', $event)"
    class="modal-container"
    content-class="modal-content"
    @click-outside="handleClose"
  >
    <div class="modal-header">
      <div class="tabs-container">
        <div 
          v-for="(article, index) in articles" 
          :key="index"
          class="tab"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          <span class="tab-title">{{ article.title }}</span>
          <span 
            class="similarity-score"
            :style="{ backgroundColor: getSimilarityColor(article.similarity_score) }"
          >
            {{ (article.similarity_score * 100).toFixed(1) }}%
          </span>
        </div>
      </div>
      <div class="close-button" @click="handleClose">×</div>
    </div>

    <div class="modal-body" v-if="currentArticle">
      <h2>{{ currentArticle.title }}</h2>
      <p class="lead">{{ currentArticle.lead }}</p>
      <div class="article-text">{{ currentArticle.text }}</div>
      <a 
        :href="currentArticle.link" 
        target="_blank" 
        rel="noopener noreferrer"
        class="original-link"
      >
        Eredeti cikk
      </a>
    </div>
  </VueFinalModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps({
  articles: {
    type: Array,
    required: true,
    default: () => []
  },
  isModalOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'update:isModalOpen'])

const activeTab = ref(0)

const currentArticle = computed(() => props.articles[activeTab.value])

// Reset active tab when articles change
watch(() => props.articles, () => {
  activeTab.value = 0
})

const handleClose = () => {
  emit('update:isModalOpen', false)
  emit('close')
}

const getSimilarityColor = (score) => {
  if (score >= 0.8) return '#4CAF50'
  if (score >= 0.6) return '#FFC107'
  return '#F44336'
}
</script>