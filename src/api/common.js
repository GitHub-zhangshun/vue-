/**
 * 请求统一管理，所有接口获取的第一步操作都写在这里。
 * 之后的页面需要使用哪个接口的数据，就直接在当前页引入对应的方法获取数据即可。
 */
import Request from '../common/request';

/* Common */
// export const rankGender = data => Request.get('/ranking/gender', data);
export const waterFallData = data => Request.get(`/js/data.json`);
