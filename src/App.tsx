import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from 'views/home/Home';
import { Post } from 'views/post/Post';

const App: FunctionComponent = ({}) => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post/67">Post</Link>
          </li>
        </ul>
      </div>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/post/:id">
          <Post />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
