/**
 * 请求统一管理，所有接口获取的第一步操作都写在这里。
 * 之后的页面需要使用哪个接口的数据，就直接在当前页引入对应的方法获取数据即可。
 */
import Request from '../common/request';

// export const rankGender = data => Request.get('/ranking/gender', data);
/**
 * community module api
 * @param indexBannerData 社区主页轮播图数据
 * @param indexTagListData 社区主页标签图数据
 * @param waterFallData 社区瀑布流数据
 * @param showBannerData 社区 show 商品轮播图数据
 * @param userDetailsData 社区 show 详情用户数据
 * @param relatedGoodsData 社区 show 关联商品数据
 */
export const indexBannerData = data => Request.get(`/js/community-banner-data.json`);
export const indexTagListData = data => Request.get(`/js/community-tag-list-data.json`);
export const waterFallData = data => Request.get(`/js/water-fall-data.json`);
export const showBannerData = data => Request.get(`/js/show-banner-data.json`);
export const userDetailsData = data => Request.get(`/js/show-details-data.json`);
export const relatedGoodsData = data => Request.get(`/js/show-related-data.json`);
