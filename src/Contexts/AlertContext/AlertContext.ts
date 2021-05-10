import React from "react";

type AlertContextType = {
    show(title: string, message: string, type: "success" | "warning" | "error"): void,
    hide(): void,
    alert: { visible: boolean, type: string, title: string, message: string } | undefined
}

const AlertContext = React.createContext({ show: () => { }, hide: () => { }, alert: undefined } as AlertContextType);

export default AlertContext;
