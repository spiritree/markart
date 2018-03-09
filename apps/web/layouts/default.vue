<template>
  <div class="app">
    <div class="app-aside" v-if="mobileLayout" :class="{ open: mobileSidebar }" v-click-outside="hideSide">
      <mobile-aside></mobile-aside>
    </div>
    <div class="app-main" :class="{ open: mobileSidebar }">
      <div class="head-box">
        <mobile-header v-if="mobileLayout"></mobile-header>
        <Header v-else></Header>
      </div>
      <transition-group tag="div" class="main-container clearfix " name="slide-up">
        <div
          key="1"
          class="full-page"
        >
          <nuxt></nuxt>
        </div>
      </transition-group>
    </div>
    <Footer></Footer>
    <scoll-top></scoll-top>
  </div>
</template>


<script>
const components = {
  Footer: () => import('~/components/layouts/footer.vue'),
  Header: () => import('~/components/layouts/header.vue'),
  mobileHeader: () => import('~/components/mobile/header.vue'),
  mobileAside: () => import('~/components/mobile/aside.vue'),
  scollTop: () => import('~/components/layouts/scollTop.vue')
}

export default {
  components,

  head() {
    return !this.mobileLayout
      ? {}
      : {
          bodyAttrs: {
            class: 'mobile'
          }
        };
  },

  computed: {
    isAsdiePage() {
      return this.$store.state.options.isAsidePage;
    },

    mobileLayout() {
      return this.$store.state.options.mobileLayout;
    },

    mobileSidebar() {
      return this.$store.state.options.mobileSidebar;
    }
  },

  methods: {
    hideSide() {
      this.$store.commit('options/SET_MOBILE_SIDEBAR', false);
    }
  },

  mounted() {}
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.head-box {
  margin-top: 4rem;
}

.app {
  > .app-aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100%;
    width: 60%;
    background: $white;
    @include css3-prefix('transform', 'translateX(-100%)');
    @include transition(all 0.3s ease-out);

    > .mobile-aside {
      opacity: 0;
      @include transition(all 0.3s ease-out);
      @include css3-prefix('transform', 'scale(.8)');
    }
  }

  > .app-aside.open {
    @include css3-prefix('transform', 'translateX(0)');

    > .mobile-aside {
      opacity: 1;
      @include css3-prefix('transform', 'scale(1)');
    }
  }

  > .app-main {
    @include transition(all 0.3s ease-out);

    > .main-container {
      min-height: calc(100vh - 156px);
      margin-top: $normal-pad;
    }

    > .main-container.mobile {
      min-height: calc(100vh - 56px);
    }
  }

  > .app-main.open {
    transform: translateX(60%);
  }
}

.content-left {
  position: relative;
  width: $container-left;
  float: left;
  @include css3-prefix(transition, all 0.3s cubic-bezier(1, 0.5, 0.8, 1));
}

.content-left.full-page,
.content-left.mobile-layout {
  width: 100%;
  @include css3-prefix(transition, width 0.5s cubic-bezier(1, 0.5, 0.8, 1));
}

.content-left.mobile-layout {
  width: 100%;
  margin: 0;
  padding: 1rem;
  padding-top: 4.5rem;
}

.content-right {
  width: $container-right;
  float: right;
}

.mobile {
  width: 100%;
}
</style>
