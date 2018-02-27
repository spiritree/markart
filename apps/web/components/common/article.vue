<template>

    <transition-group tag="div" name="slide-down" class="article-box" :class="{'mobile': mobileLayout}">
      <div
        class="post-onelist-item"
        v-for="item in articleList"
        :key="item._id"
        :class="{'mobile-article': mobileLayout}">
        <div class="post-onelist-item-container">
          <!-- <p class="title"><nuxt-link :to="`/article/${item._id}`">{{ item.title }}</nuxt-link></p> -->
          <nuxt-link :to="`/article/${item._id}`">
            <div class="onelist-item-thumb  bg-deepgrey">
            </div>
          </nuxt-link>
          <nuxt-link :to="`/article/${item._id}`" v-if="mobileLayout">
            <img :src="item.thumb + '?imageView2/1/w/350/h/180/watermark/2/text/amtjaGFvLmNu/font/Y2FuZGFyYQ==/fontsize/400/fill/I0ZGRkZGRg=='"
            alt=""
            width="100%"
            class="mobil-img"/>
          </nuxt-link>
          <div class="onelist-item-info">
            <div class="item-title"><nuxt-link :to="`/article/${item._id}`">{{ item.title }}</nuxt-link></div>
            <div class="item-meta">
              Published on {{
                item.create_at | dateFormat('yyyy.MM.dd')
              }}
            </div>
            <div class="item-meta-hr  bg-deepgrey"></div>
            <div class="item-content"> {{ item.descript }}</div>
            <div class="item-readmore"><nuxt-link :to="`/article/${item._id}`"> Continue Reading → </nuxt-link></div>
          </div>
        </div>
        <span class="article-line"></span>
      </div>
      <div class="end-article" v-if="!haveMoreArt" key="-1">
        <i>end</i>
      </div>
      <div class="loading-more end-article " v-if="haveMoreArt" key="-2">
        <button @click="$emit('loadMore')" v-if="!fetch" class="allow article-button"><i>Fetch More</i></button>
        <a href="javascript:;" v-if="fetch" class="not-allow">
          <div style="margin: 10%;">
            <content-placeholders>
              <content-placeholders-heading :img="true" />
              <content-placeholders-text :lines="3" />
            </content-placeholders>
          </div>
        </a>
      </div>
    </transition-group>

</template>

<script>
import ContentPlaceholders from '~/components/placeholder/ContentPlaceholders.vue';
import ContentPlaceholdersHeading from '~/components/placeholder/ContentPlaceholdersHeading.vue';
import ContentPlaceholdersText from '~/components/placeholder/ContentPlaceholdersText.vue';

export default {
  name: 'article-box',

  props: ['articleList', 'haveMoreArt'],

  components: {
    ContentPlaceholders,
    ContentPlaceholdersHeading,
    ContentPlaceholdersText
  },

  computed: {
    fetch() {
      return this.$store.state.article.fetch;
    },

    mobileLayout() {
      return this.$store.state.options.mobileLayout;
    }
  }
};
</script>

<style scoped lang="scss">
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';
@import '~assets/scss/style.scss';

@mixin loading-position {
  text-align: center;
  margin-top: 16px;
}

.article-box {
  display: block;
  // width: $container-left;
  margin: 0 auto;
  margin-bottom: 3rem;
}

.loading-more {
  @include loading-position;
}

.end-article {
  @include loading-position;
}

.article-button {
  line-height: 1.5;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  height: 32px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;
}
</style>
