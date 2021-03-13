import React, { Component, useState, useEffect } from 'react';
import { uniqBy } from 'lodash'
import emailjs from "emailjs-com";
import { Layout } from 'antd';
import { Rate, Avatar, Drawer, List, Divider, Col, Row, Button, Card, Modal, Input} from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './homeclient.css' 
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom"; 






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

function HomeClient(props1) {
    const props = props1;


    var pat = localStorage.getItem('user');

    const [prestadoresList, setPrestadores] = useState([]);
    const [contratacionesList, setContrataciones] = useState([]);

    const [opi, setOpinion] = useState([]);
    
    //const [promedio, setPromedio] = useState([]);
    const [cal, setCalificacion] = useState([]);
    const [prestador_cal, setPrestador_cal] = useState('');
    const [contratacion_cal, setContratacion_cal] = useState('');
    const [cal_cal, setCal_cal] = useState('');

    const [opi_opi, setOpi_opi] = useState('');

    const [ID_cliente, setID_cliente] = useState('');


    const [contratacion, setContratacion] = useState([]);
    const [ID_prestador, setID_prestador] = useState('');
    
    const [fecha, setfecha] = useState('');

    const [usuario, setUsuario] = useState([]);
    const [cc, setCC] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [modal, setModal] = useState([]);
    const data = uniqBy([...prestadoresList],"ID");
    const data1 = [...prestadoresList];
    const data_contrataciones = [...contratacionesList];
    //const data_contrataciones_U = uniqBy([...contratacionesList],"ID_contratacion");

    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/getPartner").then((response) => {
              setPrestadores(response.data);

        });      
  }, []);

  useEffect(()=>{
      Axios.post("http://localhost:3001/api/getContrataciones", {
        ID: pat,   
      }).then((response) => {
            setContrataciones(response.data);
            setID_cliente(pat);
      });      
}, []);

  
    const showModal = (it) => {
        setCC(it);
        setPrestador_cal(it.ID_prestador);
        setContratacion_cal(it.ID_contratacion);        
       
        setIsModalVisible(true);
    };
  
    const handleOk = (cc) => { 
        setIsModalVisible(false);
        Calificar();
        // Opinar();    
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };



    const showDrawer = (item) => {
        setServicios(data1.filter(x => x.id_usuario === item.ID));
        setUsuario(item);
        setID_prestador(item.ID);      
      setVisible(true);
    };


    const onClose = () => {
      setVisible(false);

    };

    const Contratar = () => {
        Axios.post("http://localhost:3001/api/contratar", {
          ID_prestador: ID_prestador, 
          ID_cliente: pat,
          fecha: fecha,     
        });
        setContratacion({ ID_prestador: ID_prestador, ID_cliente: ID_cliente, fecha: fecha, });

        
    };

    const Calificar = () => {
        Axios.post("http://localhost:3001/api/calificar", {
            contratacion_cal: contratacion_cal,
            prestador_cal: prestador_cal, 
            id_cliente: pat,
            cal_cal: cal_cal,     
          });
          setCalificacion({ contratacion_cal: contratacion_cal, prestador_cal: prestador_cal, id_cliente: ID_cliente, cal_cal: cal_cal});

    };

    const Opinar = () => {
        Axios.post("http://localhost:3001/api/opinar", {
            contratacion_cal: contratacion_cal,
            prestador_cal: prestador_cal, 
            id_cliente: ID_cliente,
            opi_opi: opi_opi,     
          });
          setOpinion({ contratacion_cal: contratacion_cal, prestador_cal: prestador_cal, id_cliente: ID_cliente, opi_opi: opi_opi });
    };

    // const getPromedioCal = () => {
    //     Axios.get("http://localhost:3001/api/promedioCal", {
    //         id_prestador: pat,   
    //       }).then((response) => {
    //         setPromedio(response.data);
    // });


    function sendEmail(e) {
        e.preventDefault();
        onClose();
        
    emailjs.sendForm('gmail', 'template_gobeauty', e.target, 'user_kIQmrzK3a2dDp8EZlsgBT')
        .then((result) => {
            console.log(result.text);
            props.history.push("/contractSuccess");
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


                                {/* <Col span={6}>
                                <List
                                    grid={{ gutter: 16, column: 1 }}
                                    dataSource={data_contrataciones}
                                    renderItem={item => (
                                    <List.Item>
                                        <Card title={<p>{item.nombre} {item.apellido}</p>}>
                                        <h1>Fecha: {item.fecha}</h1>
                                        <p>Pendiente de pago</p>
                                        <Button type="primary" href="https://www.mercadopago.com.ar/home">Pagar</Button>                                                                                        
                                        </Card>
                                    </List.Item>
                                    )}
                                />
                                </Col> */}

                                {/* <Col span={6}>
                                <List
                                    grid={{ gutter: 16, column: 1 }}
                                    dataSource={dataServ}
                                    renderItem={item => (
                                    <List.Item>
                                        <Card title={<p>Gastón Donati</p>} style={{height: 253.5 }}>
                                            <h1>Fecha:</h1>
                                            <p>02/02/2021</p>
                                            <p>Finalizado</p>
                                        </Card>
                                    </List.Item>
                                    )}
                                />
                                </Col> */}

                                <List
                                grid={{ gutter: 16, column: 4 }}
                                dataSource={data_contrataciones}
                                renderItem={it => (
                                <List.Item>
                                    <List.Item.Meta
                                    description=
                                                {<Card title={<p>{it.nombre} {it.apellido}</p>}>                                
                                                <h1>Fecha:</h1>
                                                <p>08/03/2021</p>
                                                <p>Pendiente de valoración</p>
                                                <Button type="primary" onClick={()=>showModal(it)}>Calificar servicio</Button>
                                                </Card>}/>
                                                
                                    </List.Item>
                                    )}/>
                                    
                                    <Modal title="Calificar servicio" visible={isModalVisible} onOk={()=>handleOk(cc)} onCancel={handleCancel} width={1000}>
                                        <h1 style={{ textAlign   : 'center'}}>¿Como calificarías al prestador del servicio contratado?</h1>
                                        <p style={{ textAlign   : 'center'}}><Rate defaultValue={5} character={({ index }) => index + 1} />
                                        <br />
                                        <Rate defaultValue={0} character={({ index }) => customIcons[index + 1]} onChange={(e) => {
                                            setCal_cal(e)
                                            }}/></p>
                                        <br />    
                                        <h1 style={{ textAlign   : 'center'}}>Dejanos tu opinión acerca del prestador y del servicio</h1>
                                        <br />
                                        <Input.TextArea style={{ textAlign   : 'center'}} rows="3" cols="10" />

                                    </Modal>


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
                            
                            <form onSubmit={sendEmail} >
                                <div className="row pt-5 mx-auto">
                                {/* <div className="col-8 form-group mx-auto">
                                        <input type="hidden" value={usuario.ID} onChange={(e) => {
                                            setID_prestador(e.target.value)
                                            }}/>
                                    </div> */}
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
                                    <div className="col-8 pt-3 mx-auto" >
                                    
                                        <input type="submit" className="btnContratar" value="Contratar" name="Submit" id="frm1_submit" onClick={Contratar}></input>
                                        
                                    </div>                                    
                                </div>
                            </form>
                        </Drawer>
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