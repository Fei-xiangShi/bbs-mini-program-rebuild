import User from "./userInfo";

export default class Reply {
  id = 0;
  passageId = 0;
  author = new User();
  content = "";
  gmtCreate = 0;
  isDelete = false;
  rootReplyId = null;
  parentReplyId = null;
}
