import React from 'react';
import {  Radio, Layout, Form, Input, Select, Checkbox, Button, } from 'antd';
//import {  DatePicker, Space, } from 'antd';
import { Link } from 'react-router-dom';
import {useState, useEffect} from "react";
//import './App.css';
import Axios from 'axios';



const { Option } = Select;

const formItemLayout = {
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

// function onChange(date, dateString) {
//   console.log(date, dateString);
// }


  const SignupPartner = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [sexo, setSexo] = useState('');
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [fecha_nac, setFecha_nac] = useState('');
    const [telefono, setTelefono] = useState('');
    const [pw, setPw] = useState('');
    const [tarifa, setTarifa] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [prestadorList, setPrestador] = useState([]);
    //const [newReview, setNewReview] = useState ("");

    const altaPrestador = () => {
      Axios.post("http://localhost:3001/api/insert", {
        nombre: nombre, 
        apellido: apellido,
        sexo: sexo,
        documento: documento,
        email: email,
        fecha_nac: fecha_nac,
        telefono: telefono,
        pw: pw,
        calificacion: calificacion,      
      });
      setPrestador([...prestadorList, { nombre: nombre, apellido: apellido, sexo: sexo, documento: documento, email: email, fecha_nac: fecha_nac, telefono: telefono, pw: pw, calificacion: calificacion, }      
      ]);
    };
          
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+54</Option>
      </Select>
    </Form.Item>
  );
 

  
  

        return (
          <Layout style={{ minHeight: '75vh' }}>
        <Layout className="site-layout"></Layout>
        
          <div class="singup">
          <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{   
            prefix: '+54',
          }}
          scrollToFirstError
          > 
        <h1>Para formar parte de la red de prestadores de servicios deberá completar los siguientes datos:</h1>

        <Form.Item
        name="name"
        label="Nombre"
        rules={[
          {
            
            message: 'El nombre que ingresaste no es válido',
          },
          {
            required: true,
            message: 'Ingresá tu nombre',
          },
        ]}
      >
        <Input type="text" name="nombre" onChange={(e) => {
          setNombre(e.target.value)
        }} />
      </Form.Item>
      
      <Form.Item
            name="lastname"
            label="Apellido"
            rules={[
              {
                
                message: 'El apellido que ingresaste no es válido',
              },
              {
                required: true,
                message: 'Ingresá tu apellido',
              },
            ]}
          >
            <Input type="text" name="apellido" onChange={(e) => {
          setApellido(e.target.value)
        }} />
          </Form.Item>
          <Form.Item
            name="sex"
            label="Sexo"
            rules={[
              {
                
                message: 'El sexo no es válido',
              },
              {
                required: true,
                message: 'Seleccioná tu sexo',
              },
            ]}
          >
                    {/* <input type="text" name="sexo" onChange={(e) => {
          setSexo(e.target.value) 
        }} /> */}
                  <Radio.Group onChange={(e) => {
          setSexo(e.target.value) 
        }} buttonStyle="solid">
      <Radio.Button value="1">Masculino</Radio.Button>
      <Radio.Button value="2">Femenino</Radio.Button>

    </Radio.Group>


          </Form.Item>
          {/* <Form.Item
        name="borndate"
        label="Fecha de nacimiento"
        rules={[
          {
            
            message: 'La fecha que seleccionaste no es válida',
          },
          {
            required: true,
            message: 'Ingresá tu fecha de nacimiento',
          },
        ]}
      >
          <Space onChange={(e) => {
          setFecha_nac(e.target.value) 
        }} direction="vertical">
            <DatePicker placeholder="Seleccioná..." onChange={onChange} />
          </Space>,

      </Form.Item> */}
          <Form.Item
            name="documento"
            label="Documento"
            rules={[
              {
                
                message: 'El documento que ingresaste no es válido',
              },
              {
                required: true,
                message: 'Ingresá tu documento',
              },
            ]}
          >
            <Input type="text" name="documento" onChange={(e) => {
          setDocumento(e.target.value)
        }} />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'El email que ingresaste no es válido',
              },
              {
                required: true,
                message: 'Ingresá tu email',
              },
            ]}
          >
            <Input type="text" name="email" onChange={(e) => {
          setEmail(e.target.value)
        }} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              {
                required: true,
                message: 'Ingresá tu contraseña',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item
            name="confirm"
            label="Repetir Contraseña"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'confirmá tu contraseña',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
    
                  return Promise.reject('Las contraseñas no coinciden');
                },
              }),
            ]}
          >
            <Input.Password type="text" name="pw" onChange={(e) => {
          setPw(e.target.value)
        }} />
            </Form.Item>                               
            {/* <Form.Item
        name="tarifa"
        label="Tarifa"
        rules={[
          {
            
            message: 'Ingresá una tarifa válida',
          },
          {
            required: true,
            message: 'Ingresá tu tarifa',
          },
        ]}
      >
        <Input type="text" name="tarifa" onChange={(e) => {
          setTarifa(e.target.value)
        }} />
      </Form.Item> */}
      {/* <Form.Item
            name="type"
            label="Tipo de servicio"
            rules={[
              {
                
                message: 'El tipo de servicio no es válido',
              },
              {
                required: true,
                message: 'Seleccioná tu tipo de servicio',
              },
            ]}
          >
                  <Radio.Group buttonStyle="solid">
      <Radio.Button value="a">Barbería</Radio.Button>
      <Radio.Button value="b">Estética de manos</Radio.Button>

    </Radio.Group>


          </Form.Item> */}
            {/* <Form.Item label="Dirección">
        <Input.Group compact>
          <Form.Item
            name={['address', 'city']}
            noStyle
            rules={[{ required: true, message: 'Ingresá tu Localidad' }]}
          >
            <Select placeholder="Localidad">
              <Option value="Rosario">Rosario</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['address', 'street']}
            noStyle
            rules={[{ required: true, message: 'Ingresá tu calle y número' }]}
          >
            <Input style={{ width: '80%' }} placeholder="Calle y número" />
            
          </Form.Item>
          </Input.Group>
          </Form.Item> */}
            <Form.Item
            name="phone"
            label="Teléfono"
            rules={[
              {
                required: true,
                message: 'Ingresá tu teléfono',
              },
            ]}
          >
            <Input type="text" name="telefono" onChange={(e) => {
          setTelefono(e.target.value)
        }} 
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
            </Form.Item>
            <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Para registrarse debe aceptar los términos y condiciones'),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              No he leído, pero si acepto los <a href="https://www.argentina.gob.ar/terminos-y-condiciones">Términos y condiciones.</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button onClick={altaPrestador} type="primary" htmlType="submit" ><Link to="/signupSuccess">Registrarse</Link>
            </Button>
          </Form.Item>
        </Form>
        </div>
        </Layout>
        );
    }

export default SignupPartner;