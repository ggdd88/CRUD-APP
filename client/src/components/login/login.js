import React, {useState} from 'react';
import ReactPlayer from "react-player"
import { Layout, Breadcrumb, message, Card } from 'antd';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './login.css'



const { Content} = Layout;

const layout = {
    labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    const tailLayout = {
    wrapperCol: {
    offset: 8,
    span: 16,
    },
    };

    const onFinish = (values) => {
    console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const state = {
      collapsed: false,
      };
  
      const onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
      };
  
    function Login (a, b) {

      const [emailLogin1, setEmailLogin] = useState("");
      const [pwLogin, setPwLogin] = useState("");

      const [loginStatus, setLoginStatus] = useState("");
      //const [log, setLog] = useState([]);

      const [userInfo, setUserInfo] = useState("");

      const Ingresar = () => {
        
        Axios.post("http://localhost:3001/api/login", {
          emailLogin: emailLogin1,
          pwLogin: pwLogin,
        }).then((response) => {
          if (response.data.message) {
            setLoginStatus(response.data.message);            
          } else {
            if(response.data[0].tipo == 0) {
              setLoginStatus(response.data[0].email);
              setUserInfo(response.data);              
              console.log(a);
              console.log(b);            
              localStorage.setItem('user',response.data[0].ID);
              a.history.push('./HomePartner')              
            }
            else{
              setLoginStatus(response.data[0].email);
              setUserInfo(response.data);
              console.log(a);
              console.log(b);            
              localStorage.setItem('user',response.data[0].ID);
              a.history.push('./HomeClient')
            };
            Loguear(response.data[0].ID, 'Iniciar Sesión');
                                  
          }
          
        }).catch(e => console.log('ERROR', e));
        
      };



      const Loguear = (ide, string) => {
        
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        Axios.post("http://localhost:3001/api/log", {
          id_usuario: ide,
          fecha_hora: dateTime,
          operacion: string,     
        });
        //setLog({ id_usuario: id_usuario, fecha_hora: fecha_hora, operacion: operacion, }); 
      };
      
      return (
        <Layout style={{ minHeight: '75vh' }}>
            <div class = "buttons">
            <Button type="primary"style={{ marginTop: '10px', marginLeft: '1535px'}}><Link to="/signupClient"> Registrarse </Link></Button>                             
            <Button type="primary"style={{ marginLeft: '10px', width: '250px'}} ><Link to="/signup"> Quiero ser parte de Go Beauty</Link></Button>
            </div>
            
            <Layout className="site-layout"></Layout>


                <div class="container">
                <element className = "imagen-login">
                  <img src="/login.png"/>
                </element>
                    <main class="content">
                        <login class="login">
                          
                            <Content style={{ margin: '0 16px' }}>
                            
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Bienvenido</Breadcrumb.Item>
                                    <Breadcrumb.Item>Login</Breadcrumb.Item>
                                </Breadcrumb>
            <div className="site-layout-background" style={{ width: 500, padding: 20, minHeight: 360 }}>        
            <Form
                  {...layout}
                  name="basic"
                  initialValues={{
                  remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
            >
                  <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                  {
                  required: true,
                  message: 'Ingresá tu email',
                  },
                  ]}
                >
                <Input onChange={(e) => {setEmailLogin(e.target.value);}}/>
                </Form.Item>

                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[
                  {
                  required: true,
                  message: 'Ingresá tu contraseña',
                  },
                  ]}
                >
                <Input.Password onChange={(e) => {setPwLogin(e.target.value);}}/>
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                  <Checkbox>Recordarme</Checkbox>
                  <a type="link" style={{ marginLeft: '65px', color: 'black'}}>Olvidé mi contraseña</a>
              </Form.Item>              
              <Form.Item {...tailLayout}>
                  <Button style={{width: '306.66px'}} type="primary" htmlType="submit" onClick={Ingresar}>Ingresar</Button>
              </Form.Item>
            </Form>
            </div>
                  <h1>{loginStatus}</h1>            
                  </Content>
                  </login>
            </main>
        <div class="related-post">       
            <h3>En la comodidad de tu casa</h3>
        </div>
        <div class="related-post">
            <h3>Cuando quieras. Como quieras</h3>
        </div>
        <div class="related-post">
            <h3>El mejor precio del mercado</h3>
        </div>
        <br/>
        <br/>
        <br/>
        <div >
            <ReactPlayer style= {{position: "relative",
    left: "18%",}} url="https://youtu.be/Q3Ygsb_Ds_s"
            />
          </div>
        </div>

        </Layout>
    );
}
export default Login;