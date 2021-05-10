import React, { useCallback } from "react";


export default function usePersistentStorage() {

    const getItem = useCallback((key: string): Object | Array<Object> => {
        const item = JSON.parse(localStorage.getItem(key)!);
        return item;
    }, []);

    const setItem = useCallback((key: string, item: Object | Array<Object>): void => {
        const stringifiedItem = JSON.stringify(item);
        localStorage.setItem(key, stringifiedItem);
    }, []);

    return { getItem, setItem };
}