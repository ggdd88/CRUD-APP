import React, { Component, useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Card, Form, Input, Select, DatePicker, Rate, Avatar, TimePicker, Drawer, List, Divider, Checkbox, Col, Row, Button,} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './HomePartner.css';

const {Content} = Layout;
const { Meta } = Card;
const { Option } = Select;
const { RangePicker } = TimePicker;



function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

function handleChange(value) {
console.log(`selected ${value}`);
}  
  

function HomePartner () {

    var cat = localStorage.getItem('user');

    const state = { visible: false };
  
    const showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    const onClose = () => {
      this.setState({
        visible: false,
      });
    };

    const [usuario, setUsuario] = useState([]);
    

    useEffect(()=>{
          Axios.post("http://localhost:3001/api/get-user-info", {
            userid: cat,
          }).then((response) => {
            console.log(response);
            setUsuario(response.data);
          });      
    }, []);

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
                                        src="https://image.freepik.com/vector-gratis/hombre-barbero-mascota-corte-barberia_165162-68.jpg"
                                    />
                                    }
                                    actions={[
                                    <EditOutlined key="edit" />,                            
                                    ]}
                                >
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
                                      <p>Sexo:</p><p>Fecha de nacimiento:</p><p>Teléfono:</p><p>Email:</p><p>Calificación:</p></div>}
                                    />
                                </Card>
                                </div>
                                <div id="grid_2">

                            
                            

              <Card title="Servicios" style={{ width: 750 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Zonas de trabajo" style={{ width: 750 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Días y horarios de atención" style={{ width: 750 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
              <Button type="primary" onClick={showDrawer}>Configuración de perfil</Button>
              <Drawer
          //title="Servicios"
          width={720}
          onClose={onClose}
          visible={state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancelar
              </Button>
              <Button onClick={onClose} type="primary">
                Guardar
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
          <h1>Seleccioná tus servicios</h1>
            <Row gutter={16}>            
              <Col span={12}>                  
              <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                    <Row>
                    <Col span={8}>
                        <Checkbox value="A">Pelo</Checkbox>
                    </Col>
                    <Form.Item
                  name="tarifa"
                  rules={[{ required: true, message: 'Ingresá la tarifa' }]}
                >
                  <Input placeholder="Ingresá la tarifa" />
                </Form.Item>
                    </Row>
                </Checkbox.Group>
              </Col>
            </Row>
            <Row gutter={16}>            
              <Col span={12}>                  
              <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                    <Row>
                    <Col span={8}>
                        <Checkbox value="B">Barba</Checkbox>
                    </Col>
                    <Form.Item
                  name="tarifa"
                  rules={[{ required: true, message: 'Ingresá la tarifa' }]}
                >
                  <Input placeholder="Ingresá la tarifa" />
                </Form.Item>
                    </Row>
                </Checkbox.Group>
              </Col>
            </Row>
            

            <h1>Seleccioná tus zonas de trabajo</h1>
            <Row gutter={16}>
            
              <Col span={12}>                  
              <Form.Item
            name="zone"
            //label="Zonas de trabajo"
            rules={[
              {
                required: true,
                message: 'Ingresá al menos una zona',
              },
            ]}
          >
<Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Seleccioná tus zonas"
    onChange={handleChange}
    optionLabelProp="label"
  >
    <Option value="centro" label="Centro">
      <div className="demo-option-label-item">
        Centro
      </div>
    </Option>
    <Option value="norte" label="Norte">
      <div className="demo-option-label-item">
        Norte
      </div>
    </Option>
    <Option value="oeste" label="Oeste">
      <div className="demo-option-label-item">
        Oeste
      </div>
    </Option>
    <Option value="noroeste" label="Noroeste">
      <div className="demo-option-label-item">
        Noroeste
      </div>
    </Option>
    <Option value="sur" label="Sur">
      <div className="demo-option-label-item">
        Sur
      </div>
    </Option>
    <Option value="sudoeste" label="Sudoeste">
      <div className="demo-option-label-item">
        Sudoeste
      </div>
    </Option>
  </Select>
           
            </Form.Item>
              </Col>
            </Row>
            <h1>Seleccioná tus días y horarios de atención</h1>
            <Row gutter={16}>
            
              <Col span={12}>                  
              <Form.Item
            name="availability"
            label="Días"
            rules={[
              {
                required: true,
                message: 'Ingresá al menos un día',
              },
            ]}
          >
<Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Seleccioná tus días de atención"
    onChange={handleChange}
    optionLabelProp="label"
  >
    <Option value="lunes" label="Lunes">
      <div className="demo-option-label-item">
        Lunes
      </div>
    </Option>
    <Option value="martes" label="Martes">
      <div className="demo-option-label-item">
        Martes
      </div>
    </Option>
    <Option value="miercoles" label="Miércoles">
      <div className="demo-option-label-item">
        Miércoles
      </div>
    </Option>
    <Option value="jueves" label="Jueves">
      <div className="demo-option-label-item">
        Jueves
      </div>
    </Option>
    <Option value="viernes" label="Viernes">
      <div className="demo-option-label-item">
        Viernes
      </div>
    </Option>
    <Option value="sabado" label="Sábado">
      <div className="demo-option-label-item">
        Sábado
      </div>
    </Option>
        <Option value="domingo" label="Domingo">
      <div className="demo-option-label-item">
        Domingo
      </div>
    </Option>
  </Select>
  <Form.Item label="Horario">
  <RangePicker format= "HH:mm"></RangePicker>
  </Form.Item>
  
           
            </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        </div>                 

                                    
                                                                          
                </main>
            </div>  
        </Layout>
    );
}    

      
export default HomePartner;