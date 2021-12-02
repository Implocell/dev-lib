import './styles.scss';

interface Props {
    title: string;
    customClass?: string;
}

const PageTitle = ({ title, customClass = '' }: Props) => {
    return <h2 className={`title ${customClass}`}>{title}</h2>;
};

export default PageTitle;
