import React, { FormEvent, useCallback, useEffect, useState } from "react";
import useAlert from "../../Hooks/useAlert/useAlert";
import { ICategory } from "../../Interfaces/ICategoryInterface/ICategoryInterface";
import "./categoryForm.css";

type CategoryFormProps = {
    labelText?: string,
    submitButtonText?: string,
    onFormSubmit(categoryItem: ICategory): void,
    initialValue?: ICategory
}

export default function CategoryForm({ labelText = "Category name", submitButtonText = "Create", onFormSubmit, initialValue }: CategoryFormProps) {
    const [categoryName, setCategoryName] = useState("");
    const { show } = useAlert();

    useEffect(() => {
        if (!initialValue?.name) {
            return;
        }

        setCategoryName(initialValue?.name);

    }, [initialValue]);


    const onFormSubmitHandler = useCallback((e: FormEvent) => {
        e.preventDefault();
        if (categoryName?.trim() === "") {
            show("Error", "Provided value must not be empty", "error");
            return;
        }
        setCategoryName("");
        onFormSubmit({ name: categoryName } as ICategory);
    }, [onFormSubmit, categoryName]);

    const onInputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    }, []);

    return (
        <form onSubmitCapture={onFormSubmitHandler} className="c-category-form">
            <div className="c-category-form__field">
                <label className="c-category-form__label" htmlFor="categoryName">{labelText}</label>
                <input type="text" className="c-category-form__input" autoFocus={true} minLength={1} maxLength={200} required value={categoryName} onChange={onInputChangeHandler} name="categoryName" id="categoryName" />
            </div>
            <div className="c-category-form__field">
                <button className="c-category-form__btn" type="submit">{submitButtonText}</button>
            </div>
        </form>
    );
}