import emailjs from "emailjs-com";
import React from 'react';
import { Layout, Result, Button } from 'antd';
import { Link } from 'react-router-dom';

    class contractSuccess extends React.Component {
    state = {
    collapsed: false,
    };

    onCollapse = collapsed => { 
    console.log(collapsed);
    this.setState({ collapsed });
    };

    



    render() {

    return (
        <Layout style={{ minHeight: '35vh' }}>            
            <Layout className="site-layout"></Layout>
                <div class="container">
                    <main class="content">
                    <Result style={{ margin: 153, minHeight: '35vh' }} status="success" title="¡Felicitaciones, ha contrado un servicio!" subTitle="Necesitamos que confirmes la registración desde el correo que hemos enviado a tu casilla." 
                    extra={[
                            <Button type="primary" key="home"><Link to="/HomeClient">Ir al menú principal</Link></Button>,
                            ]}
                    />
                    </main>       
                </div>
            </Layout>
    );
    }
}
export default contractSuccess;

