import { http } from "./request";
import apiUrl from "@/config/apiConfig";

const Api = {
  //获得ip信息
  getIpInfo: () => http.get(apiUrl.getIpInfo, {}),
  // 获取登录状态
  getJwtIsExpired: () => http.get("/", {}),
  // 获取首页数据
  frontPage: () => http.get(apiUrl.frontPage, {}),
  // 获取帖子数据
  getArticleById: (id: number) =>
    http.get(apiUrl.getArticleById + id, { id: id }),
  getArticleList: (page: number) =>
    http.get(apiUrl.getArticleList, { page: page }),
  getArticleListByCategory: (category: number, page: number) =>
    http.get(apiUrl.getArticleListByCategory + category, {
      page: page,
    }),
  searchArticle: (
    method: "BY_ID" | "BY_AUTHOR_OR_TITLE",
    condition: string | number,
    page: number
  ) =>
    http.get(apiUrl.searchArticle, {
      method: method,
      condition: condition,
      page: page,
    }),
  publishArticle: (article: object) =>
    http.post(apiUrl.publishArticle, article),
  likeArticle: (id: number) => http.get(apiUrl.likeArticle + id, {}),
  reply: (id: number, reply: object) => http.post(apiUrl.reply + id, reply),
  getReplyList: (id: number, page: number) =>
    http.get(apiUrl.reply + id, { page: page }),
  getSecondaryReplyList: (id: number, page: number, root: number) =>
    http.get(apiUrl.reply + id, { page: page, rootReplyId: root }),
  // 登录
  swuLogin: (accountPack: object) => http.post(apiUrl.swuLogin, accountPack),
  // 获取用户信息
  home: () => http.get(apiUrl.home, {}),
  modifyPersonalInfo: (user: object) => http.post(apiUrl.home, user),
  // 获取菜单
  getMenu: () => http.get(apiUrl.getMenu, {}),
  // 获取课程表
  getClassTable: () => http.get(apiUrl.getClassTable, {}),
};

export default Api;
