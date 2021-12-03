import './styles.scss';

interface Props {
    value: boolean;
    onChange: (value: boolean) => void;
    id: string;
    displayName: string;
}

const Checkbox = ({ value, onChange, id, displayName }: Props) => {
    return (
        <div className='checkbox'>
            <label htmlFor={id}>{displayName}:</label>
            <input
                type='checkbox'
                id={id}
                onChange={(e) => onChange(e.target.checked)}
                checked={value}
            />
        </div>
    );
};

export default Checkbox;
