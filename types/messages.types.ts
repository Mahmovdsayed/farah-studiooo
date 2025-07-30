type MessageType = {
  _id: string;
  name: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt?: Date;
  __v?: number;
  email?: string;
  phone?: string;
};

export type { MessageType };
