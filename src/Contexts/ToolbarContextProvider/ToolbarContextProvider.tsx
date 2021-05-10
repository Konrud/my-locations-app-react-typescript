import React, { useCallback, useEffect, useState } from "react";
import { IToolbarActionItem } from "../../Interfaces/IToolbarInterface/IToolbarInterface";
import ToolbarContext from "../ToolbarContext/ToolbarContext";

type ToolbarContextProps = {
    children?: React.ReactNode
}

const DEFAULT_TOOLBAR_TITLE = "Categories";

export default function ToolbarContextProvider({ children }: ToolbarContextProps) {
    const [toolbarTitle, setToolbarTitle] = useState("");
    const [toolbarActions, setToolbarActions] = useState<IToolbarActionItem[]>([]);
    const [isToolbarClicked, setIsToolbarClicked] = useState(false);

    const setToolbarDefaults = useCallback((): void => {
        setToolbarTitle(DEFAULT_TOOLBAR_TITLE);
        setToolbarActions([{
            title: "new category",
            href: "/create"
        }]);
    }, []);

    useEffect(() => {
        setToolbarDefaults();
    }, []);

    const setToolbar = useCallback((title: string, actions: IToolbarActionItem[]): void => {
        setToolbarTitle(title);
        setToolbarActions(actions);
    }, []);

    const hideToolbar = useCallback((): void => {
        setToolbarDefaults();
    }, []);

    function isToolbarClickedHandler(isClicked: boolean): void {
        setIsToolbarClicked(isClicked);
    };

    function isElementClickedInToolbar(element: HTMLElement): boolean {
        return element.closest("[role='toolbar']") != null;
    }

    return (
        <ToolbarContext.Provider value={{
            setToolbar,
            hideToolbar,
            state: { title: toolbarTitle, actions: toolbarActions },
            setIsToolbarClicked: isToolbarClickedHandler,
            isToolbarClicked,
            isElementClickedInToolbar
        }}>{children}</ToolbarContext.Provider>
    );
}