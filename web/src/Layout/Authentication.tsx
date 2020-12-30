import React from 'react';
import './style.css'

const Authentication: React.FC = ({ children }) => {
    return (
        <div className="container">
            {children}
            <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>

        </div>
    )
}

export default Authentication;