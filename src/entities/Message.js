import BaseEntity from '@/entities/BaseEntity';
import Article from '@/entities/Article';

export default class Message extends BaseEntity {
  sender = null;
  message = null;
  valuable_info = null;
  articles = [];

  _entityArrayFields = {
    articles: Article,
  }

  constructor(rawData) {
    super();
    if (!rawData.articles) {
      rawData.articles = [];
    }

    this.updateWith(rawData);
  }
}
