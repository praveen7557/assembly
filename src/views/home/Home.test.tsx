import { render, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './Home';
import { children, postsData } from 'mocks/handlers';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

const posts = children.map((child) => child.data);

const renderHomeComponent = () =>
  render(
    <BrowserRouter>
      <Home posts={posts} />
    </BrowserRouter>,
  );

describe('test Home component', () => {
  test('should show 5 posts in Home page', async () => {
    const { getAllByRole } = renderHomeComponent();

    await waitFor(() => getAllByRole('link'));
    expect(getAllByRole('link').length).toBe(postsData.data.children.length);
  });

  test('should have Post 1 and Author 1 in document', async () => {
    const { getByText } = renderHomeComponent();

    expect(getByText(postsData.data.children[0].data.title)).toBeInTheDocument();
    expect(getByText(postsData.data.children[0].data.author, { exact: false })).toBeInTheDocument();
  });

  test('should change search value', async () => {
    const { getByRole, queryAllByRole, queryByTitle } = renderHomeComponent();
    const searchInput = getByRole('textbox', { name: 'Search Posts' });
    fireEvent.change(searchInput, { target: { value: 'Post 1' } });
    expect(queryAllByRole('link').length).toBe(1);
    fireEvent.change(searchInput, { target: { value: 'No Post' } });
    expect(queryAllByRole('link').length).toBe(0);
    const cancelSearch = queryByTitle('Clear Search');
    fireEvent.click(cancelSearch!);
    expect(searchInput).toHaveValue('');
  });
});
