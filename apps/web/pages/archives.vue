<template>
  <div class="main-content archive-page" :class="{'mobile': mobileLayout}">
    <div class="categorys-item">
      <div v-for="(result, index) in articleList" :key="index" class="">
        <div v-for="(monthList, index) in result.monthList" :key="index">
          <div class="categorys-title">
            {{ monthList.month | monthFilter }} {{ result.year }}
          </div>
          <div class="post-lists">
            <div class="post-lists-body">
              <div v-for="(articleList, index) in monthList.articleList" :key="index" class="post-list-item">
                <div class="post-list-item-container">
                  <div class="item-label">
                    <div class="item-title">
                      <nuxt-link :to="`/article/${articleList._id}`">
                        {{ articleList.title }}
                      </nuxt-link>
                    </div>
                    <div class="item-meta clearfix">
                      <div class="item-meta-date">
                        {{ articleList.create_at | dateFormat('MM.dd')}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'archives',

  scrollToTop: true,

  transition: 'fade',

  head: {
    title: 'archives'
  },

  fetch({ store }) {
    return store.dispatch('getArchives', { page_size: 1000 });
  },

  computed: {
    tag() {
      return this.$store.state.tag.data.list;
    },

    mobileLayout() {
      return this.$store.state.options.mobileLayout;
    },

    articleList() {
      return this.$store.state.archives.art;
    }
  },

  created() {},

  filters: {
    monthFilter(val) {
      switch (val) {
        case 1:
          return 'January';
        case 2:
          return 'February';
        case 3:
          return 'March';
        case 4:
          return 'April';
        case 5:
          return 'May';
        case 6:
          return 'June';
        case 7:
          return 'July';
        case 8:
          return 'August';
        case 9:
          return 'September';
        case 10:
          return 'October';
        case 11:
          return 'November';
        case 12:
          return 'December';
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';
@import '~assets/scss/style.scss';
</style>
