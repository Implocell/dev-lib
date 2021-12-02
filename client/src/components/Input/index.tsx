interface Props {
    value: string;
    onChange: (value: string) => void;
    type: 'text' | 'email' | 'password';
    id: string;
    displayName: string;
}

const Input = ({ value, onChange, type, id, displayName }: Props) => {
    return (
        <div className='form-input'>
            <label htmlFor={id}>{displayName}:</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default Input;
