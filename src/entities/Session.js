import BaseEntity from '@/entities/BaseEntity';
import Message from '@/entities/Message';

export default class Session extends BaseEntity {
  id = null;
  messages = [];
  title = null;
  updated_at = null;
  created_at = null;
  isLoading = false;
  
  _entityArrayFields = {
    messages: Message,
  }

  constructor(rawData) {
    super();
    this.updateWith(rawData);
  }

  addMessage(message) {
    this.messages.push(message);
  }

  setMessages(messages) {
    this.messages = messages;
  }

  setLoading(loading) {
    this.isLoading = loading;
  }

  get isEmpty() {
    return this.messages.length === 0;
  }
}
