const ariaMessages = {
  moveBlock: (type, action) => `${type} block has moved ${action}`,
  addBlockHelper: type => `Press shift enter to add a new ${type} block`,
  blockAction: (type, action) => `${type} block ${action}`,
  entered: (type) => `You are now in the ${type} block`,
};

export default ariaMessages;
