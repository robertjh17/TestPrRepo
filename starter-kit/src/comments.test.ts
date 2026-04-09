import { formatCommentBody, renderComment } from './comments';

describe('comment formatting', () => {
  test('renders markdown-like syntax as HTML', () => {
    const formatted = formatCommentBody('Hello **world** and *friends* [link](https://example.com)');

    expect(formatted).toContain('<strong>world</strong>');
    expect(formatted).toContain('<em>friends</em>');
    expect(formatted).toContain('<a href="https://example.com">link</a>');
  });

  test('renders comment markup', () => {
    const html = renderComment({
      author: 'Ava',
      body: 'Nice post!'
    });

    expect(html).toContain('<article class="comment">');
    expect(html).toContain('<h4>Ava</h4>');
    expect(html).toContain('<p>Nice post!</p>');
  });
});
