const ShowDetailsContentRecommend = () => import(/* webpackChunkName: "showDetailsContentRecommend" */ "../../components/ShowDetailsContentRecommend");
const ShowDetailsContentAttention = () => import(/* webpackChunkName: "showDetailsContentAttention" */ "../../components/ShowDetailsContentAttention");
const ShowDetailsContent = () => import(/* webpackChunkName: "showDetailsContent" */ "../../components/ShowDetailsContent");

const community = [
  {
    path: "/",
    name: "community",
    redirect: "/community/show-details-content/recommend"
  },
  {
    path: "/community/show-details-content/recommend",
    name: "show-details-content/recommend",
    component: ShowDetailsContentRecommend,
    props: true
  },
  {
    path: "/community/show-details-content/attention",
    name: "show-details-content/attention",
    component: ShowDetailsContentAttention,
    props: true
  },
  {
    path: "/community/show-details-content/?stadium_id=:stadium_id",
    name: "show-details-content",
    component: ShowDetailsContent,
    props: true
  }
]

export default community;
