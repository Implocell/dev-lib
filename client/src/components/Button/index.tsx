interface Props {
    text: string;
    type: 'button' | 'reset' | 'submit';
}

const Button = ({ text, type = 'button' }: Props) => {
    const extraClass = type === 'submit' ? 'form-' : '';

    return (
        <div className={`${extraClass}button`}>
            <button type={type}>{text}</button>
        </div>
    );
};

export default Button;
