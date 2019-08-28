export const TOGGLE_PROJECTS_DISPLAY = 'TOGGLE_PROJECTS_DISPLAY';
export const TOGGLE_MY_LOGS_DISPLAY = 'TOGGLE_MY_LOGS_DISPLAY';
export const TOGGLE_NOTES_DISPLAY = 'TOGGLE_NOTES_DISPLAY';
export const TOGGLE_LIFESTYLE_DISPLAY = 'TOGGLE_LIFESTYLE_DISPLAY';
export const TOGGLE_MIGRATE_DATEPICKER = 'TOGGLE_MIGRATE_DATEPICKER';

export let toggleProjectsDisplay = ()=>({type: TOGGLE_PROJECTS_DISPLAY});
export let toggleMyLogsDisplay = ()=>({type: TOGGLE_MY_LOGS_DISPLAY});
export let toggleNotesDisplay = ()=>({type: TOGGLE_NOTES_DISPLAY});
export let toggleLifestyleDisplay = ()=>({type: TOGGLE_LIFESTYLE_DISPLAY});
export let toggleMigrateDatepicker = logType=>{
  return {type: TOGGLE_MIGRATE_DATEPICKER, payload: logType}};
