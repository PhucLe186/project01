import Button from '~/component/Button';

function List({ data }) {
    return (
        <Button to={data.to} onClick={data.onclick}>
            {data.title}
        </Button>
    );
}

export default List;
