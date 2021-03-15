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

const About = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (

    <div class="container">
       <element className = "imagen-login">
                  <img src="/about.jpg"/>
                  
                </element>
    <main class="content">
      <h1>¡Hola! Bienvenido a Go Beauty</h1>
      <h2>Quiénes somos</h2>
      <p style={{color:'#000000', fontSize:'large'}}>
      Go Beauty es un proyecto de e-Commerce de servicios con un modelo de negocios basado en la modalidad C2C (Consumer-to-Consumer) destinado a cumplir las funciones de una aplicación web donde su principal objetivos es ser un punto de encuentro entre profesionales que ofrezcan servicios de belleza y tratamientos para manos y pies con personas que quieran contratar dichos servicios.
      A diferencia del modelo actual de contratación de servicios de belleza, donde los clientes deben concurrir al local físico y donde la el precio del servicio tiene un único oferente, en Go Beauty, se plantea la posibilidad de que los potenciales clientes cuenten con muchas ofertas por un servicio y que este se pueda llevar a cabo en la comodidad de su hogar.
      Este modelo de negocio apoya a una libre competencia de oferta de servicios que no hace más que favorecer la contratación de mejores servicios a un menor costo.
      </p>
      <h2>Misión</h2>
      <p style={{color:'#000000',fontSize:'large'}}>
      “Generar un espacio virtual de encuentro entre oferentes y demandantes de servicios de estética que permita satisfacer las necesidades de ambas partes”
      </p>
      <h2>Visión</h2>
      <p style={{color:'#000000',fontSize:'large'}}>
      Establecer a Go Beauty como la plataforma virtual líder de contratación de servicios de estética en la ciudad de Rosario dentro del plazo de 3 años.
      </p>
      <h2>Ventajas</h2>
      <p style={{color:'#000000',fontSize:'large'}}>
      Las ventajas principales de Go Beauty son las siguientes:
      </p>
      <ul style={{color:'#000000',fontSize:'large',marginLeft:'3em'}}>
        <li>Software base robusto y gratuito.</li>
        <li>Pensado para todas las personas que tengan conocimientos básicos de navegación en internet.</li>
        <li>Interfaz gráfica intuitiva y adaptable a todo tipo de navegadores.</li>
        <li>Estética moderna y flujo de contratación sencillo</li>
        <li>Alcance potencialmente global.</li>
      </ul>
      <h2 style={{marginLeft:'30em'}} marginLeft>Equipo de Go Beauty</h2>
    </main>
    </div>
  );
};
export default About;