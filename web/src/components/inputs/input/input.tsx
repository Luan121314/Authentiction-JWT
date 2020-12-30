import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label: string
}

const Input:React.FC<InputProps> = ({label, name, ...rest}) => {
    return (
        <div className="form-group row">
            <label htmlFor={name} className="col-sm-8 col-form-label">{label}</label>
            <div className="col-sm-12">
                <input type="text" name={name} className="form-control" {...rest} id={name} />
            </div>
        </div>
    )
}

export default Input;