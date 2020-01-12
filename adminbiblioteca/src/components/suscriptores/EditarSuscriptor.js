import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

class EditarSuscriptor extends Component {
  
    //crear los refs
    nombreInput = React.createRef();
    apellidoInput = React.createRef();
    codigoInput = React.createRef();
    carreraInput = React.createRef();

    editarSuscriptor = e => {
        e.preventDefault();

        const suscriptorActualizado = {
            nombre : this.nombreInput.current.value,
            apellido : this.apellidoInput.current.value,
            codigo : this.codigoInput.current.value,
            carrera : this.carreraInput.current.value
        }

        const { suscriptor, firestore, history } = this.props;

        firestore.update({
            collection: 'suscriptores',
            doc: suscriptor.id
        }, suscriptorActualizado).then(history.push('/suscriptores'));


    }

  render() {
    const { suscriptor } = this.props;
    if (!suscriptor) return <Spinner />;

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/suscriptores"} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
          <i className="fas fa-user"></i>{' '}Editar Suscriptor
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.editarSuscriptor}>
                <div className="form-group">
                  <label>Nombre: </label>
                  <input
                    required
                    placeholder="Nombre del Suscriptor"
                    name="nombre"
                    className="form-control"
                    type="text"
                    ref={this.nombreInput}
                    defaultValue={suscriptor.nombre}
                  />
                </div>
                <div className="form-group">
                  <label>Apellido: </label>
                  <input
                    required
                    placeholder="Apellido del Suscriptor"
                    name="apellido"
                    className="form-control"
                    type="text"
                    ref={this.apellidoInput}
                    defaultValue={suscriptor.apellido}
                  />
                </div>
                <div className="form-group">
                  <label>Carrera: </label>
                  <input
                    required
                    placeholder="Carrera del Suscriptor"
                    name="carrera"
                    className="form-control"
                    type="text"
                    ref={this.carreraInput}
                    defaultValue={suscriptor.carrera}
                  />
                </div>
                <div className="form-group">
                  <label>Codigo: </label>
                  <input
                    required
                    placeholder="Codigo del Suscriptor"
                    name="codigo"
                    className="form-control"
                    type="text"
                    ref={this.codigoInput}
                    defaultValue={suscriptor.codigo}
                  />
                </div>

                <input
                  type="submit"
                  value="Editar Suscriptor"
                  className="btn btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditarSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    {
      collection: "suscriptores",
      storeAs: "suscriptor",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(EditarSuscriptor);
