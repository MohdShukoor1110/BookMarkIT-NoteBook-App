import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';
import { NotebookText } from 'lucide-react';

export default function Navbar(props) {
    const btnText = props.mode === 'light'?'Switch to Dark Mode':'Switch to Light Mode'

    let myBtn
    if (props.mode==="light") {
        myBtn = "btn-outline-";
    } else {
        myBtn = "btn-";
    }

    return (
        <div>
            <header className={`bg-${props.mode} border-bottom border-dark`} >
                <div className="container px-4">
                    <div className="d-flex align-items-center justify-content-between p-2">
                        <h3 className="fw-bold text-primary font-monospace mb-0">
                            <a href="/">
                                <NotebookText className="mb-1 me-2" />
                            </a>
                            BookMarkIT
                        </h3>
                        <div className="d-flex align-items-center gap-3">
                            <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
                                <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="switchCheckDefault"/>
                                <label className="form-check-label" htmlFor="switchCheckDefault">{btnText}</label>
                            </div>
                            <Link to="/create" className={`btn ${myBtn}primary d-flex align-items-center`}>
                                <PlusIcon className="me-2" style={{ width: "1.25rem", height: "1.25rem" }} />
                                <span>New Note</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
