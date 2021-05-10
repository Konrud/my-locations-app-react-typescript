import React, { useEffect, useState } from "react";
import CategoryList from "../../Components/CategoryList/categoryList";
import { StorageKeys } from "../../Enums/StorageKeys/storageKeys.enum";
import usePersistentStorage from "../../Hooks/usePersistentStorage/usePersistentStorage";
import useToolbarContext from "../../Hooks/useToolbarContext/useToolbarContext";
import { ICategory } from "../../Interfaces/ICategoryInterface/ICategoryInterface";

export default function Categories() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const { getItem, setItem } = usePersistentStorage();
    const { hideToolbar, isToolbarClicked, setToolbar, isElementClickedInToolbar } = useToolbarContext();

    const [isClickOutside, setIsClickOutside] = useState(true);

    function onDocumentClickHandler(e: MouseEvent) {
        const isTargetClickedInToolbar = isElementClickedInToolbar(e.target as HTMLElement);
        const isClickMadeOutside = isTargetClickedInToolbar === false;
        setIsClickOutside(isClickMadeOutside);
    }

    useEffect(() => {
        document.addEventListener("click", onDocumentClickHandler, true);

        const categories = getItem(StorageKeys.Categories);
        if (categories) {
            setCategories(categories as ICategory[]);
        }

        return () => {
            document.removeEventListener("click", onDocumentClickHandler, true);
            onCategoryClickOutsideHandler();
        }
    }, []);

    useEffect(() => {
        const newState = isToolbarClicked ? false : true;
        setIsClickOutside(newState);
    }, [isToolbarClicked]);

    useEffect(() => {
        setItem(StorageKeys.Categories, categories);
        onCategoryClickOutsideHandler();
    }, [categories]);

    function categoryItemDeleteAction(id: string): void {
        setCategories((prevCategories) => {
            return prevCategories.filter((categoryItem) => {
                return categoryItem.id !== id;
            });
        });
    };

    function onCategoryListItemClickHandler(categoryItemName: string, id: string): void {
        setToolbar(categoryItemName, [{
            title: "edit",
            href: `/edit/${id}`,
        },
        {
            title: "view",
            href: `/view/${id}`,
        },
        {
            title: "delete",
            action: () => {
                categoryItemDeleteAction(id);
            },
        }
        ]);
        setIsClickOutside(false);
    };


    function onCategoryClickOutsideHandler() {
        hideToolbar();
        setIsClickOutside(true);
    };

    return (
        <>
            <h1>Categories</h1>
            <CategoryList categories={categories}
                onCategoryClickOutside={onCategoryClickOutsideHandler}
                onCategoryItemClick={onCategoryListItemClickHandler}
                isClickOutside={isClickOutside}
            />
        </>
    );
}