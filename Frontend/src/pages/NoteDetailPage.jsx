import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

import api from '../lib/axios.js';
import "../pages/Styles/NoteDetailPageStyle.css";

export default function NoteDetailPage({mode}) {
    let myBgColor
    if (mode==="light") {
        myBgColor = "#f8f9fa";
    } else {
        myBgColor = "#343a40";
    }

    let myBtn
    if (mode==="light") {
        myBtn = "btn-outline-";
    } else {
        myBtn = "btn-";
    }

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (error) {
                console.log("Error in fetching note", error);
                toast.error("Failed to fetch the note");
            } finally {
                setLoading(false);
            };
        };
        fetchNote();
    }, [id]);

    const handleDeleteNote = async (e, id) => {
        if (!window.confirm("Are you sure you want to delete this note..?")) return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note delete");
            navigate("/");
        } catch (error) {
            console.log("Error deleting the note:", error);
            toast.error("Failed to delete note");
        }
    };

    const handleOnSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content");
            return;
        }
        setSaving(true);
        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note updated successfully");
            navigate("/");
        } catch (error) {
            console.log("Error saving the note:", error);
            toast.error("Failed to update note");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-vh-90 d-flex align-items-center justify-content-center" style={{backgroundColor: myBgColor}}>
                <LoaderIcon className="text-primary" size={40} style={{ animation: "spin 1s linear infinite" }} />
            </div>
        );
    }

    return (
        <div>
            <div className="min-vh-90" style={{backgroundColor: myBgColor}}>
                <div className="container py-4" style={{backgroundColor: myBgColor}}>
                    <div className="mx-auto" style={{ maxWidth: "40rem" }}>
                        
                        {/* Header Actions */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <Link to="/" className={`btn ${myBtn}primary d-inline-flex align-items-center gap-1`}>
                                <ArrowLeftIcon size={18} />
                                Back to Note's
                            </Link>
                            <button onClick={(e) => handleDeleteNote(e, note._id)} className={`btn ${myBtn}danger d-inline-flex align-items-center gap-1`}>
                                <Trash2Icon size={18} />
                                Delete Note
                            </button>
                        </div>

                        {/* Card */}
                        <div className={`card text-${mode==='light'?'dark':'light'} shadow-sm border-${mode==='light'?'dark':'light'}`} style={{backgroundColor: myBgColor}}>
                            <div className="card-body">
                                
                                {/* Title Input */}
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className={`form-control text-${mode==='light'?'dark':'light'} border-${mode==='light'?'dark':'light'}`} placeholder="Note's title" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} style={{backgroundColor: myBgColor}} />
                                </div>

                                {/* Content Input */}
                                <div className="mb-3">
                                    <label className="form-label">Content</label>
                                    <textarea className={`form-control text-${mode==='light'?'dark':'light'} border-${mode==='light'?'dark':'light'}`} rows="6" placeholder="Write your note's description here..." value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} style={{backgroundColor: myBgColor}} />
                                </div>

                                {/* Save Button */}
                                <div className="d-flex justify-content-end">
                                    <button className={`btn ${myBtn}success`} disabled={saving} onClick={handleOnSave} >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
}
