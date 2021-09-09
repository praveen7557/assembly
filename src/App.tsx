import React, { FunctionComponent, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { fetchSubredditPosts } from 'api/subs';
import { Home } from 'views/home/Home';
import { Post } from 'views/post/Post';
import { Post as PostType } from 'types/post';

const App: FunctionComponent = ({}) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const posts = await fetchSubredditPosts('pics');

        setPosts(posts);
      } catch (error) {
        console.log(error); // Could show error here using some toast libraries
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Router>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <Switch>
          <Route exact path="/">
            <Home posts={posts} />
          </Route>
          <Route path="/post/:id">
            <Post posts={posts} />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

export default App;
