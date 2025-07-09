'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [{ ...state }];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateHistory.push(
          Object.assign(
            {},
            stateHistory[stateHistory.length - 1],
            action.extraData,
          ),
        );
        break;

      case 'removeProperties':
        const removedProperties = Object.assign(
          {},
          stateHistory[stateHistory.length - 1],
        );

        for (const key of action.keysToRemove) {
          delete removedProperties[key];
        }
        stateHistory.push(removedProperties);
        break;

      case 'clear':
        stateHistory.push({});
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  return stateHistory.slice(1);
}

module.exports = transformStateWithClones;
