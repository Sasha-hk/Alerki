import UsernamesJson = require('@Config/api/json/username-block-list.json');

export const UsernameBlockList = new Set(UsernamesJson);
