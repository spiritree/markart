<template>
  <footer id="footer" class="footer bg-white">
    <div class="footer-meta">
      <div class="footer-container">
        <div class="meta-item meta-copyright">
          <div class="meta-copyright-info">
            <div class="info-text">
              <p>© 2018 </p>
            </div>
          </div>
        </div>
        <div class="meta-item meta-posts">
          <h3 class="meta-title">
            RECENT POSTS
          </h3>
          <li v-for="item in articleList" :key="item.id">
            <nuxt-link :to="`/article/${item._id}`">{{ item.title }}</nuxt-link>
          </li>
        </div>
        <div class="meta-item meta-comments">
          <h3 class="meta-title">
            RECENT COMMENTS
          </h3>
          <li v-for="item in commentList" :key="item.id">
            <p>{{ item.author.name }}: {{ item.content }}</p>
          </li>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',

  computed: {
    articleList() {
      const list = this.$store.state.article.art.list;
      const newList = list.slice(0, 8);
      return newList;
    },

    commentList() {
      return this.$store.state.recentComment.data.data;
    },

    mobileLayout() {
      return this.$store.state.options.mobileLayout;
    },

    option() {
      return this.$store.state.options.option;
    },

    user() {
      return this.$store.state.options.adminInfo;
    }
  },

  mounted() {
    this.loadComemntList({ page_size: 8 });
    console.log(this);
  },

  methods: {
    async loadComemntList(params = {}) {
      const res = await this.$store.dispatch('getComment', {
        ...params
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import '~assets/scss/variable.scss';
@import '~assets/scss/style.scss';

.footer {
  margin-top: 50px;
  border-top: 1px solid rgba(184, 197, 214, 0.2);
}
</style>

