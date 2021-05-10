import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ICategory } from "../../Interfaces/ICategoryInterface/ICategoryInterface";
import CategoryItem from "../CategoryItem/categoryItem";
import "./categoryList.css";

type CategoryListProps = {
    categories: ICategory[],
    onCategoryItemClick(categoryItemName: string, id: string): void,
    onCategoryClickOutside(): void,
    isClickOutside: boolean
}

export default function CategoryList({ categories = [], onCategoryItemClick, onCategoryClickOutside, isClickOutside }: CategoryListProps) {
    const clickedItemRef = useRef<HTMLLIElement>();

    const categoryListItems = useMemo(() => {
        return categories.map((category: ICategory) => {
            return <CategoryItem categoryName={category.name} id={category.id} key={category.id} />
        });
    }, [categories]);

    useEffect(() => {
        if (isClickOutside) {
            onCategoryItemClickOutside();
        }
    }, [isClickOutside]);


    function onCategoryItemClickHandler(e: React.MouseEvent<HTMLUListElement>) {
        categoryItemClicked(e);
    };

    function onKeyPressHandler(e: React.KeyboardEvent<HTMLUListElement>) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            categoryItemClicked(e);
        }
    };

    function categoryItemClicked(e: React.MouseEvent<HTMLUListElement> | React.KeyboardEvent<HTMLUListElement>) {
        let clickedItem = e.target as HTMLLIElement;
        const descendantClickedClosest = clickedItem.closest("[data-category-name]") as HTMLLIElement;

        if (clickedItem.getAttribute("[data-category-name]") || descendantClickedClosest) {

            if (descendantClickedClosest) {
                clickedItem = descendantClickedClosest;
            }


            if (clickedItemRef.current === clickedItem) {
                return;
            }

            if (clickedItemRef.current) {
                toggleCategoryItemActiveState(clickedItemRef.current);
            }

            toggleCategoryItemActiveState(clickedItem);

            clickedItemRef.current = clickedItem;

            const categoryName = clickedItem.dataset.categoryName!;
            const id = clickedItem.id;
            onCategoryItemClick(categoryName, id);
        }
    }

    const onCategoryItemClickOutside = useCallback(() => {
        toggleCategoryItemActiveState(clickedItemRef.current!);
        clickedItemRef.current = undefined;
        onCategoryClickOutside();
    }, [clickedItemRef, onCategoryClickOutside]);


    const toggleCategoryItemActiveState = useCallback((categoryItem: HTMLLIElement) => {
        categoryItem?.classList.toggle("is-active");
    }, []);

    if (categories?.length === 0) {
        return <p className="o-info">No Categories Found Yet.</p>
    }

    return (
        <ul className="c-category-list" onClickCapture={onCategoryItemClickHandler} onKeyUpCapture={onKeyPressHandler}>{categoryListItems}</ul>
    )
}