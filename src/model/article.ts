import User from "./userInfo";

export default class Article {
  id = 0;
  title = "";
  content = "";
  tag = "";
  gmtCreate = 0;
  gmtModified = 0;
  viewCount = 0;
  commentCount = 0;
  likeCount = 0;
  description = "";
  author = new User();
  status = 0;
  visibility = 0;
  thumbnailUrl = "";
  category = 0;
}
