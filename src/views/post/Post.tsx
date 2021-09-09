import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post as PostType } from 'types/post';

import './Post.scss';

interface Props {
  posts: PostType[];
}

interface RouteParams {
  id: string;
}

export const Post: FunctionComponent<Props> = ({ posts }) => {
  const [post, setPost] = useState<PostType>();
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    setPost(posts.find((post) => post.id === id));
  }, []);

  return (
    <div className="post-details">
      <h3 className="title">{post?.title}</h3>
      <div className="author">by {post?.author}</div>
      <div className="image">
        <img src={post?.url} alt={post?.title} />
      </div>
      <Link to="/" className="go-home">
        Go Home
      </Link>
    </div>
  );
};
