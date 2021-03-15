import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 56,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} es requerido!',
  types: {
    email: '${label} no es un email válido',
  },
};
/* eslint-enable no-template-curly-in-string */

const Contact = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div class="container">
    <main class="content">
      <h2 style={{textAlign: 'center'}}>Contactate con nosotros</h2>
      <br/>      
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Nombre"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
         <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Su mensaje">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button style={{marginLeft: '510px'}}type="primary" htmlType="submit">
          Enviar Mensaje
        </Button>
      </Form.Item>
    </Form>
    </main>
    </div>
  );
};
export default Contact;