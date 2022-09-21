import { useState } from "react"


const Modal = ({ allUsers, currentUsers, updateAllAndCurrentUsers, idToUpdate }) => {
    const [updatedValues, setUpdatedValues] = useState({
        name: "",
        email: "",
        role: ""
    });

    const handleModalChange = (e) => {
        const updatedValuesCopy = updatedValues;
        updatedValuesCopy[e.target.name] = e.target.value;
        setUpdatedValues({ ...updatedValuesCopy });
    }

    const handleUpdate = () => {
        if (updatedValues.name !== "" || updatedValues.email !== "" || updatedValues.role !== "") {
            for (let i = 0; i < allUsers.length; i++) {
                if (allUsers[i].id == idToUpdate) {
                    if (updatedValues["name"] !== "") {
                        allUsers[i].name = updatedValues["name"];
                    }
                    if (updatedValues["email"] !== "") {
                        allUsers[i].email = updatedValues["email"];
                    }
                    if (updatedValues["role"] !== "") {
                        allUsers[i].role = updatedValues["role"];
                    }
                    break;
                }
            }
            for (let i = 0; i < currentUsers.length; i++) {
                if (currentUsers[i].id == idToUpdate) {
                    if (updatedValues["name"] !== "") {
                        currentUsers[i].name = updatedValues["name"];
                    }
                    if (updatedValues["email"] !== "") {
                        currentUsers[i].email = updatedValues["email"];
                    }
                    if (updatedValues["role"] !== "") {
                        currentUsers[i].role = updatedValues["role"];
                    }
                    break;
                }
            }
            updateAllAndCurrentUsers(allUsers, currentUsers);
        }
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" name="name" className="form-control mb-2" placeholder="Name" onChange={handleModalChange} />
                        <input type="text" name="email" className="form-control mb-2" placeholder="Email" onChange={handleModalChange} />
                        <input type="text" name="role" className="form-control" placeholder="Role" onChange={handleModalChange} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal