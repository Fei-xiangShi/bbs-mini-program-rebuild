import User from "./userInfo";

export default class Article {
  id: number = 0;
  title: string = "";
  content: string = "";
  tag: string = "";
  gmtCreate: number = 0;
  gmtModified: number = 0;
  viewCount: number = 0;
  commentCount: number = 0;
  likeCount: number = 0;
  description: string = "";
  author: User = new User();
  status: number = 0;
  visibility: number = 1;
  thumbnailUrl: string = "";
  category: number = 0;
}
