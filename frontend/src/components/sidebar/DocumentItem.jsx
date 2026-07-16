import { FiFileText, FiTrash2 } from "react-icons/fi";

function DocumentItem({

    document,

    activeDocument,

    setActiveDocument,

    onDelete,

}) {

    const active =

        activeDocument === document.id;

    return (

        <div

            className={

                active

                    ? "document-item active"

                    : "document-item"

            }

            onClick={()=>

                setActiveDocument(

                    document.id

                )

            }

        >

            <FiFileText />

            <span>

                {document.filename}

            </span>

            <button

                className="delete-document"

                onClick={(e)=>{

                    e.stopPropagation();

                    onDelete(document.id);

                }}

            >

                <FiTrash2 />

            </button>

        </div>

    );

}

export default DocumentItem;