import {combineReducers} from 'redux';
import {commonReducer} from './common/reducers';
import {workspaceReducer} from './workspace/reducers';
import {logsReducer} from './logs/reducers';

export default combineReducers({
  commonState: commonReducer,
  workspaceState: workspaceReducer,
  logsState: logsReducer
});
