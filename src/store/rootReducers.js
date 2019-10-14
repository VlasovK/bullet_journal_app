import {combineReducers} from 'redux';
import {commonReducer} from './common/reducers';
import {logsReducer} from './logs/reducers';
import {workspaceReducer} from './workspace/reducers';

export default combineReducers({
  commonState: commonReducer,
  logsState: logsReducer,
  workspaceState: workspaceReducer
});
