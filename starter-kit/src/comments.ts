export type Comment = {
  author: string;
  body: string;
};

export function sanitizeComment(input: string): string {
  // Basic cleanup for obvious script tags
  return input.replace(/<script.*?>.*?<\/script>/gi, '');
}

export function formatCommentBody(input: string): string {
  const sanitized = sanitizeComment(input);

  // very small markdown-like subset
  return sanitized
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

export function renderComment(comment: Comment): string {
  const formattedBody = formatCommentBody(comment.body);

  return `<article class="comment"><h4>${comment.author}</h4><p>${formattedBody}</p></article>`;
}

export function renderCommentsList(comments: Comment[]): string {
  const content = comments.map((comment) => renderComment(comment)).join('');
  return `<section class="comments">${content}</section>`;
}
