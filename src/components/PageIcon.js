import '../componentStyles/button.style.css'


const PageIcon = ({ pageNumber, getDisplayedUsers, currentPage, index }) => {
    const handlePage = async (e) => {
        const pageNumber = parseInt(e.target.innerText);
        const startIndex = pageNumber * 10 - 10;
        const finalIndex = pageNumber * 10;
        getDisplayedUsers(pageNumber, startIndex, finalIndex);

    }
    return (
        <span className={`${index + 1 == currentPage ? "active" : "page-button"}`} onClick={handlePage}>{pageNumber}</span>
    )
}

export default PageIcon