import React from "react";
import { IToolbarActionItem } from "../../Interfaces/IToolbarInterface/IToolbarInterface";

type ToolbarContextType = {
    setToolbar(title: string, actions: IToolbarActionItem[]): void,
    hideToolbar(): void, state: {
        title: string,
        actions: IToolbarActionItem[]
    },
    setIsToolbarClicked(isClicked: boolean): void,
    isToolbarClicked: boolean,
    isElementClickedInToolbar(element: HTMLElement): boolean
}

const ToolbarContext = React.createContext({} as ToolbarContextType);

export default ToolbarContext;
