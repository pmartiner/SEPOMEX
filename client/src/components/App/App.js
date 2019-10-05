import React, { Component } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

const api = require('../../utils/api');

class App extends Component{
  state = {
    d_codigo: "",
    d_estado: "",
    d_mnpio: "",
    d_asenta: "",
    estados: [],
    municipios: [],
    colonias: [],
    hasErrors: false,
    infoSepomex: [],
    infoPoblada: false
  }

  componentDidMount() {
    api.getEstados()
    .then(data => {
      this.setState({
        estados: [...data.estados]
      })
    });
  }

  changeSwitchHandler = (e) => {
    this.setState({
      [e.target.dataset.tipo]: e.target.value
    });

    if(e.target.dataset.tipo === "d_estado")
      api.getMunicipios(e.target.value)
      .then(data => {
        this.setState({
          municipios: [...data.municipios]
        })
      });

    if(e.target.dataset.tipo === "d_mnpio")
      api.getColonias(this.state.d_estado, e.target.value)
      .then(data => {
        this.setState({
          colonias: [...data.colonias]
        })
      });
  }

  submitHandler = () => {
    const info = {
      d_codigo: this.state.d_codigo,
      d_estado: this.state.d_estado,
      d_mnpio: this.state.d_mnpio,
      d_asenta: this.state.d_asenta
    }

    var isStateEmpty = !this.state.d_codigo ||
      !this.state.d_estado ||
      !this.state.d_mnpio ||
      !this.state.d_asenta;

    if(!isStateEmpty)
      api.getInfoCP(info)
      .then(data => {
        this.setState({
          infoSepomex: [...data],
          infoPoblada: true
        })
        document.getElementById('res').scrollIntoView({
          behavior: 'smooth'
        });
      });
    else {
      alert("Faltan campos por llenar.");
      this.setState({
        hasErrors: true
      })
    }
  }

  render() {
    let hideMunicipio = "hide";
    let hideColonia = "hide";
    let estados = [];
    let municipios = [];
    let colonias = [];
    let errorCP = "";
    let errorColonia = "";
    let errorEstado = "";
    let errorMunicipio = "";
    let hideHelperCol = "hide";
    let hideHelperEdo = "hide";
    let hideHelperMnpio = "hide";
    let resClass = "hide";

    let results = [];

    if(this.state.hasErrors){
      if(this.state.d_codigo === "") errorCP = "invalid";
      if(!this.state.d_asenta) { errorColonia = "invalid"; hideHelperCol = "invalid"; }
      if(!this.state.d_estado) { errorEstado = "invalid"; hideHelperEdo = "invalid"; }
      if(!this.state.d_mnpio) { errorMunicipio = "invalid"; hideHelperMnpio = "invalid"; }
    }


    if(this.state.estados.length !== 0) 
      estados = this.state.estados.map((elem, i) => {
        return <option key={ elem + i } value={ elem }>{ elem }</option>;
      });
    
    if(this.state.municipios.length !== 0) 
      municipios = this.state.municipios.map((elem, i) => {
        return <option key={ elem + i } value={ elem }>{ elem }</option>;
      });

    if(this.state.colonias.length !== 0) 
      colonias = this.state.colonias.map((elem, i) => {
        return <option key={ elem + i } value={ elem }>{ elem }</option>;
      });
    
    if(this.state.d_estado !== "")
      hideMunicipio = "";
    
    if(this.state.d_mnpio !== "")
      hideColonia = "";

    if(this.state.infoPoblada && this.state.infoSepomex.length !== 0) {
      resClass = "";

      results = this.state.infoSepomex.map((elem, i) => {
        return(
          <div className="row" key={elem.d_codigo + '_' + i}>
            <div className="col s12">
              <div className="card-panel white">
                <div className="row">
                  <h5 style={ {textAlign: 'center'} }>C.P: { elem.d_codigo }</h5>
                </div>
                <div className="row">
                  <div className="col s4">
                    <p className="bold">
                      Código Postal del asentamiento:
                    </p>
                    <p>
                      { elem.d_codigo }
                    </p>
                  </div>
                  <div className="col s4">
                    <p className="bold">
                      Nombre del asentamiento:
                    </p>
                    <p>
                      { elem.d_asenta }
                    </p>
                  </div>
                  <div className="col s4">
                    <p className="bold">
                      Tipo de asentamiento:
                    </p>
                    <p>
                      { elem.d_tipo_asenta }
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col s4">
                    <p className="bold">
                      Nombre del municipio:
                    </p>
                    <p>
                      { elem.d_mnpio }
                    </p>
                  </div>
                  <div className="col s4">
                    <p className="bold">
                      Nombre del estado (entidad):
                    </p>
                    <p>
                      { elem.d_estado }
                    </p>
                  </div>
                  <div className="col s4">
                    <p className="bold">
                      Nombre de la ciudad:
                    </p>
                    <p>
                      { elem.d_ciudad }
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col s4">
                    <p className="bold">
                      Código Postal de la Administración Postal que reparte al asentamiento:
                    </p>
                    <p>
                      { elem.d_cp }
                    </p>
                  </div>
                  <div className="col s4">
                    <p className="bold">
                      Clave del estado (entidad):
                    </p>
                    <p>
                      { elem.c_estado }
                    </p>
                  </div>
                  <div className="col s4">
                    <p className="bold">
                      Código Postal de la oficina de la Administración Postal que reparte al asentamiento:
                    </p>
                    <p>
                      { elem.c_oficina }
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col s4">
                    <p className="bold">
                      Clave del tipo de asentamiento:
                    </p>
                    <p>
                      { elem.c_tipo_asenta }
                    </p>
                  </div>
                  <div className="col s4">
                    <p className="bold">
                      Clave del municipio:
                    </p>
                    <p>
                      { elem.c_mnpio }
                    </p>
                  </div>
                  <div className="col s4">
                    <p className="bold">
                      Identificador único del asentamiento (nivel municipal):
                    </p>
                    <p>
                      { elem.id_asenta_cpcons }
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col s4">
                    <p className="bold">
                      Zona en la que se ubica el asentamiento:
                    </p>
                    <p>
                      { elem.d_zona }
                    </p>
                  </div>
                  <div className="col s4 offset-s4">
                    <p className="bold">
                      Clave de la ciudad:
                    </p>
                    <p>
                      { elem.c_cve_ciudad }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    if(this.state.infoPoblada && this.state.infoSepomex.length === 0) {
      resClass = "";
      results = [<h6 style={ {textAlign: 'center'} }>No hay resultados para esta petición.</h6>]
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <h4>
            Información SEPOMEX
          </h4>
        </header>
        <article className="content">
          <div className="container">
            <div className="row">
              <h5 className="teal-text darken-3 margin-text">Bienvenide. Por favor llena los campos de código postal, estado, municipio y colonia para recibir la información de SEPOMEX basada en estos datos. ¡Gracias!</h5>
            </div>
            <div className="row">
              <p className="grey-text">Nota: las opciones de municipio y colonia no apareceraán hasta que elijas un estado.</p>
            </div>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input onChange={ (e) => this.changeSwitchHandler(e) } id="d_codigo" type="text" className={"validate " + errorCP} data-tipo="d_codigo"/>
                    <label htmlFor="d_codigo">Código postal</label>
                    <span className="helper-text" data-error="Este campo es obligatorio"></span>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s4">
                    <select onChange={ (e) => this.changeSwitchHandler(e) } id="select_estado" className={"validate browser-default " + errorEstado} defaultValue="" data-tipo="d_estado">
                      <option value="" disabled>Elige un estado</option>
                      { estados }
                    </select>
                    <label htmlFor="select_estado" className="active">Estado</label>
                    <span className={ "helper-text " + hideHelperEdo } data-error="Este campo es obligatorio">Este campo es obligatorio</span>
                  </div>
                  <div className={"input-field col s4 " + hideMunicipio }>
                    <select onChange={ (e) => this.changeSwitchHandler(e) } id="select_municipio" className={"validate browser-default " + errorMunicipio} defaultValue="" data-tipo="d_mnpio">
                      <option value="" disabled>Elige un municipio</option>
                      { municipios }
                    </select>  
                    <label htmlFor="select_municipio" className="active">Municipio</label>
                    <span className={ "helper-text " + hideHelperMnpio } data-error="Este campo es obligatorio">Este campo es obligatorio</span>
                  </div>
                  <div className={"input-field col s4 " + hideColonia }>
                    <select onChange={(e) => this.changeSwitchHandler(e)} id="select_colonia" className={"validate browser-default " + errorColonia} defaultValue="" data-tipo="d_asenta">
                      <option value="" disabled>Elige una colonia</option>
                      { colonias }
                    </select>  
                    <label htmlFor="select_colonia" className="active">Colonia</label>
                    <span className={ "helper-text " + hideHelperCol } data-error="Este campo es obligatorio">Este campo es obligatorio</span>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s4 left-align">
                    <a className="btn waves-effect waves-light" onClick={ this.submitHandler } href="#res">Enviar
                      <i className="material-icons right">send</i>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <section className={"results " + resClass}>
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <h4 id="res">Resultados: </h4>
                  <div>
                    { results }
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default App;
