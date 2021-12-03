import React from 'react';
import './styles.scss';
interface Props {
    handleSubmit: (event: React.SyntheticEvent) => void;
    title: string;
    children: React.ReactChild[] | React.ReactChild;
    customClass?: string;
}

const Form: React.FC<Props> = ({
    handleSubmit,
    title,
    children,
    customClass = '',
}) => {
    return (
        <div className='form-container'>
            <h2 className='form-title'>{title}</h2>
            <form onSubmit={handleSubmit} className={`form ${customClass}`}>
                <div className='form-inputs'> {children}</div>
            </form>
        </div>
    );
};

export default Form;
