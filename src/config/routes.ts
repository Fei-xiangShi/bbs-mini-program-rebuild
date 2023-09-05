const RouteConfig = {
  // login
  login: {
    name: "登录",
    path: "/pages/login/login",
  },
  // tabbar
  index: {
    name: "首页",
    path: "/pages/index/index",
  },
  bbs: {
    name: "樟树林论坛",
    path: "/pages/bbs/bbs",
  },
  classTable: {
    name: "课程表",
    path: "/pages/classTable/classTable",
  },
  // home
  home: {
    name: "个人中心",
    path: "/pages/home/home",
  },
  modifyPersonalInfo: {
    name: "修改个人信息",
    path: "/pages/home/modifyPersonalInfo"
  },
  // index
  toolbox: [
    {
      icon: "photo",
      name: "校历",
      path: "/pages/tool/schoolSchedule",
    },
    {
      icon: "photo",
      name: "成绩",
      path: "/pages/tool/grade",
    },
    {
      icon: "photo",
      name: "猫咖",
      path: "/pages/catCafe/catCafe",
    },
    {
      icon: "photo",
      name: "教室",
      path: "/pages/tool/classroom",
    },
    {
      icon: "photo",
      name: "水电",
      path: "/pages/tool/ElectricityExpense",
    },
    {
      icon: "photo",
      name: "校车",
      path: "",
    },
    {
      icon: "photo",
      name: "反馈",
      path: "",
    },
    {
      icon: "photo",
      name: "关于",
      path: "/pages/tool/about",
    },
  ],
  // bbs
  articlePublish: {
    name: "发帖",
    path: "/pages/bbs/articlePublish",
    query: "articleId",
  },
  articleDetail: {
    name: "帖子详情",
    path: "/pages/bbs/articleDetail",
    query: "articleId",
  },
};

export default RouteConfig;
