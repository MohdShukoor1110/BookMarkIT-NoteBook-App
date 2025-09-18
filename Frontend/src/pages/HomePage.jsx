import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import NoteCard from '../components/NoteCard.jsx';
import NoNotes from '../components/NoNotes.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import api from '../lib/axios.js';

export default function HomePage(props) {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                // console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.log("Error fetching notes");
                console.log(error.response);
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    return (
        <div>
            <div className="min-vh-90">
                
                {isRateLimited && <RateLimitedUI mode={props.mode}/>}

                <div className="container mt-4">
                    {loading && (
                        <div className="text-center text-primary py-5">Loading notes...</div>
                    )}

                    {notes.length === 0 && !isRateLimited && <NoNotes mode={props.mode}/>}


                    {notes.length > 0 && !isRateLimited && (
                        <div className="row g-4">
                            <h2 className={`m-2 text-${props.mode==='light'?'dark':'light'}`}>Your Notes...</h2>
                            {notes.map((note) => (
                                <div key={note._id} className='col-12 col-md-6 col-lg-4 mb-4 mt-0'>
                                    <NoteCard note={note} setNotes={setNotes} mode={props.mode}/>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};
