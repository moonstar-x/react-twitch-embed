const parseParentQuery = (parent) => {
  return `&parent=${parent.join('&parent=')}`;
};

const getUnknownProps = (props, propTypes) => {
  return Object.keys(props).reduce((unknown, prop) => {
    if (propTypes.hasOwnProperty(prop)) {
      return unknown;
    }

    unknown[prop] = props[prop];
    return unknown;
  }, {});
};

export {
  parseParentQuery,
  getUnknownProps
};
