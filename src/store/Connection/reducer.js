import { CONNECTION_STATUS } from './actionsType'


const initialState = {
    isConnected: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // ...
        case CONNECTION_STATUS:
            return {
                ...state,
                isConnected: action.isConnected,
            };
        default:
            return state
    }
}

export default reducer;