const ShowDetailsContent = () => import(/* webpackChunkName: "showDetailsContent" */ "../../components/ShowDetailsContent");

const community = [
  {
    path: "/community/show-details-content/:tabId",
    name: "show-details-content",
    component: ShowDetailsContent
  }
]

export default community;
