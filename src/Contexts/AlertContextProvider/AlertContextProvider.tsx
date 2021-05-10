import React, { useCallback, useReducer } from "react";
import AlertContext from "../AlertContext/AlertContext";
import AlertReducer from "../AlertReducer/AlertReducer";

export default function AlertContextProvider({ children }: any) {
    const [state, dispatch] = useReducer(AlertReducer, { visible: false });

    const show = useCallback((title: string, message: string, type: string) => {
        dispatch({ type: "show", payload: { title, message, type } });
    }, []);

    const hide = useCallback(() => {
        dispatch({ type: "hide" });
    }, []);

    return (
        <AlertContext.Provider value={{ show, hide, alert: state }}>{children}</AlertContext.Provider>
    );
}