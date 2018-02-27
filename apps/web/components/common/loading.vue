<template>
  <div>
    <div style="margin: 10%;">
      <content-placeholders>
        <content-placeholders-heading :img="true" />
        <content-placeholders-text :lines="3" />
      </content-placeholders>
    </div>
  </div>

</template>

<script>
import ContentPlaceholders from '~/components/placeholder/ContentPlaceholders.vue';
import ContentPlaceholdersHeading from '~/components/placeholder/ContentPlaceholdersHeading.vue';
import ContentPlaceholdersText from '~/components/placeholder/ContentPlaceholdersText.vue';

export default {
  components: {
    ContentPlaceholders,
    ContentPlaceholdersHeading,
    ContentPlaceholdersText
  },

  name: 'loading'
};
</script>

<style scoped>
svg {
  width: 30px;
  height: 30px;
}
</style>
