import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Input, Button } from "reactstrap";

const modeloContacto = {
    idContacto: 0,
    nombre: '',
    correo: '',
    telefono: ''
}
export default function ModalContacto({ mostrarModal, setMostrarModal, guardarContacto, editar, setEditar, editarContacto }) {

    const [contacto, setContacto] = useState(modeloContacto);

    const enviarDato = () => {
        if (contacto.idContacto === 0) {
            guardarContacto(contacto);
        }
        else {
            editarContacto(contacto);
        }
    }

    const actualizarDato = (e) => {
        console.log(e.target.name + ' : ' + e.target.value);
        setContacto({ ...contacto, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar);
        } else {
            setContacto(modeloContacto);
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal);
        setEditar(null);
    }

    console.log(contacto.idContacto);

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader >
                {contacto.idContacto === 0 ? 'Registrar Contacto' : 'Editar Contacto'}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={contacto.nombre} />
                    </FormGroup> <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={contacto.correo} />
                    </FormGroup> <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={contacto.telefono} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={enviarDato} size="sm">Guardar</Button>
                <Button color="danger" onClick={cerrarModal} size="sm">Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}