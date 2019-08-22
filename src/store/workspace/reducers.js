import {TOGGLE_PROJECTS_DISPLAY, TOGGLE_MY_LOGS_DISPLAY, TOGGLE_NOTES_DISPLAY,
  TOGGLE_LIFESTYLE_DISPLAY} from './actions';

let defaultState = {
  isProjectsShown: false,
  isMyLogsShown: true,
  isNotesShown: false,
  isLifestyleShown: false
};
export let workspaceReducer = (state = defaultState, action)=>{
  switch (action.type) {
    case TOGGLE_PROJECTS_DISPLAY:
      return {
        ...state,
        isProjectsShown: !state.isProjectsShown,
        isMyLogsShown: false,
        isNotesShown: false,
        isLifestyleShown: false
      };
    case TOGGLE_MY_LOGS_DISPLAY:
      return {
        ...state,
        isProjectsShown: false,
        isMyLogsShown: !state.isMyLogsShown,
        isNotesShown: false,
        isLifestyleShown: false
      };
    case TOGGLE_NOTES_DISPLAY:
      return {
        ...state,
        isProjectsShown: false,
        isMyLogsShown: false,
        isNotesShown: !state.isNotesShown,
        isLifestyleShown: false
      };
    case TOGGLE_LIFESTYLE_DISPLAY:
      return {
        ...state,
        isProjectsShown: false,
        isMyLogsShown: false,
        isNotesShown: false,
        isLifestyleShown: !state.isLifestyleShown
      };
  }
  return state;
};
