export default function AlertReducer(state: any, action: any) {
    switch (action.type) {
        case "show":
            return { ...state, ...action.payload, visible: true };
        case "hide":
            return { ...state, ...action.payload, visible: false };
        default:
            return state;
    }
}