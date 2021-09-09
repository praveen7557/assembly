import axios from 'api/axios';
import { Post } from 'types/post';

interface PostData {
  data: Post;
}

export const fetchSubredditPosts = async (sub: string): Promise<Post[]> => {
  const res = await axios.get(`/r/${sub}/.json?jsonp=`);

  const posts: Post[] = res.data.data.children.map(
    ({ data: { title, author, thumbnail, url, id, ups, num_comments } }: PostData) => ({
      title,
      author,
      thumbnail,
      url,
      id,
      ups,
      num_comments,
    }),
  );

  return posts.filter((post) => post.thumbnail.indexOf('http') > -1);
};
