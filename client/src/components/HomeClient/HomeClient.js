import React, { Component, useState, useEffect } from 'react';
import { uniqBy } from 'lodash'
import emailjs from "emailjs-com";
import { Layout } from 'antd';
import { Rate, Avatar, Drawer, List, Divider, Col, Row, Button, Card, Modal, Input} from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './homeclient.css' 


const dataServ = [
    {
      title: 'Juan Doe',
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


    const [contratacion, setContratacion] = useState([]);
    const [ID_prestador, setID_prestador] = useState('');
    const [ID_cliente, setID_cliente] = useState('');
    const [fecha, setfecha] = useState('');

    const [usuario, setUsuario] = useState([]);
    const [servicios, setServicios] = useState([]);
    const data = uniqBy([...prestadoresList],"ID");
    const data1 = [...prestadoresList];

    //const data1 = [...prestadoresList].filter(x => x.id_usuario === usuario.ID);

    const Contratar = () => {
        Axios.post("http://localhost:3001/api/contratar", {
          ID_prestador: ID_prestador, 
          ID_cliente: ID_cliente,
          fecha: fecha,     
        });
        setContratacion([...contratacion, { ID_prestador: ID_prestador, ID_cliente: ID_cliente, fecha: fecha, }      
        ]);
      };
    


    const [visible, setVisible] = useState(false);
    const showDrawer = (item) => {
        console.log('item', item);
        console.log(data1);
        setServicios(data1.filter(x => x.id_usuario === item.ID));
        console.log(servicios);
        setUsuario(item);
      setVisible(true);
    };
    const onClose = () => {
      setVisible(false);
    };

    function sendEmail(e) {
        e.preventDefault();
        onClose();
        console.log(e.target);

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
                                        <Card title="Gastón Donati" style={{height: 253.5 }}>
                                            <h1>Fecha:</h1>
                                            <p>02/02/2021</p>
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
                                    <Card title="Gastón Donati">                                
                                    <h1>Fecha:</h1>
                                    <p>08/03/2021</p>
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
                                            <Card title={item.title}>
                                                <h1>Fecha:</h1>
                                                <p>15/03/2021</p>
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
                        <Drawer
                            title= {<h1>Perfil de: {usuario.nombre} {usuario.apellido}</h1>}
                            placement="right"
                            closable={false}
                            onClose={onClose}
                            visible={visible}
                            width= "535px"
                        >   
                            <p>Edad: 32</p>
                            <div>
                            <Row gutter={16}>
                                <Col span={13}>
                            <div className="Valoracion">
                            <h2>Promedio de valoraciones:</h2>                            
                            </div>
                            </Col>
                            <Col span={8}>
                            <div className="Opinion">
                            <Rate disabled defaultValue={usuario.calificacion}/>
                            </div>
                            </Col>
                            </Row>
                            </div>
                            <Button type="default">Ver opiniones</Button>
                            <img width= "450px" src="https://image.freepik.com/vector-gratis/hombre-barbero-mascota-corte-barberia_165162-68.jpg" alt="" />                                                                               
                            <div>
                            <Row gutter={16}>
                                <Col span={8}>
                            <div className="Servicios">
                            <h2>Servicios</h2>
                            {servicios.map(item =>(
                                
                            <p>{item.descripcion} ${item.tarifa}</p>                                        
                            ))}
                            
                            </div>
                            </Col>
                            <Col span={8}>
                            <div className="Zonas">
                            <h2>Zonas</h2>
                            <p>Centro</p>
                            <p>Norte</p>
                            <p>Noroeste</p>
                            </div>
                            </Col>
                            <Col span={8}>
                            <div className="Dias">
                            <h2>Dias</h2>
                            <p>Jueves</p>
                            <p>Viernes</p>
                            <p>Sábado</p>
                            </div>
                            </Col>
                            </Row>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <form onSubmit={sendEmail}>
                                <div className="row pt-5 mx-auto">
                                <div className="col-8 form-group mx-auto">
                                        <input type="hidden" value={usuario.ID} onChange={(e) => {
                                            setID_prestador(e.target.value)
                                            }}/>
                                    </div>
                                    <div className="col-8 form-group mx-auto">
                                        <input type="hidden" value={usuario.nombre} name="name"/>
                                    </div>
                                    <div className="col-8 form-group pt-2 mx-auto">
                                    <input type="hidden" value={usuario.apellido} name="lastname"/>
                                    </div>
                                    <div className="col-8 form-group pt-2 mx-auto">
                                    <input type="hidden" value={usuario.telefono} name="phone"/>
                                    </div>
                                    <div className="col-8 form-group pt-2 mx-auto">
                                    <input type="hidden" value={usuario.email} name="email"/>
                                    </div>
                                    <div className="col-8 pt-3 mx-auto">
                                        <input type="submit" className="btnContratar" value="Contratar" to="/contractSuccess" onClick={Contratar}></input>
                                    </div>
                                </div>
                            </form>
                        </Drawer>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    
                                    <List.Item>
                                        {console.log(item)}
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
                                    <Button type="primary" onClick={()=>showDrawer(item)}>Ver perfil</Button>
                                     
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