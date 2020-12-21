import React, { Component, useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Rate, Avatar, Drawer, List, Divider, Col, Row, Button,} from 'antd';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './homeclient.css' 

const {Content} = Layout;

function HomeClient() {

    const [prestadoresList, setPrestadores] = useState([]);

    useEffect(()=>{
          Axios.get("http://localhost:3001/api/getPartner").then((response) => {
                console.log(response);
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


    return (
        <Layout style = {{ minHeight: '10vh'}}>
            <Layout className = "site-layout" ></Layout>
            <div class="container">
                <main class="content">
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
                                                <Rate disabled defaultValue={3} />
                                            </div>}                                       
                                    />
                                    <Button type="primary" onClick={showDrawer}>Ver perfil</Button>
                                    <Drawer
                                        title= {<h1>Perfil de: {item.nombre} {item.apellido} </h1>}
                                        placement="right"
                                        closable={false}
                                        onClose={onClose}
                                        visible={visible}
                                        width= "500px"
                                    >
                                        <h2>Promedio de valoraciones:</h2>
                                        <Rate disabled defaultValue={3} />
                                        <img width= "450px" src="https://image.freepik.com/vector-gratis/hombre-barbero-mascota-corte-barberia_165162-68.jpg" alt="" />
                                        <p>Fecha de nacimiento: {item.fecha_nac}</p>
                                        <p>Documento: {item.documento}</p>
                                        <p>Sexo: {item.sexi}</p>
                                        <h1>Servicios</h1>
                                        <Button type="primary" onClick={onClose}>Contratar</Button>
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