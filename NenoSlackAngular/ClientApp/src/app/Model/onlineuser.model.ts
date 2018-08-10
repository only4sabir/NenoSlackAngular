
export class OnlineUser {
  userId: number;
  userName: string;
  connectionIds: string[];
  img: string;
  countUnread: number;
  constructor(userId: number = 0, userName: string = '', connectionIds: string[] = [], img: string = '', countUnread: number = 0) {
    this.userId = userId;
    this.userName = userName;
    this.connectionIds = connectionIds;
    this.img = img;
    this.countUnread = countUnread;
  }
}
