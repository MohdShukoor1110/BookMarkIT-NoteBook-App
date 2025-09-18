import { ZapIcon } from 'lucide-react';

export default function RateLimitedUI({mode}) {
  return (
    <div>
        <div className="container px-4 py-4">
            <div className={`rounded shadow border border-${mode==='light'?'primary':'dark'} border-opacity-25 bg-${mode==='light'?'primary':'dark'} bg-opacity-10`}>
                <div className="d-flex flex-column flex-md-row align-items-center p-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 bg-${mode==='light'?'primary':'dark'} bg-opacity-25 p-3 rounded-circle mb-3 mb-md-0 me-md-3`}>
                        <ZapIcon size={40} className={`text-${mode==='light'?'primary':'light'}`} />
                    </div>
                    {/* Text */}
                    <div className="flex-grow-1 text-center text-md-start">
                        <h3 className={`fs-5 fw-bold mb-2 text-dark`}>Rate Limit Reached</h3>
                        <p className={`mb-1 text-dark`}>You've made too many requests in a short period. Please wait a moment.</p>
                        <p className={`small text-muted mb-0`}>Try again after a few seconds for the best experience.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
