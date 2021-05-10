import React, { useContext } from "react";
import AlertContext from "../../Contexts/AlertContext/AlertContext";


export default function useAlert() {
    return useContext(AlertContext);
}