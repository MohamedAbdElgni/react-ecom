import Alert from 'react-bootstrap/Alert';
function AlertNew(props) {
    return (
        <Alert variant="danger" onClose={props.onClose} dismissible className='animate__animated animate__backInUp rounded-0 mt-1'>
            <Alert.Heading>{props.title}</Alert.Heading>
            <p>{props.message}</p>
        </Alert>
    );
}

export default AlertNew;