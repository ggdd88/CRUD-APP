import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './header.css'

class HeaderEjemplo extends React.Component {
  
    render(){
        return(
            <div className="site-page-header-ghost-wrapper">
              <Link to="/home"><img src="/logo_header.png"/></Link>
              <Button type="link" style={{color: 'white', fontSize:'medium ', marginLeft: '1430px'}}><Link to="/about"> Acerca de Go Beauty</Link></Button>
              <Button type="link" style={{color: 'white', fontSize:'medium '}}><Link to="/contact">Contacto</Link></Button>
          </div>
        );  
    }
}

export default HeaderEjemplo;