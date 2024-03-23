import { Table, Button } from "reactstrap";
export default function TablaContactos({ contactos, setEditar, mostrarModal, setMostrarModal, eliminarContacto }) {

    const enviarDatos = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                </tr>
            </thead>
            <tbody>
                {
                    (contactos.length < 1) ? (
                        <tr>
                            <td colSpan={4}>No hay contactos</td>
                        </tr>
                    ) : (
                        contactos.map(item => (
                            <tr key={item.idContacto}>
                                <td>{item.nombre}</td>
                                <td>{item.correo}</td>
                                <td>{item.telefono}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarContacto(item.idContacto)}>Elminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table >
    )
}        