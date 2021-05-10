import React, { useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import useToolbarContext from "../../Hooks/useToolbarContext/useToolbarContext";
import "./toolbar.css";


export default function Toolbar() {
    const { setIsToolbarClicked: isToolbarClickedHandler, state: { actions, title } } = useToolbarContext();

    const actionItems = useMemo(() => {
        return actions.map((actionItem, i) => {
            const isLink = actionItem.href;
            const linkElement = isLink ?
                <NavLink className="c-toolbar__link" to={actionItem.href!}>{actionItem.title}</NavLink>
                :
                <button className="c-toolbar__link" onClick={actionItem.action}>{actionItem.title}</button>
            return (
                <li className="c-toolbar__action-item" key={i}>{linkElement}</li>
            );
        })
    }, [actions]);

    const onToobarClickHandler = useCallback((e: React.MouseEvent) => {
        const clickedElem = e.target as HTMLElement;
        const isToolbarClicked = clickedElem.getAttribute("role") === "toolbar";
        const isDescendantClicked = clickedElem.closest('[role="toolbar"]');

        if (isToolbarClicked || isDescendantClicked) {
            isToolbarClickedHandler(true);
        } else {
            isToolbarClickedHandler(false);
        }
    }, [isToolbarClickedHandler]);

    return (
        <section className="c-toolbar" role="toolbar" aria-live="polite" onClickCapture={onToobarClickHandler}>
            <h2 className="c-toolbar__title">{title}</h2>
            <ul className="c-toolbar__actions">{actionItems}</ul>
        </section>
    );
}