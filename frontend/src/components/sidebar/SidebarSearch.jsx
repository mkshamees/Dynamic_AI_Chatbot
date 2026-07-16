import { FiSearch } from "react-icons/fi";

function SidebarSearch({

    search,

    setSearch,

}) {

    return (

        <div className="sidebar-search">

            <FiSearch className="search-icon" />

            <input

                type="text"

                placeholder="Search conversations..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

        </div>

    );

}

export default SidebarSearch;