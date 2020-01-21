const AttentionShowContent = () => import(/* webpackChunkName: "attentionShowContent" */ "../../components/ShowDetailsContent");
const RecommendShowContent = () => import(/* webpackChunkName: "recommendShowContent" */ "../../components/ShowDetailsContent");
const ShowDetailsContent = () => import(/* webpackChunkName: "showDetailsContent" */ "../../components/ShowDetailsContent");

const community = [
  {
    path: "/",
    name: "community",
    component: RecommendShowContent
  },
  {
    path: "/community/attention-show-content",
    name: "attention-show-content",
    component: AttentionShowContent
  },
  {
    path: "/community/show-details-content/:tabId",
    name: "show-details-content",
    component: ShowDetailsContent,
    props: true
  }
]

export default community;
