import { render, cleanup, waitFor } from '@testing-library/react';
import App from './App';
import { postsData } from 'mocks/handlers';
import { server, rest } from 'mocks/server';
import { act } from 'react-dom/test-utils';
import { ReactElement, ReactNode } from 'react-router/node_modules/@types/react';
import { BrowserRouter } from 'react-router-dom';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Clean up after the tests are finished.
afterAll(() => server.close());

export const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('test App component', () => {
  test('should show loading when api is in progress', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Loading/i)).toBeInTheDocument();
  });

  test('should show 5 posts in Home page', async () => {
    const { getAllByRole } = renderWithRouter(<App />);

    await waitFor(() => getAllByRole('link'));
    expect(getAllByRole('link').length).toBe(postsData.data.children.length);
  });

  test('should have Post 1 and Author 1 in document', async () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);

    await waitFor(() => getAllByRole('link'));
    expect(getByText(postsData.data.children[0].data.title)).toBeInTheDocument();
    expect(getByText(postsData.data.children[0].data.author, { exact: false })).toBeInTheDocument();
  });

  test('should see post details', async () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />, { route: '/post/id1' });

    await waitFor(() => getAllByRole('link'));
    expect(getByText(postsData.data.children[0].data.title)).toBeInTheDocument();
    expect(getByText(postsData.data.children[0].data.author, { exact: false })).toBeInTheDocument();
  });
});
