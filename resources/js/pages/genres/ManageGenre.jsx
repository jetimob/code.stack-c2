import { useParams } from 'react-router-dom';
import Page from '../../components/layout/Page.jsx';
import UpsertGenre from '../../forms/UpsertGenre.jsx';

const ManageGenre = () => {
    const { id } = useParams();
    const breadcrumbs = [{ title: 'Genres', to: '/genres' }];

    if (id) {
        breadcrumbs.push({ title: id, to: `/authors/${id}` });
    }

    return(
        <Page
            title={id ? `Edit Genre - ${id}` : 'New Genre'}
            breadcrumbs={breadcrumbs}
        >
            <UpsertGenre id={id} />
        </Page>
    );
};

export default ManageGenre;
