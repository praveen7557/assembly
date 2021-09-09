import { rest } from 'msw';

export const children = Array.from({ length: 5 }, (v, i) => {
  return {
    data: {
      title: `Post ${i + 1}`,
      author: `Author ${i + 1}`,
      thumbnail: `http://thumbnail ${i + 1}`,
      url: `url ${i + 1}`,
      id: `id${i + 1}`,
      ups: 100 * (i + 1),
      num_comments: 10 * (i + 1),
    },
  };
});

export const postsData = {
  data: {
    children,
  },
};

export const handlers = [
  rest.get('https://www.reddit.com/r/pics/.json', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postsData));
  }),
];
