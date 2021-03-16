import React, { useState, useEffect } from 'react';
import { uniqBy } from 'lodash'
import emailjs from "emailjs-com";
import { Layout } from 'antd';
import { Rate, Avatar, Drawer, List, Col, Row, Button, Card, Modal, Input, DatePicker, Space,} from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import Axios from 'axios';
import './homeclient.css'
import { Link } from 'react-router-dom';



const dataServ = [
    {
      title: 'Lautaro Garcia',
    },
  ];

  const { RangePicker } = DatePicker;

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
    const [opinionesList, setOpinionesList] = useState([]);

    const [opi, setOpinion] = useState([]);
    
    const [promedio, setPromedio] = useState([]);
    const [cal, setCalificacion] = useState([]);
    const [prestador_cal, setPrestador_cal] = useState('');
    const [contratacion_cal, setContratacion_cal] = useState('');
    const [cal_cal, setCal_cal] = useState('');

    const [opi_opi, setOpi_opi] = useState('');

    const [ID_cliente, setID_cliente] = useState('');

    const [contratacion, setContratacion] = useState([]);
    const [ID_prestador, setID_prestador] = useState('');
    
    const [fecha, setfecha] = useState([]);
    const [cita, setCita] = useState([]);
    
    const [user, setUser] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [cc, setCC] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [zonas, setZonas] = useState([]);
    const [dias, setDias] = useState([]);
    const data = uniqBy([...prestadoresList],"ID");
    const data1 = [...prestadoresList];
    const data_contrataciones = [...contratacionesList];

    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isModalVisible_o, setIsModalVisible_o] = useState(false);

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/getPartner").then((response) => {
              setPrestadores(response.data);

            });      
    }, [opi]);

    useEffect(()=>{
        Axios.post("http://localhost:3001/api/getContrataciones", {
            ID: pat,   
        }).then((response) => {
                setContrataciones(response.data);
                setID_cliente(pat);
                
            });      
    }, []);

    useEffect(()=>{
        Axios.post("http://localhost:3001/api/get-user-info", {
        userid: pat,
        }).then((response) => {
        console.log(response);
        setUser(response.data);
        });      
    }, []);


    let locale = {
        emptyText: 'Aún no contrataste ningún servicio',
      };

      let locale2 = {
        emptyText: 'Este prestador aún no posee opiniones',
      };


    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        
    }
    
    function onOk(e) {
        console.log('onOk: ', e);
        fechear(e);
        
    }
  
    const showModal = (it) => {
        setCC(it);
        setPrestador_cal(it.ID_prestador);
        setContratacion_cal(it.ID_contratacion);        
       
        setIsModalVisible(true);
    };
  
    const handleOk = (cc) => { 
        setIsModalVisible(false);
        Calificar2();
        Opinar();    
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const showDrawer = (item) => {
        setServicios(data1.filter(x => x.id_usuario === item.ID));
        setZonas(data1.filter(x => x.ID_usuario === item.ID));
        setDias(data1.filter(x => x.id_usuario_d === item.ID));
        setUsuario(item);        
        getOpiniones(item);
        getPromedioCal(item);
        setID_prestador(item.ID);
             
      setVisible(true);

    };


    const onClose = () => {
      setVisible(false);

    };

    const showModal_o = () => {
        setIsModalVisible_o(true);
      };
    
      const handleOk_o = () => {
        setIsModalVisible_o(false);
      };
    
      const handleCancel_o = () => {
        setIsModalVisible_o(false);
      };


    const Contratar = () => {        
        console.log('fechaC', fecha);
        Axios.post("http://localhost:3001/api/contratar", {
          ID_prestador: ID_prestador, 
          ID_cliente: pat,  
          fecha: fecha,     
        });
        setContratacion({ ID_prestador: ID_prestador, ID_cliente: ID_cliente, fecha: fecha, });      

        
    };

    const fechear = (e) => {
        
        const splitter = e + '';
        
        const sp = splitter.split('T');
        
        const split_fecha = sp[0] + '';
        const split_hora = sp[1] + '';

        const fecha_ = split_fecha.split('-');
        const f = fecha_[2] + '/' + fecha_[1] + '/' + fecha_[0];

        const hora_ = split_hora.split(':');
        const h = hora_[0] + 'hs.';
        const send = f + ' ' + h;
        setCita(send);
        

    };

    // const Calificar = () => {
    //     Axios.post("http://localhost:3001/api/calificar", {
    //         contratacion_cal: contratacion_cal,
    //         prestador_cal: prestador_cal, 
    //         id_cliente: pat,
    //         cal_cal: cal_cal,     
    //       });
    //       setCalificacion({ contratacion_cal: contratacion_cal, prestador_cal: prestador_cal, id_cliente: ID_cliente, cal_cal: cal_cal});

    // };

    const Calificar2 = () => {
        Axios.post("http://localhost:3001/api/calificar2", {
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
            id_cliente: pat,
            opi_opi: opi_opi,     
          });
          setOpinion({ contratacion_cal: contratacion_cal, prestador_cal: prestador_cal, id_cliente: ID_cliente, opi_opi: opi_opi });
    };

    const getPromedioCal = (item) => {
        
        Axios.post("http://localhost:3001/api/promedioCal", {
            id_prestador: item.ID,   
          }).then((response) => {
            //console.log('response', response.data);
            setPromedio(response.data);
            //console.log('prom', promedio[0].prom);

    })};

    const getOpiniones = (item) => {

        Axios.post("http://localhost:3001/api/opinionesPrest", {
        id_prestador: item.ID,   
            }).then((response) => {
        setOpinionesList(response.data);


    })};

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

    const Loguear = () => {
        
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        Axios.post("http://localhost:3001/api/log", {
          id_usuario: pat,
          fecha_hora: dateTime,
          operacion: 'Cerrar sesión',     
        });
        localStorage.setItem('user','');
      };

    return (
        <Layout style = {{ minHeight: '10vh'}}>
            
            <Layout className = "site-layout" ></Layout>
            {user.map((val, key) => {return (<h2 style={{ marginLeft: '10px'}} >¡Bienvenido {val.nombre}!</h2>)})}
            <Button onClick={Loguear} type="primary" style={{ marginLeft: '1775px', width: '110px'}}><Link to="/login">Cerrar Sesión</Link></Button>                              
            <div class="container">
                <main class="content">
                    <landing class="landing">
                        <Content style={{ borderColor: 'red', margin: '0 16px',color:"black" }}>
                        <h1>Estos son tus servicios contratados</h1>
                        </Content>
                    </landing>
                        <div className="site-card-wrapper">
                                <List
                                grid={{ gutter: 16, column: 4 }}
                                dataSource={data_contrataciones}
                                locale={locale}
                                renderItem={it => (
                                <List.Item>
                                    <List.Item.Meta
                                    description=
                                                {<Card title={<h4>{it.nombre} {it.apellido}</h4>}>                                
                                                <h4>Fecha:</h4>
                                                <p>{it.fecha}</p>
                                                <p>Pendiente de valoración</p>
                                                <Button type="primary" onClick={()=>showModal(it)}>Valorar servicio</Button>
                                                </Card>}/>                                                
                                    </List.Item>
                                    )}/>
                                    <Col span={6}>
                                        <List
                                            grid={{ gutter: 16, column: 1 }}
                                            dataSource={dataServ}
                                            renderItem={item => (
                                            <List.Item>
                                                <Card style={{width: '227.5px', minHeight: '227.5px'}}  title={<p>{item.title}</p>}>
                                                <h4>Fecha:</h4>
                                                <p>20/02/2021 18hs.</p>
                                                <p>Pendiente de pago</p>
                                                <Button type="primary" href="https://www.mercadopago.com.ar/home">Pagar</Button>                                                                                        
                                                </Card>
                                            </List.Item>
                                            )}
                                        />
                                    </Col>                                                                     
                                    <Modal title="Valorá el servicio contratado" visible={isModalVisible} onOk={()=>handleOk(cc)} onCancel={handleCancel} width={1000}>
                                        <h1 style={{ textAlign   : 'center'}}>¿Como calificarías al prestador del servicio contratado?</h1>
                                        <p style={{ textAlign   : 'center'}}><Rate defaultValue={5} character={({ index }) => index + 1} />
                                        <br />
                                        <Rate defaultValue={0} character={({ index }) => customIcons[index + 1]} onChange={(e) => {
                                            setCal_cal(e)
                                            }}/></p>
                                        <br />    
                                        <h1 style={{ textAlign   : 'center'}}>Dejanos tu opinión acerca del prestador y del servicio</h1>
                                        <br />
                                        <Input.TextArea defaultValue= "" onChange={(e) => {
                                            setOpi_opi(e.target.value)
                                            }} style={{ textAlign   : 'center'}} rows="3" cols="10" />
                                    </Modal>
                        </div>
                        <br/>
                        <br/>
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
                            width= "530px">   
                            <p>Edad: 32</p>
                            <div>
                            <Row gutter={16}>
                                <Col span={13}>
                            <div className="Valoracion">
                            <h2>Promedio de valoraciones:</h2>                            
                            </div>
                            </Col>
                            <Col span={8}>
                            <div className="rate">
                            <Rate disabled defaultValue={usuario.calificacion}/> 
                            {/* {console.log('la', usuario.calificacion)}
                            {console.log('lla', promedio[0].prom)}                            */}
                            </div>
                            </Col>
                            </Row>
                            </div>
                            <Button type="primary" onClick={showModal_o}>Ver opiniones</Button>
                            <img width= "385px" src="https://image.freepik.com/vector-gratis/hombre-barbero-mascota-corte-barberia_165162-68.jpg" alt="" />                                                                               
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
                            {zonas.map(meti =>(                                
                            <p>{meti.descripcion_z}</p>                                        
                            ))}   
                            </div>
                            </Col>
                            <Col span={8}>
                            <div className="Dias">
                            <h2>Dias</h2>
                            {dias.map(dia =>(                                
                            <p>{dia.descripcion_d}</p>                                        
                            ))}  
                            </div>
                            </Col>
                            </Row>
                            </div>
                            <div className="Fecha">
                            <h2>Elegí tu turno</h2>
                            <Space direction="vertical" size={12}>
                                <DatePicker format="DD-MM-YYYY-HH" showToday="true" showTime="true" onChange={onChange} onChange={(e) => {
                                                setfecha(e) 
                                                }} onOk={(value) => {onOk(value)}} 
                                            />
                            </Space>
                            </div>
                            <br/>                            
                            <form onSubmit={sendEmail} >
                                <div className="row pt-5 mx-auto">
                                    {/* <div className="col-8 form-group mx-auto">
                                        <input type="hidden" value={cita} name="fecha"/>
                                    </div> */}
                                    <div className="col-8 form-group mx-auto">
                                        <input type="hidden" value={user.map((val, key) => {return (val.nombre)})} name="cliente"/>
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
                                    <div className="col-8 pt-3 mx-auto" >                                    
                                        <input type="submit" className="btnContratar" value="Contratar" name="Submit" id="frm1_submit" onClick={Contratar}></input>                                        
                                    </div>                                    
                                </div>
                            </form>
                        </Drawer>
                        <Modal  title="Opiniones" visible={isModalVisible_o} onOk={handleOk_o} onCancel={handleCancel_o}>
                        <List
                            itemLayout="horizontal"
                            dataSource={opinionesList}
                            locale={locale2}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCDe5JZ_HkfuU5VFQDlF0j1jeCl-SCj_mJdA&usqp=CAU" />}
                                title={<h3>{item.nombre} {item.apellido}</h3>}
                                description={item.opinion}
                                />
                            </List.Item>
                            )}
                        />
                        </Modal>
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