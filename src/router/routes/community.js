const ShowDetailsContent = () => import(/* webpackChunkName: "showDetailsContent" */ "../../components/ShowDetailsContent");

const community = [
  {
    path: "/",
    name: "community",
  },
  {
    path: "/community/show-details-content/:tabId",
    name: "show-details-content",
    component: ShowDetailsContent,
    props: true
  }
]

export default community;
