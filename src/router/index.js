import Vue from "vue";
import Router from "vue-router";
import loginStore from "@/store/community/login";
import community from "./routes/community";
import { sessionSetItem } from "../common/util";
// 解决 3.0.0 以上版本 vue-router 报错。
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
/**
 * 按需（懒）加载路由。
 * @param { String } webpackChunkName 打包之后的包名。
 */
const Home = () => import(/* webpackChunkName: "home" */ "../views/home/index");
const Community = () =>
  import(/* webpackChunkName: "community" */ "../views/community/index");
const ShopCart = () =>
  import(/* webpackChunkName: "shopCart" */ "../views/shopCart/index");
const My = () => import(/* webpackChunkName: "my" */ "../views/my/index");
const PersonalHomepage = () =>
  import(
    /* webpackChunkName: "personalHomepage" */ "../views/community/personalHomepage"
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
      name: "home",
      // redirect: "/community/show-details-content/recommend",
      component: Home
    },
    {
      path: "/community",
      component: Community,
      redirect: "/community/show-details-content/recommend",
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
      path: "/showDetailsPage",
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
      path: "/shop-cart",
      name: "shop-cart",
      component: ShopCart
    },
    {
      path: "/my",
      name: "my",
      component: My
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
 * * 1. 把 tabBar 中的当前选项存在 session 中，防止刷新丢失当前高亮 tabBar 项。
 * * 2. 根据 meta.requiresAuth 来判断页面是否需要鉴权。
 */
router.beforeEach((to, from, next) => {
  // 对子路由做单独判断，防止子路由情况下刷新 tabBar 没有高亮当前项。
  if (to.name === "show-details-content") {
    sessionSetItem("tabBar", "community");
  } else {
    sessionSetItem("tabBar", to.name);
  }
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
