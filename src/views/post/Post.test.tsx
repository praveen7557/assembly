import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Post } from './Post';
import { children, postsData } from 'mocks/handlers';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

const posts = children.map((child) => child.data);

const renderComponent = (id: string) =>
  render(
    <MemoryRouter initialEntries={[`/post/${id}`]}>
      <Route path="/post/:id">
        <Post posts={posts} />
      </Route>
    </MemoryRouter>,
  );

describe('test Home component', () => {
  test('should show post details', async () => {
    const { getByText, getByAltText } = renderComponent('id1');

    expect(getByText(postsData.data.children[0].data.title)).toBeInTheDocument();
    expect(getByText(postsData.data.children[0].data.author, { exact: false })).toBeInTheDocument();
    expect(getByAltText(postsData.data.children[0].data.title)).toBeInTheDocument();
  });
});
