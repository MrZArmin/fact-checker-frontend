import BaseEntity from '@/entities/BaseEntity';

export default class Message extends BaseEntity {
  sender = null;
  message = null;

  constructor(rawData) {
    super();
    this.updateWith(rawData);
  }
}
