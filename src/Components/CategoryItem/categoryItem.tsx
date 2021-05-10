import React from "react";
import "./categoryItem.css";

type CategoryItemProps = {
    id: string,
    categoryName: string,
}

export default function CategoryItem({ categoryName, id }: CategoryItemProps) {
    return (
        <li className="c-category-list__item" tabIndex={0} id={id} data-category-name={categoryName}>
            <span className="c-category-list__name">{categoryName}</span>
        </li>
    )
}