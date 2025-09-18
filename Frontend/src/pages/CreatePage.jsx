import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

import api from '../lib/axios.js'
import "../pages/Styles/CreatePageStyle.css";

export default function CreatePage({mode}) {
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

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required");
            return;
        };
        setLoading(true);
        try {
            await api.post("/notes", {
                title,
                content
            });
            toast.success("Node created successfully!!!");
            navigate("/");
        } catch (error) {
            console.log("Error creating note", error);
            if (error.response.status === 429) {
                toast.error("Slow down! You're creating notes too fast", {
                    duration: 4000,
                    icon: "💀"
                });
            } else {
                toast.error("Failed to create note");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="min-vh-90" style={{backgroundColor: myBgColor}}> 
                <div className="container py-4">
                    <div className="mx-auto" style={{ maxWidth: "40rem" }}>
                        {/* Back Button */}
                        <Link to="/" className={`btn ${myBtn}primary mb-4 d-inline-flex align-items-center gap-1`}>
                            <ArrowLeftIcon size={18} />
                            Back to Note's
                        </Link>
                        {/* Card */}
                        <div className={`card shadow-sm text-${mode==='light'?'dark':'light'} border-${mode==='light'?'dark':'light'}`} style={{backgroundColor: myBgColor}}>
                            <div className="card-body">
                                <h2 className="h4 mb-4">Create New Note</h2>
                                <form onSubmit={handleOnSubmit}>
                                    {/* Title */}
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input type="text" className={`form-control text-${mode==='light'?'dark':'light'} border-${mode==='light'?'dark':'light'}`} placeholder="Give a title for your Note..." value={title} onChange={(e) => setTitle(e.target.value)} style={{backgroundColor: myBgColor}} />
                                    </div>
                                    {/* Content */}
                                    <div className="mb-3">
                                        <label className="form-label">Content</label>
                                        <textarea className={`form-control text-${mode==='light'?'dark':'light'} border-${mode==='light'?'dark':'light'}`} rows="5" placeholder="Write your note's description here..." value={content} onChange={(e) => setContent(e.target.value)} style={{backgroundColor: myBgColor}} ></textarea>
                                    </div>
                                    {/* Actions */}
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className={`btn ${myBtn}success`} disabled={loading}>
                                            {loading ? "Creating..." : "Create Note"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    )
}
