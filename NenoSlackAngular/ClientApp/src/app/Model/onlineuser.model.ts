
export class OnlineUser {
  userId: number;
  userName: string;
  connectionIds: string[];
  img: string;
  countUnread: number;
  IsOnline: boolean;
  constructor(userId: number = 0, userName: string = '', connectionIds: string[] = [], img: string = '', countUnread: number = 0,
    IsOnline: boolean = false) {
    this.userId = userId;
    this.userName = userName;
    this.connectionIds = connectionIds;
    this.img = img;
    this.countUnread = countUnread;
    this.IsOnline = IsOnline
  }
}
