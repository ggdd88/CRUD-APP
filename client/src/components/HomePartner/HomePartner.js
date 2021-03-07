import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Card, Form, Input, Select, Rate, Avatar, Col, Row, Button,} from 'antd';
import { EditOutlined, } from '@ant-design/icons';
import Axios from 'axios';
import './HomePartner.css';

const {Content} = Layout;
const { Meta } = Card;
const { Option } = Select;




function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  

function HomePartner () {

    var cat = localStorage.getItem('user');

    const state = { visible: false };
  
    
function handleChangeZona(value) {
  console.log(`selected ${value}`);
  setZona(value);
  }  

function handleChangeServicio(value) {
  console.log(`selected ${value}`);
  setDescripcion(value);
  }

  function handleChangeDias(value) {
    console.log(`selected ${value}`);
    setDias_(value);
    }


  

    const [usuario, setUsuario] = useState([]);
    const [zonasUsuario, setZonasUsuario] = useState([]);
    const [serviciosUsuario, setServiciosUsuario] = useState([]);
    const [diasUsuario, setDiasUsuario] = useState([]);
    

    useEffect(()=>{
          Axios.post("http://localhost:3001/api/get-user-info", {
            userid: cat,
          }).then((response) => {
            console.log(response);
            setUsuario(response.data);
          });      
    }, [])


    useEffect(()=>{
      Axios.post("http://localhost:3001/api/get-user-zones", {
        userid_: cat,
      }).then((response) => {
        console.log(response.data);
        setZonasUsuario(response.data);
      });      
}, [])

    useEffect(()=>{
      Axios.post("http://localhost:3001/api/get-user-services", {
        userid: cat,
      }).then((response) => {
        console.log(response);
        setServiciosUsuario(response.data);
      });      
    }, [])

    useEffect(()=>{
      Axios.post("http://localhost:3001/api/get-user-days", {
        userid: cat,
      }).then((response) => {
        console.log(response);
        setDiasUsuario(response.data);
      });      
    }, [])



    const [zone, setZona] = useState('');

    const [zonaList, setZona2] = useState([]);


    const setZona3 = () => {
      Axios.post("http://localhost:3001/api/set-zones", {
        userid: cat, 
        zona: zone,      
      });
      // setZona2([...zonaList, { userid: userid, zona: zone, }      
      // ]);
    };

    const [tarifa, setTarifa] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [servicioList, setServicio] = useState([]);


    const setServ = () => {
      Axios.post("http://localhost:3001/api/set-services", {
        id_usuario: cat, 
        descripcion: descripcion,  
        tarifa: tarifa,
    
      });
      // setServicio([...servicioList, { id_usuario: id_usuario, descripcion: descripcion, tarifa: tarifa }      
      // ]);
    };

    const [descripcionDias, setDias_] = useState('');

    const setDias = () => {
      Axios.post("http://localhost:3001/api/set-dias", {
        id_usuario: cat, 
        descripcion: descripcionDias,   
      });
    };




    return (
        <Layout style = {{ minHeight: '10vh' }}>
            <Layout className = "site-layout" ></Layout>
            <div class="container">
                <main class="content">
                    <landing class="landing">
                        <Content style={{ borderColor: 'red', margin: '0 16px',color:"black" }}>
                        <h1>¡Bienvenido a Go Beauty!</h1>                        
                        </Content>
                    </landing>
                    <div id="grid">                          
                      <Card
                          style={{ width: 300 }}
                          cover={
                          <img
                              alt="example"
                              src="https://image.freepik.com/vector-gratis/hombre-barbero-mascota-corte-barberia_165162-68.jpg"/>
                          }
                          actions={[
                          <EditOutlined key="edit" />,                            
                          ]}>
                          <Meta
                          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                          title={usuario.map((val, key) => {
                            return (
                              <h1>{val.nombre} {val.apellido}</h1>
                            )                        })}
                          description= {<div>
                            <p>DNI: {usuario.map((val, key) => {
                            return (
                              <p>{val.documento}</p>)})}</p>
                            {/* <p>Sexo: {usuario.map((val, key) => {
                            return (
                              <p>{val.sexo}</p>)})}</p> */}
                            {/* <p>Fecha de nacimiento: {usuario.map((val, key) => {
                            return (
                              <p>{val.fecha_nac}</p>)})}</p> */}
                            <p>Teléfono: {usuario.map((val, key) => {
                            return (
                              <p>{val.telefono}</p>)})}</p>
                            <p>Email: {usuario.map((val, key) => {
                            return (
                              <p>{val.email}</p>)})}</p>
                            <p>Calificación: {usuario.map((val, key) => {
                            return (
                              <Rate disabled defaultValue={4} />)})}</p>
                            </div>}/>
                      </Card>
                    </div>                      
                    <div id="grid_2">
                      <Card style={{marginBottom: 25 }} title="Servicios" style={{ width: 750 }}>
                      {serviciosUsuario.map((val, key) => {
                            return (
                              <p>{val.descripcion} $ {val.tarifa}</p>
                            )                        })}
                      </Card>
                      <h1>Seleccioná tus servicios</h1>
                          <Row style={{marginBottom: 25 }} gutter={16}>            
                            <Col span={12}>
                                <Select style={{ width: 120 }} onChange={handleChangeServicio}>
                                  <Option value="Pelo">Pelo</Option>
                                  <Option value="Barba">Barba</Option>
                                </Select>
                                <Input style={{width: 120, marginLeft: 29 }} placeholder="Ej.: $450" onChange={(e) => {
                                  setTarifa(e.target.value)}} />
                            </Col>
                            <Button onClick={setServ} type="primary" htmlType="submit" >Guardar Servicio</Button>
                          </Row>
                      <Card style={{marginBottom: 25 }} title="Zonas de trabajo" style={{ width: 750 }}>
                      {zonasUsuario.map((val, key) => {
                            return (
                              <p>{val.descripcion}</p>
                            )                        })}
                      </Card>
                      <h1>Seleccioná tus zonas de trabajo</h1>
                          <Row style={{marginBottom: 25 }} gutter={16}>                          
                            <Col span={12}>                  
                              <Form.Item
                                name="zone"
                                //label="Zonas de trabajo"
                                rules={[
                                  {
                                    //required: true,
                                    message: 'Ingresá al menos una zona',
                                  },
                                ]}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Ej.: Centro"
                                    onChange={handleChangeZona}
                                    optionLabelProp="label"
                                  >
                                    <Option value="Centro" label="Centro">
                                      <div className="demo-option-label-item">
                                        Centro
                                      </div>
                                    </Option>
                                    <Option value="Norte" label="Norte">
                                      <div className="demo-option-label-item">
                                        Norte
                                      </div>
                                    </Option>
                                    <Option value="Oeste" label="Oeste">
                                      <div className="demo-option-label-item">
                                        Oeste
                                      </div>
                                    </Option>
                                    <Option value="Noroeste" label="Noroeste">
                                      <div className="demo-option-label-item">
                                        Noroeste
                                      </div>
                                    </Option>
                                    <Option value="Sur" label="Sur">
                                      <div className="demo-option-label-item">
                                        Sur
                                      </div>
                                    </Option>
                                    <Option value="Sudoeste" label="Sudoeste">
                                      <div className="demo-option-label-item">
                                        Sudoeste
                                      </div>
                                    </Option>
                                  </Select>
                              </Form.Item>
                                </Col>
                                <Button style={{marginLeft: 29}} onClick={setZona3} type="primary" htmlType="submit" >Guardar Zona</Button>
                              </Row>
                      <Card style={{marginBottom: 25 }} title="Días y horarios de atención" style={{ width: 750 }}>
                      {diasUsuario.map((val, key) => {
                            return (
                              <p>{val.descripcion}</p>
                            )                        })}
                      </Card>
                      <h1>Seleccioná tus días de atención</h1>
                              <Row gutter={16}>                              
                                <Col span={12}>                  
                                <Form.Item
                              name="availability"
                              //label="Días"
                              rules={[
                                {
                                  //required: true,
                                  message: 'Ingresá al menos un día',
                                },
                              ]}>
                                  <Select
                                      mode="multiple"
                                      style={{ width: '100%' }}
                                      placeholder="Seleccioná tus días de atención"
                                      onChange={handleChangeDias}
                                      optionLabelProp="label"
                                    >
                                      <Option value="Lunes" label="Lunes">
                                        <div className="demo-option-label-item">
                                          Lunes
                                        </div>
                                      </Option>
                                      <Option value="Martes" label="Martes">
                                        <div className="demo-option-label-item">
                                          Martes
                                        </div>
                                      </Option>
                                      <Option value="Miércoles" label="Miércoles">
                                        <div className="demo-option-label-item">
                                          Miércoles
                                        </div>
                                      </Option>
                                      <Option value="Jueves" label="Jueves">
                                        <div className="demo-option-label-item">
                                          Jueves
                                        </div>
                                      </Option>
                                      <Option value="Viernes" label="Viernes">
                                        <div className="demo-option-label-item">
                                          Viernes
                                        </div>
                                      </Option>
                                      <Option value="Sábado" label="Sábado">
                                        <div className="demo-option-label-item">
                                          Sábado
                                        </div>
                                      </Option>
                                          <Option value="Domingo" label="Domingo">
                                        <div className="demo-option-label-item">
                                          Domingo
                                        </div>
                                      </Option>
                                    </Select>
                                    </Form.Item>
                                    </Col>
                                    <Button style={{marginLeft: 29}}  onClick={setDias} type="primary" htmlType="submit" >Guardar Dias</Button>
                                  </Row>
                      <Form layout="vertical" hideRequiredMark>
                      
                            
                              
                                  
                                  
                                  
                                </Form>
                    </div>
                  
                            
                          </main>
                        </div>  
                      </Layout>
                    );
                  }    

      
export default HomePartner;