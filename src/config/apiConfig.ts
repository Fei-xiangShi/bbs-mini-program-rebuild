import SiteConfig from "@/config/requestUrl";

const Url = {
  // ip
  getIpInfo: "http://ip-api.com/json/?lang=zh-CN",
  // 天气
  getWeather: "/weather",
  // 主页
  frontPage: "/frontPage",
  // 文章
  getArticleById: SiteConfig.passageUrl + "/",
  getArticleList: SiteConfig.passageUrl + "/articleList",
  getArticleListByCategory: SiteConfig.passageUrl + "/articleList/",
  searchArticle: SiteConfig.passageUrl + "/search",
  publishArticle: SiteConfig.passageUrl + "/publish",
  likeArticle: SiteConfig.passageUrl + "/like/",
  reply: SiteConfig.passageUrl + "/reply/",
  // 登录
  swuLogin: "/swuLogin",
  // 家
  home: "/home",
  // 菜单
  getMenu: "/menu",
  // 课表
  getClassTable: "/classTable",
  // 电费
  getElectricityExpense: "/electricityExpense",
  // 成绩
  getGrades: "/grades",
};

export default Url;
