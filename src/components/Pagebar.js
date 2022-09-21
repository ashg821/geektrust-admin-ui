import PageIcon from "./PageIcon"
import '../componentStyles/pagebar.style.css'


const Pagebar = ({ totalPages, getDisplayedUsers, currentPage, selectedRecord, handleDelete }) => {
    const dummyArray = () => {
        const sampleArray = [];
        for (let i = 0; i < totalPages; i++) {
            sampleArray.push(i + 1);
        }
        return sampleArray;
    }

    const goToPrevious = () => {
        if (currentPage !== 1) {
            const pageNumber = currentPage - 1;
            const startIndex = pageNumber * 10 - 10;
            const finalIndex = pageNumber * 10;
            getDisplayedUsers(pageNumber, startIndex, finalIndex);
        }
    }

    const goToFirst = () => {
        const pageNumber = 1;
        const startIndex = pageNumber * 10 - 10;
        const finalIndex = pageNumber * 10;
        getDisplayedUsers(pageNumber, startIndex, finalIndex);
    }
    const goToNext = () => {
        if (currentPage !== totalPages) {
            const pageNumber = currentPage + 1;
            const startIndex = pageNumber * 10 - 10;
            const finalIndex = pageNumber * 10;
            getDisplayedUsers(pageNumber, startIndex, finalIndex);

        }
    }
    const goToLast = () => {
        const pageNumber = totalPages;
        const startIndex = pageNumber * 10 - 10;
        const finalIndex = pageNumber * 10;
        getDisplayedUsers(pageNumber, startIndex, finalIndex);
    }


    return (

        <div className="mt-3 pageBar">
            <button className="btn btn-danger" onClick={() => handleDelete(selectedRecord)}>Delete Selected</button>
            {(totalPages !== 0) && <div className="pages-icon-container">
                <span className={`${currentPage == 1 ? "page-button-first disabled" : "page-button-first"}`} onClick={goToFirst}>{"<<"}</span>
                <span className={`${currentPage == 1 ? "page-button disabled" : "page-button"}`} onClick={goToPrevious}>{"<"}</span>
                {dummyArray().map((number, index) => (<PageIcon key={index} pageNumber={index + 1} getDisplayedUsers={getDisplayedUsers} currentPage={currentPage} index={index} />))}
                <span className={`${currentPage == totalPages ? "page-button disabled" : "page-button"}`} onClick={goToNext}>{">"}</span>
                <span className={`${currentPage == totalPages ? "page-button-last disabled" : "page-button-last"}`} onClick={goToLast}>{">>"}</span>
            </div>}
        </div>

    )
}

export default Pagebar