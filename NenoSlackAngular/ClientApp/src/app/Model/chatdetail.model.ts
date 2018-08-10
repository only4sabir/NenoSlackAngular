export class chatDetail {
  chatId: number;
  fromUserId: number;
  toUserId: number;
  createdOn: Date;
  message: string;
  csscls: string;
  IsRead: boolean;
  img: string;
  constructor(chatId: number = 0, fromUserId: number = 0, toUserId: number = 0, createdOn: Date = new Date(), message: string = '', csscls: string = '', IsRead: boolean = true, img: string = '') {
    this.chatId = chatId;
    this.fromUserId = fromUserId;
    this.toUserId = toUserId;
    this.createdOn = createdOn;
    this.message = message;
    this.csscls = csscls;
    this.IsRead = IsRead;
    this.img = img;
  }
}
