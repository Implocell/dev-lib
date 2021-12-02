import './styles.scss';

interface Props {
    value: string;
    onChange: (value: string) => void;
    id: string;
    displayName: string;
    cols?: number;
    rows?: number;
}

const TextArea = ({
    onChange,
    value,
    id,
    displayName,
    cols = 50,
    rows = 4,
}: Props) => {
    return (
        <div className='text-area'>
            <label htmlFor={id}>{displayName}:</label>
            <textarea
                id={id}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                cols={cols}
            >
                {value}
            </textarea>
        </div>
    );
};

export default TextArea;
