import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const Row = ({ user, handleDelete, selectedRecord, handleSelected, multiSelect, displayedRecordIds, handleUpdate }) => {
    const [showComponent, setShowComponent] = useState(true);
    const [selected, setSelected] = useState("");

    const hideRow = (id) => {
        handleDelete([id]);
        setShowComponent(false);
    }

    const handleCheckbox = (e, id) => {
        if (e.target.value == "") {
            setSelected("selected");
            selectedRecord.push(id);
            handleSelected(selectedRecord);
        }
        else {
            selectedRecord.splice(selectedRecord.indexOf(id), 1);
            setSelected("");
            handleSelected(selectedRecord);
        }
    }

    const handleMultiSelect = () => {
        if (multiSelect == "selected") {
            if (displayedRecordIds.includes(user.id)) {
                setSelected("selected");
                selectedRecord.push(user.id);
                handleSelected(selectedRecord);
            }
        }
        else {
            if (displayedRecordIds.includes(user.id)) {
                setSelected("");
                selectedRecord.splice(selectedRecord.indexOf(user.id), 1);
                handleSelected(selectedRecord);
            }

        }
    }

    useEffect(() => {
        handleMultiSelect();
    }, [multiSelect]);
    return (
        <>
            {showComponent && <tr className={selected}>
                <td><input className="form-check-input" type="checkbox" value={selected} onChange={(e) => handleCheckbox(e, user.id)} checked={selected === "selected"} /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td><BiEdit style={{ marginRight: "5px", cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleUpdate(user.id)} /><AiOutlineDelete style={{ color: "red", cursor: "pointer" }} onClick={() => hideRow(user.id)} /></td>
            </tr>
            }
        </>
    )
}

export default Row