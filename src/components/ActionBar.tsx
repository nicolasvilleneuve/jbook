import {useActions} from "../hooks/use-actions";
import {FaArrowAltCircleUp} from "react-icons/fa";
import {FaArrowCircleDown} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import "./action-bar.css";


interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const {moveCell, deleteCell} = useActions();

    return (
        <div className={"action-bar"}>
            <button className={"action-bar-buttons"} onClick={() => moveCell(id, 'up')}><FaArrowAltCircleUp /></button>
            <button className={"action-bar-buttons"} onClick={() => moveCell(id, 'down')}><FaArrowCircleDown /></button>
            <button className={"action-bar-buttons"} onClick={() => deleteCell(id)}><AiFillDelete /></button>
        </div>
    );
};

export default ActionBar;