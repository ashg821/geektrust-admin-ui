import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config'
import Row from './Row';
import '../componentStyles/table.style.css'
import Pagebar from './Pagebar';
import Seachbar from './Seachbar';
import Modal from './Modal';


const Table = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([null]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRecord, setSelectedRecord] = useState([]);
    const [multiSelect, setMultiSelect] = useState("");
    const [displayedRecordIds, setDisplayedRecordIds] = useState([]);
    const [idToUpdate, setIdToUpdate] = useState("");


    const getAllUsers = async () => {
        const { data } = await axios.get(`${config.usersLink}`);
        const displayedIds = [];
        setAllUsers(data);
        setCurrentUsers(data);
        setDisplayedUsers(data.slice(0, 10));
        data.slice(0, 10).forEach(ele => {
            displayedIds.push(ele.id);
        });
        setDisplayedRecordIds(displayedIds);
    }

    const calculatePages = async () => {
        const { data } = await axios.get(`${config.usersLink}`);
        const pages = Math.ceil(data.length / 10);
        setTotalPages(pages);

    }

    const getDisplayedUsers = (pageNumber, startIndex, finalIndex) => {
        const displayedIds = [];
        setDisplayedUsers(currentUsers.slice(startIndex, finalIndex));
        setCurrentPage(pageNumber);
        currentUsers.slice(startIndex, finalIndex).forEach(ele => {
            displayedIds.push(ele.id);
        });
        setDisplayedRecordIds(displayedIds);
    }

    const filterUsers = (searchString) => {
        const displayedIds = [];
        const regexString = new RegExp(searchString, 'gi');
        const filteredUsers = allUsers.filter(user => user.name.match(regexString) || user.email.match(regexString) || user.role.match(regexString));
        const pages = Math.ceil(filteredUsers.length / 10);
        setCurrentUsers(filteredUsers);
        setDisplayedUsers(filteredUsers.slice(0, 10));
        setTotalPages(pages);
        filteredUsers.slice(0, 10).forEach(ele => {
            displayedIds.push(ele.id);
        });
        setDisplayedRecordIds(displayedIds);
    }


    const handleDelete = (idArray) => {
        const displayedIds = [];
        const allUsersCopy = [...allUsers];
        const currentUsersCopy = [...currentUsers];
        idArray.forEach(id => {
            for (let i = 0; i < allUsersCopy.length; i++) {
                if (allUsersCopy[i].id == id) {
                    allUsersCopy.splice(i, 1);
                    break;
                }
            }
        });
        idArray.forEach(id => {
            for (let i = 0; i < allUsersCopy.length; i++) {
                if (currentUsersCopy[i].id == id) {
                    currentUsersCopy.splice(i, 1);
                    break;
                }
            }
        });
        setAllUsers(allUsersCopy);
        setCurrentUsers(currentUsersCopy);
        setDisplayedUsers(currentUsersCopy.slice(0, 10));
        setTotalPages(Math.ceil(currentUsersCopy.length / 10));

        currentUsersCopy.slice(0, 10).forEach(ele => {
            displayedIds.push(ele.id);
        });
        setDisplayedRecordIds(displayedIds);
    }

    const handleSelected = (array) => {
        setSelectedRecord(array);
    }

    const checkboxHandler = (e) => {
        if (e.target.value == "") {
            setMultiSelect("selected");
        }
        else {

            setMultiSelect("");
        }
    }

    const handleUpdate = (id) => {
        setIdToUpdate(id);
    }

    const updateAllAndCurrentUsers = (newAllUsers, newCurrentUsers) => {
        const displayedIds = [];
        setAllUsers(newAllUsers);
        setCurrentUsers(newCurrentUsers);
        setDisplayedUsers(newCurrentUsers.slice(0, 10));

        newCurrentUsers.slice(0, 10).forEach(ele => {
            displayedIds.push(ele.id);
        });
        setDisplayedRecordIds(displayedIds);
    }




    useEffect(() => {
        getAllUsers();
        calculatePages();
    }, [])


    return (
        <>
            <Seachbar filterUsers={filterUsers} />
            <table className="userTable">
                <colgroup>
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "25%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "15%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>
                            <input className="form-check-input" type="checkbox" value={multiSelect} id="checkbox-main" onChange={checkboxHandler} />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedUsers.map(user => (
                        <Row key={user.id} user={user} handleDelete={handleDelete} selectedRecord={selectedRecord} handleSelected={handleSelected} multiSelect={multiSelect} displayedRecordIds={displayedRecordIds} handleUpdate={handleUpdate} />
                    ))}
                </tbody>
            </table>
            {totalPages !== 0 && <Pagebar totalPages={totalPages} getDisplayedUsers={getDisplayedUsers} currentPage={currentPage} selectedRecord={selectedRecord} handleDelete={handleDelete} />}
            {totalPages === 0 && <div>No users to show</div>}
            <Modal allUsers={allUsers} currentUsers={currentUsers} updateAllAndCurrentUsers={updateAllAndCurrentUsers} idToUpdate={idToUpdate} />


        </>
    )
}


export default Table