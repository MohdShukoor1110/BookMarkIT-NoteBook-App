import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

import { formatDate } from '../lib/utils.js';
import api from '../lib/axios.js';

export default function NoteCard({note, setNotes, mode}) {
    const handleDeleteNote = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this note...?")) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter((note) => note._id !== id));
            toast.success("Note deleted successfully"); 
        } catch (error) {
            console.log("Error in handleDeleteNote", error);
            toast.error("Failed to delete Note");
        }
    }

    let myBgColor
    if (mode==="light") {
        myBgColor = "#f8f9fa";
    } else {
        myBgColor = "#343a40";
    }
    
    return (
        <div >
            <Link to={`/Note/${note._id}`} className="text-decoration-none" >
                <div className="card" style={{border:"1px solid black", backgroundColor: myBgColor}}>
                    <div className="card-body ">
                        <h5 className={`card-title text-${mode==="light"?"dark":"light"} mb-2`}>{note.title}</h5>
                        <p className={`card-text text-${mode==="light"?"dark":"light"} text-truncate`} style={{ WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>{note.content}</p>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <small className={`text-${mode==="light"?"dark":"light"}`}>
                            {formatDate(new Date(note.createdAt))}
                            </small>

                            <div className="d-flex align-items-center gap-2" title="Edit this note">
                                <button className="btn text-primary btn-sm">
                                    <PenSquareIcon size={16} />
                                </button>
                                <button
                                    className="btn btn-link btn-sm text-danger p-0"
                                    onClick={(e) => handleDeleteNote(e, note._id)}
                                    title="Delete this note"
                                >
                                    <Trash2Icon size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
};
