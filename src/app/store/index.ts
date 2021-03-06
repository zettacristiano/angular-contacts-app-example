import {ActionReducer, combineReducers} from '@ngrx/store';

import { createSelector } from 'reselect';

import * as fromContacts from './contacts-reducer';

export interface ApplicationState {
  contacts: fromContacts.ContactsState
  // more state here
}

const reducers = {
  contacts: fromContacts.reducer
  // more reducers here
};


// This is useful when we have several types of reducers (other than just contacts)
export const APPLICATION_REDUCER: ActionReducer<ApplicationState> = combineReducers(reducers);

// Application Store's main reducer is created by combining auxiliary reducers
export function reducer(state: any, action: any): ApplicationState {
  return APPLICATION_REDUCER(state, action);
}


/// selectors

// Contacts state main selector
export const getContactsState = (state: ApplicationState): fromContacts.ContactsState => {
  return state.contacts;
};


// createSelector from Reselect library:
// - Selectors can compute derived data, allowing Redux to store the minimal possible state.
// - Selectors are efficient. A selector is not recomputed unless one of its arguments change.
// - Selectors are composable. They can be used as input to other selectors.
export const getCurrentContact = createSelector(getContactsState, fromContacts.getCurrentContact);
export const getAllContacts =  createSelector(getContactsState, fromContacts.getAll);




