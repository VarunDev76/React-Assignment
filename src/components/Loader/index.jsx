/**
 * Import Node Modules
 */
import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'

class Loader extends Component{
  render(){
    let { size } = this.props;
    return(
      <>
        {size && (
          <Spinner animation="border" variant="light" className="mr-2" size="sm" />
        )}
        {!size && (
          <div className="d-flex flex-fill bg-white w-100 py-4 justify-content-center">
            <Spinner animation="border" style={{color:'#02B3E4'}} />
          </div>
        )}
      </>
    )
  }
}

export default Loader;