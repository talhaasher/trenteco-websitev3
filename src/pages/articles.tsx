import { articles } from '../../app/data/data';

export default function ArticlesPage() {
  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id} style={{ marginBottom: 32 }}>
            <h2>{article.title}</h2>
            <p>
              <strong>By:</strong> {article.author} | <strong>Category:</strong> {article.category} | <strong>{article.read_time}</strong>
            </p>
            <p><em>{article.excerpt}</em></p>
            <p>{article.content}</p>
            <div>
              <strong>Tags:</strong> {article.tags?.join(', ')}
            </div>
            <div>
              <small>Published: {new Date(article.created_at).toLocaleDateString()}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}