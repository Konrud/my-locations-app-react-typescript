import React, { useEffect, useState } from "react";
import { StorageKeys } from "../../Enums/StorageKeys/storageKeys.enum";
import usePersistentStorage from "../../Hooks/usePersistentStorage/usePersistentStorage";
import { useParams } from 'react-router-dom'
import { ICategory } from "../../Interfaces/ICategoryInterface/ICategoryInterface";


export default function ViewCategory() {
    const params = useParams<{ id: string }>();
    const { getItem } = usePersistentStorage();
    const [category, setCategory] = useState<ICategory>();

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

    if (!category?.name) {
        return null;
    }

    return (
        <h1>{category?.name} Category</h1>
    );
}