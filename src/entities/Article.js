import BaseEntity from '@/entities/BaseEntity';

export default class Article extends BaseEntity {
  title = null;
  lead = null;
  text = null;
  link = null;
  similarity_score = null;

  constructor(rawData) {
    super();
    this.updateWith(rawData);
  }

  setArticles(articles) {
    this.articles = articles;
  }
}
