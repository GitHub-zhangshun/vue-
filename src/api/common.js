/**
 * 请求统一管理，所有接口获取的第一步操作都写在这里。
 * 之后的页面需要使用哪个接口的数据，就直接在当前页引入对应的方法获取数据即可。
 */
import Request from '../common/request';

// export const rankGender = data => Request.get('/ranking/gender', data);
/**
 * community module api
 * @param waterFallData 社区瀑布流数据
 * @param userDetailsData 社区 show 详情用户数据
 */
export const waterFallData = data => Request.get(`/js/water-fall-data.json`);
export const userDetailsData = data => Request.get(`/js/show-details-data.json`);
