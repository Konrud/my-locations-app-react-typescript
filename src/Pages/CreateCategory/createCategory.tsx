import React, { useCallback } from "react";
import CategoryForm from "../../Components/CategoryForm/categoryForm";
import { StorageKeys } from "../../Enums/StorageKeys/storageKeys.enum";
import useAlert from "../../Hooks/useAlert/useAlert";
import usePersistentStorage from "../../Hooks/usePersistentStorage/usePersistentStorage";
import { ICategory } from "../../Interfaces/ICategoryInterface/ICategoryInterface";


export default function CreateCategoryPage() {
    const { getItem, setItem } = usePersistentStorage();
    const { show } = useAlert();

    const categoryFormHandler = useCallback((categoryItem: ICategory) => {
        let categories = getItem(StorageKeys.Categories);
        const newCategoryItem = { name: categoryItem.name, id: Date.now().toString() };

        if (Array.isArray(categories)) {
            categories = categories.concat([newCategoryItem]);
        } else {
            categories = [newCategoryItem];
        }
        show("Success", "Category Item has been successfully created.", "success");
        setItem(StorageKeys.Categories, categories);
    }, [setItem]);

    return (
        <>
            <h1>Create Category</h1>
            <section className="c-create-category">
                <CategoryForm onFormSubmit={categoryFormHandler} />
            </section>
        </>
    );
}