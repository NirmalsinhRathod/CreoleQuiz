
import { CONNECTION_STATUS } from './actionsType'

export const connectionState = ({ status }) => {
    return { type: CONNECTION_STATUS, isConnected: status };
};