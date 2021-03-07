import React, { Component, useState, useEffect } from 'react';
import emailjs from "emailjs-com";
import { Layout } from 'antd';
import { Rate, Avatar, Drawer, List, Divider, Col, Row, Button, Card, Modal, Input} from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './homeclient.css' 


const dataServ = [
    {
      title: 'Libertad Mises',
    },
  ];

  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };


const {Content} = Layout;

function HomeClient() {

    const [prestadoresList, setPrestadores] = useState([]);

    const [profileInfo, setProfileInfo] = useState([]);


    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    useEffect(()=>{
          Axios.get("http://localhost:3001/api/getPartner").then((response) => {
                console.log(response.data);
                setPrestadores(response.data);
          });      
    }, []);

    
    const data = [...prestadoresList];


    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      setVisible(false);
    };

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
        <Layout style = {{ minHeight: '10vh'}}>
            <Layout className = "site-layout" ></Layout>
            <div class="container">
                <main class="content">
                    <landing class="landing">
                        <Content style={{ borderColor: 'red', margin: '0 16px',color:"black" }}>
                        <h1>Estos son tus servicios contratados</h1>
                        </Content>
                    </landing>
                        <div className="site-card-wrapper">
                                <Row gutter={16}>
                                <Col span={6}>
                                <List
                                grid={{ gutter: 16, column: 1 }}
                                dataSource={dataServ}
                                renderItem={item => (
                                <List.Item>
                                    <Card title={item.title}>                                
                                    <h1>Estado:</h1>
                                    <p>Pendiente de valoración</p>
                                    <Button type="primary" onClick={showModal}>Calificar servicio</Button>
                                        <Modal title="Calificar servicio" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                                            <h1 style={{ textAlign   : 'center'}}>¿Como calificarías al prestador del servicio contratado?</h1>
                                            <p style={{ textAlign   : 'center'}}><Rate defaultValue={5} character={({ index }) => index + 1} />
                                            <br />
                                            <Rate defaultValue={5} character={({ index }) => customIcons[index + 1]} /></p>
                                            <br />    
                                            <h1 style={{ textAlign   : 'center'}}>Dejanos tu opinión acerca del prestador y del servicio</h1>
                                            <br />
                                            <Input.TextArea style={{ textAlign   : 'center'}} rows="3" cols="10" />

                                        </Modal>
                                    </Card>
                                </List.Item>
                                )}
                            />
                                </Col>
                                <Col span={6}>
                                <List
                                    grid={{ gutter: 16, column: 1 }}
                                    dataSource={dataServ}
                                    renderItem={item => (
                                    <List.Item>
                                        <Card title={item.title} style={{height: 218.5 }}>
                                            <h1>Estado:</h1>
                                            <p>Finalizado</p>
                                        </Card>
                                    </List.Item>
                                    )}
                                />
                                </Col>
                                <Col span={6}>
                                        <List
                                        grid={{ gutter: 16, column: 1 }}
                                        dataSource={dataServ}
                                        renderItem={item => (
                                        <List.Item>
                                            <Card title={item.title}>
                                                <h1>Estado:</h1>
                                                <p>Pendiente de pago</p>
                                                <Button type="primary" href="https://www.mercadopago.com.ar/home">Pagar</Button>
                                            </Card>
                                        </List.Item>
                                        )}
                                        />
                                </Col>
                                </Row>
                        </div>
                    <landing class="landing">
                        <Content style={{ borderColor: 'red', margin: '0 16px',color:"black" }}>
                        <h1>Elegí uno de nuestros representantes</h1>
                        </Content>
                    </landing>
                        <div>
            
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                    <List.Item.Meta
                                    
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description= 
                                            {<div>
                                                <h1>{item.nombre} {item.apellido}</h1>
                                                <p>Promedio de valoraciones:</p>
                                                <Rate disabled defaultValue={item.calificacion} />
                                            </div>}
                                    />
                                    <Button type="primary" onClick={showDrawer}>Ver perfil</Button>
                                    <Drawer
                                        title= {<h1>Perfil de: {item.nombre} {item.apellido}</h1>}
                                        placement="right"
                                        closable={false}
                                        onClose={onClose}
                                        visible={visible}
                                        width= "500px"
                                    >
                                        <h2>Promedio de valoraciones:</h2>
                                        <Rate disabled defaultValue={item.calificacion} />
                                        <img width= "450px" src="https://image.freepik.com/vector-gratis/hombre-barbero-mascota-corte-barberia_165162-68.jpg" alt="" />                                                                               
                                        <h1>Servicios</h1>
                                        <p>{item.descripcion} {item.tarifa}</p>                                        
                                        <Button type="primary" onClick={onClose}><Link to="/contractSuccess">Contratar</Link></Button>
                                        <form onSubmit={sendEmail}>
                                            <div className="row pt-5 mx-auto">
                                                <div className="col-8 form-group mx-auto">
                                                    <input type="text" className="form-control" text="Gaston" placeholder="Name" name="name"/>
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
                                    </Drawer> 
                                </List.Item>
                                )}
                            />                                                                                                          
                        </div>                      
                </main>
            </div>  
        </Layout>
    );
}    
 
export default HomeClient;