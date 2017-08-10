import { NAME_CHANGED } from './types';

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};
