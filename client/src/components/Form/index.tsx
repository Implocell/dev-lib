interface Props {
    handleSubmit: (event: React.SyntheticEvent) => void;
    children: React.ReactChild[];
    customClass?: string;
}

const Form = ({ handleSubmit, children, customClass }: Props) => {
    return (
        <form onSubmit={handleSubmit} className={`form ${customClass}`}>
            {children}
        </form>
    );
};

export default Form;
