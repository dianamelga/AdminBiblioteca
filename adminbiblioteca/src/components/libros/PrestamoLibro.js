import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import Suscriptores from "../suscriptores/Suscriptores";

class PrestamoLibro extends Component {
  state = {
    busqueda: "",
    resultado: {},
    sinResultados: false
  };

  buscarAlumno = e => {
    e.preventDefault();

    const { busqueda } = this.state;

    const { firestore } = this.props;

    const coleccion = firestore.collection("suscriptores");
    const consulta = coleccion.where("codigo", "==", busqueda).get();

    consulta.then(resultado => {
      if (resultado.empty) {
        this.setState({
          sinResultados: true,
          resultado: {}
        });
      } else {
        const datos = resultado.docs[0];
        this.setState({
          resultado: datos.data,
          sinResultados: false
        });
      }
    });
  };

  leerDato = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { libro } = this.props;
    if (!libro) return <Spinner />;

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al listado
          </Link>
        </div>

        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> Solicitar Prestamo: {libro.titulo}
          </h2>

          <div className="row justify-content-center mt-5">
            <div className="col-md-8">
              <form onSubmit={this.buscarAlumno}>
                <legend className="color-primary text-center">
                  Busca el suscriptor por codigo
                </legend>

                <div className="form-group">
                  <input
                    type="text"
                    name="busqueda"
                    className="form-control"
                    onChange={this.leerDato}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-success btn-block"
                  value="Buscar Alumno"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrestamoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(PrestamoLibro);
