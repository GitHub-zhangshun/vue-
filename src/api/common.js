/**
 * 请求统一管理，所有接口获取的第一步操作都写在这里。
 * 之后的页面需要使用哪个接口的数据，就直接在当前页引入对应的方法获取数据即可。
 */
import Request from '../common/request';
/**
 * Community module's api.
 * @param getUserToken 模拟登陆获取用户 token 。
 * @param personalInfoData 用户个人主页数据。
 * @param editPersonalInfo 用户个人主页数据。
 * @param personalAttentionData 关注详细数据。
 * @param personalFansData 粉丝详细数据。
 * @param indexBannerData 社区主页轮播数据。
 * @param indexTagListData 社区主页标签数据。
 * @param listTagsData 列表标签数据。
 * @param tagDetailsData 标签详情页数据。
 * @param showDataBelowTagDetails 标签详情页下 show 数据。
 * @param indexStadiumData 社区主页场馆 item 数据。
 * @param waterFallData 社区瀑布流数据。
 * @param showBannerData 社区 show 商品轮播图数据。
 * @param userDetailsData 社区 show 详情用户数据。
 * @param relatedGoodsData 社区 show 关联商品数据。
 * @param editShowTagsData 社区编辑 show 标签数据。
 * @param productImageData 社区选择产品图详细数据。
 */
export const getUserToken = userInfo => Request.post(`/api/v1/show/login`, userInfo);
export const personalInfoData = data => Request.get(`/api/v1/show/getUser`);
export const editPersonalInfo = userInfo => Request.post(`/api/v1/show/user-info`, userInfo);
export const personalAttentionData = data => Request.get(`/api/v1/show/follows/${data.id}`, data);
export const personalFansData = data => Request.get(`/api/v1/show/fans/${data.id}`, data);
export const indexBannerData = data => Request.get(`/api/v1/show/banners`);
export const indexTagListData = data => Request.get(`/api/v1/show/preview-tags`);
export const listTagsData = data => Request.get(`/api/v1/show/tags`);
export const tagDetailsData = data => Request.get(`/api/v1/show/tags/${data}`);
export const showDataBelowTagDetails = data => Request.get(`/api/v1/show/tags/${data}/shows`);
export const indexStadiumData = data => Request.get(`/api/v1/show/stadiums`);
export const waterFallData = (param, headers) => Request.get(`/api/v1/show/list`, param, headers);
// export const showBannerData = data => Request.get(`/js/show-banner-data.json`);
// export const userDetailsData = data => Request.get(`/js/show-details-data.json`);
// export const relatedGoodsData = data => Request.get(`/js/show-related-data.json`);
// export const editShowTagsData = data => Request.get(`/js/showEdit-tags-data.json`);
export const productImageData = type => Request.get(`/api/v1/show/create-products/${type}`, type);
/**
 * Common api.
 * @param commonUploadSingleImg 通用上传单张图片接口。
 * @param unFollowUser 通用关注、取关用户接口。
 * @param deleteUser 通用删除粉丝接口。
 */
export const commonUploadSingleImg = (status, imgFile) => Request.file(`/api/v1/show/upload-image?status=${status}`, imgFile);
export const unFollowUser = userId => Request.post(`/api/v1/show/follow/${userId}`, userId);
export const deleteUser = userId => Request.post(`/api/v1/show/del-fans/${userId}`, userId);
