import { LOAD_USERS } from '../actionTypes';

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case LOAD_USERS:
      return (
        action.payload
      )
    default:
      return state;
  }
}
