import React, {useState} from 'react';
import { Layout, Breadcrumb, message } from 'antd';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Axios from 'axios';



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
              //<Link to={`/HomePartner/${setLoginStatus(response.data[0].ID)}`}></Link>
            }
            else{
              setLoginStatus(response.data[0].email);
              setUserInfo(response.data);
              console.log(a);
              console.log(b);            
              localStorage.setItem('user',response.data[0].ID);
              a.history.push('./HomeClient')
            }
                                  
          }
        }).catch(e => console.log('ERROR', e));
      };
    return (
        <Layout style={{ minHeight: '75vh' }}>
            
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
              </Form.Item>

              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" onClick={Ingresar}>Ingresar</Button>
              </Form.Item>
            </Form>
            </div>
                  <h1>{loginStatus}</h1>            
                  </Content>
                  </login>
            </main>
        <div class="related-post">       
            <h1>En la comodidad de tu casa</h1>
        </div>
        <div class="related-post">
            <h1>Cuando quieras. Como quieras</h1>
        </div>
        <div class="related-post">
            <h1>El mejor precio del mercado</h1>
        </div>
        </div>

        </Layout>
    );
}
export default Login;