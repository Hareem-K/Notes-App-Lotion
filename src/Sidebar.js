import React from "react";

function Sidebar({isOpen, toggle, notes, onAddNote, activeNote, setAvtiveNote}) {
    const sidebarStyle = {
        left: isOpen ? 0 : -350, // Use the left property to move the sidebar
    };

    //sorting notes to show most recently updated at the top
    const sortedNotes = notes.sort((a,b) => b.lastModified - a.lastModified)

    return (
        <>
            <button className="button"
                type="button" onClick={toggle}>&#9776;
            </button> 
            <div style={sidebarStyle} className="sidebar">
                <div className="subheader"> 
                    <h2>Notes</h2>
                    <div className="spacer" />
                    <button onClick={onAddNote}>  &#x2b; </button>
                </div>

                <div className="sidebarNotes">
                    {sortedNotes.length > 0 ? (
                        sortedNotes.map((note) => (
                            <div className={`sidebarnote ${note.id === activeNote && "active"}`} onClick={() => setAvtiveNote(note.id)}>
                                <div className="notetitle">
                                    <strong>{note.title}</strong>
                                </div>
                                <small className="note-mod-info">Last modified {new Date(note.lastModified).toLocaleDateString("en-CA",{
                                    hour: "2-digit",
                                    minute: "2-digit",
                                } )}
                                </small>

                                <div
                                    className="preview"
                                    dangerouslySetInnerHTML={{ __html: note.body && note.body.substr(0, 20) + "..." }}
                                ></div>

                            </div>
                        ))
                    ) : (
                        <div className="no-notes-message">Add Notes Here :D </div>
                    )}

                </div>

            </div>
        </>

    );
}

export default Sidebar;
