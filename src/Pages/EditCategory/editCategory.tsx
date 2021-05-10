import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import CategoryForm from "../../Components/CategoryForm/categoryForm";
import { StorageKeys } from "../../Enums/StorageKeys/storageKeys.enum";
import useAlert from "../../Hooks/useAlert/useAlert";
import usePersistentStorage from "../../Hooks/usePersistentStorage/usePersistentStorage";
import { ICategory } from "../../Interfaces/ICategoryInterface/ICategoryInterface";


export default function EditCategory() {
    const [category, setCategory] = useState<ICategory>();
    const params = useParams<{ id: string }>();
    const { getItem, setItem } = usePersistentStorage();
    const { show } = useAlert();

    useEffect(() => {
        const categories = getItem(StorageKeys.Categories);
      
        if (Array.isArray(categories)) {

            const foundCategory = (categories as ICategory[]).find((category) => {
                return category.id === params.id;
            });

            if (foundCategory) {
                setCategory(foundCategory);
            }
        }

    }, []);

    const categoryFormHandler = useCallback((categoryItem: ICategory) => {
        let categories = getItem(StorageKeys.Categories);

        if (Array.isArray(categories)) {
            const foundCategoryIndex = (categories as ICategory[]).findIndex((category) => {
                return category.id === params.id;
            });

            if (foundCategoryIndex > -1) {
                const originalCategoryItem = categories[foundCategoryIndex];
                categories[foundCategoryIndex] = { ...originalCategoryItem, ...categoryItem };
                setItem(StorageKeys.Categories, categories);
                show("Success", "Category Item has been successfully edited.", "success");
                setCategory((prevCategory) => {
                    return { ...prevCategory, ...categoryItem };
                });
            } else {
                show("Error", "Category Item can not be found.", "error");
            }
        } else {
            show("Error", "Category Item can not be found.", "error");
        }
    }, [setItem]);

    if (!category?.name) {
        return null;
    }

    return (
        <>
            <h1>Edit {category?.name} Category</h1>
            <section className="c-edit-category">
                <CategoryForm onFormSubmit={categoryFormHandler} initialValue={category} labelText="Edit Item" submitButtonText="Edit" />
            </section>
        </>
    );
}