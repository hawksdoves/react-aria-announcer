const ariaMessages = {
  onToggleButton: () => 'Press shift enter to open toolbar, and navigate using tab ',
  addBlockHelper: type => `Press shift enter to add a new ${type} block`,
  blockAction: (type, action) => `${type} block ${action}`,
  entered: (type) => 'You are now in the text block',
};

export default ariaMessages;
