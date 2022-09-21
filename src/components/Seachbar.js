import React from 'react'

const Seachbar = ({ filterUsers }) => {

    const handleSearch = (e) => {
        filterUsers(e.target.value);
    }

    return (
        <>
            <input type="text" className="form-control my-3" id="seachBar" aria-describedby="seachHelp" placeholder='search by name, email or role' onChange={handleSearch}></input>
        </>
    )
}

export default Seachbar