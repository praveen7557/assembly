import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from 'types/post';

import './Home.scss';

interface Props {
  posts: Post[];
}

export const Home: FunctionComponent<Props> = ({ posts }) => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState<Post[]>([]);

  useEffect(() => {
    setList(posts.filter(({ title }) => title.toLowerCase().indexOf(search.toLowerCase()) > -1));
  }, [posts, search]);

  const onSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  };

  const onSearchClear = () => {
    setSearch('');
  };

  // https://www.behance.net/gallery/65535447/Reddit-Redesign

  // https://www.behance.net/gallery/124311023/Reddit-Redesign-Concept-Case-Study?tracking_source=search_projects_null

  return (
    <div className="home">
      <div className="list">
        <div className="search-container">
          <div className="text-box">
            <span className="icon">&#128269;</span>
            <input type="text" value={search} onChange={onSearchChange} placeholder="Search Posts" className="search" />
            {search ? (
              <div className="close" role="button" title="Clear Search" onClick={onSearchClear}>
                &#x2715;
              </div>
            ) : null}
          </div>
        </div>
        <div className="posts">
          {list.map(({ title, thumbnail, author, id, ups, num_comments }) => (
            <Link to={`/post/${id}`} key={id} className="post-link">
              <div className="post">
                <div className="image">
                  <img src={thumbnail} alt={title} />
                </div>
                <div className="info">
                  <div className="title">{title}</div>
                  <div className="author">Posted by {author}</div>
                  <div className="details">
                    {ups} upvotes, {num_comments} comments
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
