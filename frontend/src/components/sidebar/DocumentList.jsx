import { useEffect, useRef } from "react";

import {

    getDocuments,

    uploadDocument,

    deleteDocument,

} from "../../api/documentApi";

import DocumentItem from "./DocumentItem";

function DocumentList({

    documents,

    setDocuments,

    activeDocument,

    setActiveDocument,

}) {

    const inputRef = useRef(null);

    useEffect(()=>{

        loadDocuments();

    },[]);

    const loadDocuments = async()=>{

        try{

            const response =

                await getDocuments();

            setDocuments(

                response.data

            );

        }

        catch(err){

            console.log(err);

        }

    };

    const upload = async(file)=>{

        if(!file) return;

        try{

            await uploadDocument(file);

            loadDocuments();

        }

        catch(err){

            console.log(err);

        }

    };

    const remove = async(id)=>{

        try{

            await deleteDocument(id);

            loadDocuments();

            if(activeDocument===id){

                setActiveDocument(null);

            }

        }

        catch(err){

            console.log(err);

        }

    };

    return(

        <>

            <div className="sidebar-section-title">

                Documents

            </div>

            <button

                className="upload-btn"

                onClick={()=>

                    inputRef.current.click()

                }

            >

                Upload Document

            </button>

            <input

                type="file"

                hidden

                ref={inputRef}

                onChange={(e)=>

                    upload(

                        e.target.files[0]

                    )

                }

            />

            {

                documents.length===0 ?

                (

                    <div className="empty-list">

                        No documents

                    </div>

                )

                :

                (

                    documents.map(

                        (doc)=>(

                            <DocumentItem

                                key={doc.id}

                                document={doc}

                                activeDocument={activeDocument}

                                setActiveDocument={setActiveDocument}

                                onDelete={remove}

                            />

                        )

                    )

                )

            }

        </>

    );

}

export default DocumentList;