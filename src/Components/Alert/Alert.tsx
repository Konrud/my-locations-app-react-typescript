import React, { useCallback } from "react";
import useAlert from "../../Hooks/useAlert/useAlert";
import "./alert.css"

export default function Alert() {
    const { show, hide, alert } = useAlert();

    const onButtonClickHandler = useCallback((e) => {
        hide();
    }, [hide]);

    if (!alert?.visible) {
        return null;
    }

    const alertClass = `o-alert${alert.type ? " o-alert--" + alert.type : ""}`;

    return (
        <div className={alertClass} role="alert">
            <section className="o-alert__content">
                <h3 className="o-alert__title">{alert.title}</h3>
                <p className="o-alert__message">{alert.message}</p>
            </section>
            <button type="button" onClick={onButtonClickHandler} className="o-alert__btn" aria-label="close">&times;</button>
        </div>
    );
}