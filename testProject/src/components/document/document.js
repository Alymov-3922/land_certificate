import React, { useEffect, useState } from "react";
import "./document.css";
import logo from "../../assets/img/giprozem-logo.png";
import { QRCodeCanvas } from "qrcode.react";
import { TileLayer, MapContainer, Polygon } from "react-leaflet";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

const Document = () => {
  const { ink } = useSelector((store) => store.auth);
  const [info, setInfo] = useState({});
  const [polygon, setPolygon] = useState(false);
  console.log(ink);
  const { loading, error, data } = useQuery(gql`
    query MyQuery {
      hub_hub_landinfo(
        where: { ink_code: { _eq: "${ink}" } }
      ) {
        id
        main_map
        ink_code
        eni_code
        asr_address
        longitude
        latitude
        owner_info
        inn_pin
        property_form
        doc_enttitlement
        special_purpose_asr
        land_factarea_asr
        Contour {
          gip_cropyields {
            gip_culture {
              name
            }
            year
          }
        }
      }
    }
  `);
  useEffect(() => {
    if (data) {
      setInfo(data.hub_hub_landinfo[0]);
    }
  }, [data]);
  useEffect(() => {
    if (info) {
      setPolygon(info?.main_map?.coordinates[0]);
    }
  }, [info]);
  if (loading) return <p>...loading</p>;
  if (error) return <p>error</p>;
  return (
    <div className="wrapper">
      <nav className="navbar">
        <img className="giprozem_logo" src={logo} alt="giprozem-logo" />
        <div className="title">
          <h1>Электронная выписка</h1>
          <h3>на элементарный участок</h3>
        </div>
        <div className="qr_code">
          <div id="qrcode"></div>
          <QRCodeCanvas value="http://192.168.0.150:3000/document" />
        </div>
      </nav>
      <div className="date_num">
        <div className="num">№ 00123</div>
        <br />
        <div className="date">Дата: 01.01.2000</div>
      </div>
      <div className="table_data">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <p className="table_title">Информация о земельном участке.</p>
            </tr>
          </thead>
          <hr />
          <tbody>
            <tr>
              <th scope="row">Идентификационный номер контура (ИНК)</th>
              <td style={{ color: "red" }}>Hello {info?.ink_code}</td>
            </tr>
            <tr>
              <th scope="row">ЕНИ код</th>
              <td style={{ color: "red" }}>Hello {info?.eni_code}</td>
            </tr>
            <tr>
              <th scope="row">Место расположение:</th>
              <td></td>
            </tr>
            <tr>
              <td className="land_address">Адрес участка</td>
              {/* <td>Чуйская обл., Аламудунский район</td> */}
              <td style={{ color: "red" }}>Hello {info?.asr_address}</td>
            </tr>
            <tr>
              <td className="land_address">Долгота</td>
              {/* <td>78.12157110607144</td> */}
              <td style={{ color: "red" }}>Hello {info?.longitude}</td>
            </tr>
            <tr>
              <td className="land_address">Широта</td>
              {/* <td>42.613751791719494</td> */}
              <td style={{ color: "red" }}>Hello {info?.latitude}</td>
            </tr>
            <tr>
              <th scope="row">Данные о собственнике:</th>
              <td></td>
            </tr>
            <tr>
              <td className="owner_info">ФИО</td>
              <td>Асанов Үсөн</td>
            </tr>
            <tr>
              <td className="owner_info">ИНН</td>
              <td>20101200200102</td>
            </tr>
            <tr>
              <th scope="row">Форма собственности</th>
              {/* <td>Государственная собственность</td> */}
              <td style={{ color: "red" }}>Hello {info?.property_form}</td>
            </tr>
            <tr>
              <th scope="row">Правоудостоверяющий документ</th>
              {/* <td>
                Удостоверение на право временного пользования земельным участком
                или договор аренды
              </td> */}
              <td style={{ color: "red" }}>Hello {info?.doc_enttitlement}</td>
            </tr>
            <tr>
              <th scope="row">Категория земли</th>
              <td>Земли сельскохозяйственного назначения</td>
            </tr>
            <tr>
              <th scope="row">Земельное угодье</th>
              <td>Сельскохозяйственный вид угодий</td>
            </tr>
            <tr>
              <th scope="row">Целевое назначение</th>
              {/* <td>Пахота</td> */}
              <td style={{ color: "red" }}>
                Hello {info?.special_purpose_asr}
              </td>
            </tr>
            <tr>
              <th scope="row">Фактическая площадь земельного участка, кв.м</th>
              <td style={{ color: "red" }}>Hello {info?.land_factarea_asr}</td>
              {/* <td>28 035.26</td> */}
            </tr>
            <tr>
              <th scope="row">Кадастровая стоимость, сом</th>
              <td>100 000</td>
            </tr>
            <tr>
              <th scope="row">Вид культуры (в текущее время)</th>
              <td>Пшеница</td>
            </tr>
            <tr>
              <th scope="row">Вид культуры (предшественник)</th>
              <td>Пшеница</td>
            </tr>
            <tr>
              <th scope="row">Урожайность (предшественник), кг</th>
              <td>2 000</td>
            </tr>
            <tr>
              <th scope="row">Предварительная стоимость урожая, сом</th>
              <th>5 000 000</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="map_content">
        <div id="map">
          {polygon && (
            <MapContainer
              // center={[42.87, 74.59]}
              center={polygon[0]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polygon pathOptions={{ color: "purple" }} positions={polygon} />
              {/* <Marker position={[42.87, 74.59]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker position={[42.9, 74.59]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
            </MapContainer>
          )}
        </div>
      </div>
      <footer>
        <section className="">
          <footer className="bg-secondary text-white">
            <div className="container p-4">
              <div className="row">
                <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                  <h5 className="text-uppercase">
                    Электронная выписка на элементарный участок
                  </h5>

                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Iste atque ea quis molestias. Fugiat pariatur maxime quis
                    culpa corporis vitae repudiandae aliquam voluptatem veniam,
                    est atque cumque eum delectus sint!
                  </p>
                </div>
              </div>
            </div>

            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2022 Гипрозем
              <a className="text-white" href="https://mdbootstrap.com/">
                balance.24mycrm.com
              </a>
            </div>
          </footer>
        </section>
      </footer>
    </div>
  );
};

export default Document;
