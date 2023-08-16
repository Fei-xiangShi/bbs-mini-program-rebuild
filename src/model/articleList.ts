//文章列表数据类型
export interface ArticleInfo {
  id: string;
  gmtCreate: number;
  title: string;
  description: string;
  name: string;
  accountId: string;
  avatarUrl: string;
  thumbnailUrl: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
}

export class ArticleList {
  //分页
  page: number = 1;
  //展示的内容数据
  list: ArticleInfo[] = [];
}
