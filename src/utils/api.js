import axiosReqest from './request.js'

// 请求商品列表
export function getProductList (query) {
  return axiosReqest({
    url: 'product/searchProduct.do',
    method: 'get',
    params: query
  })
}
