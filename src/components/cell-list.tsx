import React from "react";
import {Fragment} from "react";
import {useTypedSelector} from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./AddCell";

const CellList: React.FC = () => {

    const cells = useTypedSelector(({cells: {order, data}}) => order.map((id: string) => data[id]));

    const renderedCells = cells.map(cell => {
        return (
            <Fragment key={cell.id}>
                <CellListItem key={cell.id} cell={cell}/>
                <AddCell prevCellId={cell.id} />
            </Fragment>
            )
    });

    return (
        <div>
            <AddCell forceVisible={cells.length === 0} prevCellId={null} />
            {renderedCells}
        </div>
    );
};

export default CellList;