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

        function sendEmail(e) {
            e.preventDefault();
    
        emailjs.sendForm('gmail', 'template_gobeauty', e.target, 'user_kIQmrzK3a2dDp8EZlsgBT')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset()
        }

    return (
        <Layout style={{ minHeight: '35vh' }}>
            
            <Layout className="site-layout"></Layout>
                <div class="container">
                    <main class="content">
                    <div>
            <div className="container">
            <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <label type="text" className="form-control" placeholder="Name" name="name"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email Address" name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Subject" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="to" name="to"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Send Message"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
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

