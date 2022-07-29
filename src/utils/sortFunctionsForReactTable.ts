export const sortStatus = (rowA: { status: any }, rowB: { status: any }) => {
  const a = rowA.status ? 1 : 0;
  const b = rowB.status ? 1 : 0;

  if (a < b) return 1;

  if (b < a) return -1;

  return 0;
};

export const sortBookmark = (
  rowA: { bookmark: any },
  rowB: { bookmark: any }
) => {
  const a = rowA.bookmark ? 1 : 0;
  const b = rowB.bookmark ? 1 : 0;

  if (a < b) return 1;

  if (b < a) return -1;

  return 0;
};
