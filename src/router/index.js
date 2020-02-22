import Vue from "vue";
import Router from "vue-router";
import loginStore from "@/store/community/login";
import community from "./routes/community";
// 解决 3.0.0 以上版本 vue-router 报错。
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
/**
 * 按需（懒）加载路由。
 * @param { String } webpackChunkName 打包之后的包名。
 */
const Community = () =>
  import(/* webpackChunkName: "community" */ "../views/community/index");
const PersonalHomepage = () =>
  import(
    /* webpackChunkName: "personalHomepage" */ "../views/community/personalHomepage"
  );
const OthersHomepage = () =>
  import(
    /* webpackChunkName: "othersHomepage" */ "../views/community/othersHomepage"
  );
const ChangePersonalPageBg = () =>
  import(
    /* webpackChunkName: "changePersonalPageBg" */ "../views/community/changePersonalPageBg"
  );
const ChangePersonalInfo = () =>
  import(
    /* webpackChunkName: "changePersonalInfo" */ "../views/community/changePersonalInfo"
  );
const PersonalInteraction = () =>
  import(
    /* webpackChunkName: "personalInteraction" */ "../views/community/personalInteraction"
  );
const OthersInteraction = () =>
  import(
    /* webpackChunkName: "othersInteraction" */ "../views/community/othersInteraction"
  );
const ShowTagsPage = () =>
  import(
    /* webpackChunkName: "showTagsPage" */ "../views/community/showTagsPage"
  );
const TagDetailsPage = () =>
  import(
    /* webpackChunkName: "tagDetailsPage" */ "../views/community/tagDetailsPage"
  );
const ShowDetailsPage = () =>
  import(
    /* webpackChunkName: "showDetailsPage" */ "../views/community/showDetailsPage"
  );
const Shield = () =>
  import(/* webpackChunkName: "shield" */ "../views/community/shieldPage");

Vue.use(Router);
// 动态获取二级目录。
let base = `${process.env.BASE_URL}`;
// 实例化路由。
const router = new Router({
  // 路由有两种模式：history、hash，想要不带 # 号就选 history，但是需要后端配合。默认是 hash 模式，只需要前端工作就行了。
  mode: "hash",
  base: base,
  routes: [
    {
      path: "/",
      component: Community,
      children: community
    },
    {
      path: "/personalHomepage",
      name: "personalHomepage",
      component: PersonalHomepage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/othersHomepage/?userId=:user_id",
      name: "othersHomepage",
      component: OthersHomepage
    },
    {
      path: "/changePersonalPageBg",
      name: "changePersonalPageBg",
      component: ChangePersonalPageBg
    },
    {
      path: "/changePersonalInfo",
      name: "changePersonalInfo",
      component: ChangePersonalInfo
    },
    {
      path: "/personalInteraction/?userId=:userId",
      name: "personalInteraction",
      component: PersonalInteraction
    },
    {
      path: "/othersInteraction/?userId=:userId",
      name: "othersInteraction",
      component: OthersInteraction
    },
    {
      path: "/showDetailsPage/?id=:id",
      name: "showDetailsPage",
      component: ShowDetailsPage
    },
    {
      path: "/showTagsPage",
      name: "showTagsPage",
      component: ShowTagsPage
    },
    {
      path: "/tagDetailsPage/?tag_id=:tag_id",
      name: "tagDetailsPage",
      component: TagDetailsPage
    },
    {
      path: "/shield",
      name: "shield",
      component: Shield
    },
    {
      path: "*",
      redirect: "/"
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果存在记录位置，保持路由跳转页面位置不变。
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});
/**
 * 全局导航守卫。
 * * 1. 根据 meta.requiresAuth 来判断页面是否需要鉴权。
 */
router.beforeEach((to, from, next) => {
  // 根据路由 meta.requiresAuth 判断页面是否需要鉴权。
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断当前是否有登录的权限。
    if (!loginStore.state.token) {
      console.info('请登录');
      next({
        path: "/community/show-details-content/recommend"
        // query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
  // return next();
});

export default router;
