import React from "react";
import './App.css';
import Header from './components/header'
import Footer from './components/footer'



class App extends React.Component {
  state={
    usuario: {}
  }

  loguearUsuario=(usuario)=> {
    this.setState({
      usuario: usuario,
    })
  } 



  

  render () {

    const childrenWithProps = React.Children.map(this.props.children, child => {
      // checking isValidElement is the safe way and avoids a typescript error too
      if (React.isValidElement(child)) {
          return React.cloneElement(child, { loguearUsuario: this.loguearUsuario, propsPadre: this.props });
      }
      return child;
  });

    return (
      <div id='appContainer' className='appContainerGlobal'>
            <Header/>
            {childrenWithProps}
          <Footer/>
      </div>
    );
  }
}

export default App;
