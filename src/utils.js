const parseParentQuery = (parent) => {
  return `&parent=${parent.join('&parent=')}`;
};

export {
  parseParentQuery
};
