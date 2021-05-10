import React, { useContext } from "react";
import ToolbarContext from "../../Contexts/ToolbarContext/ToolbarContext";


export default function useToolbarContext() {
    return useContext(ToolbarContext);
}