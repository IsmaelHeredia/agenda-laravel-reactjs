import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }: { title: string }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default PageTitle;