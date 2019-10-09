export const TOGGLE_MIGRATE_DATEPICKER = 'TOGGLE_MIGRATE_DATEPICKER';

export let toggleMigrateDatepicker = logType=>{
  return {type: TOGGLE_MIGRATE_DATEPICKER, payload: logType}};
