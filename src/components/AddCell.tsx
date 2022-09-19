import "./AddCell.css";
import {useActions} from "../hooks/use-actions";
import {insertCellAfter} from "../state/action-creators";
import React from "react";

interface AddCellProps {
    prevCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps>= ({prevCellId, forceVisible}) => {
    const {insertCellAfter} = useActions();

    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className="add-buttons">
                <button className={"btn"} onClick={() => insertCellAfter(prevCellId, 'code')}>Code</button>
                <button className={"btn"} onClick={() => insertCellAfter(prevCellId, 'text')}>Text</button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCell;