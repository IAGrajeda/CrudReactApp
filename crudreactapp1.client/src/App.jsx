import { useEffect, useState } from 'react';
import { Container, Row, Card, CardHeader, CardBody, Button, Col } from 'reactstrap';
import './App.css';
import TablaContactos from './Components/TablaContacto';
import ModalContacto from './Components/ModalContacto';
function App() {
    const [contacto, setContactos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        getContactos();
    }, []);

    async function getContactos() {
        const response = await fetch('api/contacto/lista', {
            method: 'GET'
        });
        if (response.ok) {
            const data = await response.json();
            setContactos(data);
        }
    }

    async function guardarContacto(contacto) {
        const reponse = await fetch('/api/contacto/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json: charset=utf-8',
            },
            body: JSON.stringify(contacto)
        });
        if (reponse.ok) {
            setMostrarModal(!mostrarModal);
            getContactos();
        }
    }

    const editarContacto = async (contacto) => {
        const response = await fetch('/api/contacto/editar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json: charset=utf-8',
            },
            body: JSON.stringify(contacto)
        });
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            getContactos();
        }
    }

    const eliminarContacto = async (id) => {
        var respuesta = window.confirm(`¿Esta seguro que desea eliminar el contacto ${contacto.idContacto}?`);
        if (!respuesta) {
            return;
        }
        const response = await fetch('api/contacto/eliminar/' + id, {
            method: 'DELETE'
        });
        if (response.ok) {
            getContactos();
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>
                                Nuevo contacto
                            </Button>
                            <hr>
                            </hr>
                            <TablaContactos contactos={contacto} setEditar={setEditar} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} eliminarContacto={eliminarContacto} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContacto
                mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} guardarContacto={guardarContacto} editar={editar} setEditar={setEditar} editarContacto={editarContacto}
            />
        </Container>
    );
}

export default App;