<template>
  <div class="mobile-aside">
    <div class="user-head">
    </div>
      <nav>
        <li
        v-for="(list, index) in nav"
        :key="index"
        class="nav-list "
        >
          <nuxt-link
            :to="list.path"
            exact>
              <span>{{ list.name }}</span>
          </nuxt-link>
        </li>
      </nav>
  </div>
</template>

<script>
export default {
  name: 'mobile-aside',
  data() {
    return {
      nav: [
        { path: '/', name: 'HOME', icon: 'iconfont icon-' },
        { path: '/about', name: 'ABOUT ME', icon: 'iconfont icon-' },
        { path: '/archives', name: 'ARCHIVES', icon: 'iconfont icon-' }
      ],
    };
  },

  computed: {
    user() {
      return this.$store.state.options.adminInfo;
    },
  }
};
</script>

<style scoped lang="scss">
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.mobile-aside {
  position: relative;
  height: 100%;

  > .user-head {
    padding: 3.5rem 1rem 1rem 1rem;
    text-align: center;

    > img {
      border-radius: 50%;
      width: 8rem;
    }

    > p {
      margin-top: $mlg-pad;
      color: $black;
      font-size: 1.6rem;
    }
  }
  > nav {
    margin-top: $mlg-pad;
    .nav-list {
      padding: 1rem;
      text-align: center;
    }
    a {
      margin-right: 0rem;
      padding: 0.5rem;
      color: $disabled;

      i {
        margin-right: 0.8rem;
      }

      &:hover {
        color: $black;
      }
    }

    a.link-active {
      color: $black;
    }
  }

  > .aside-foot {
    position: absolute;
    bottom: $mlg-pad;
    left: 50%;
    width: 100%;
    font-size: $font-size-small;
    color: $disabled;
    text-align: center;
    transform: translate(-50%);
  }
}
</style>
