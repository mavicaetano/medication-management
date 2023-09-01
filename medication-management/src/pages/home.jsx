import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Menu} from "../components/menu.jsx";

function Map() {
    const pharmacies = JSON.parse(localStorage.getItem('pharmacies')) || [];

    return (
        <div className="d-flex">
            <div className="menu-container">
                <Menu />
            </div>
            <div className="content-container">
                <div className="container">
                    <h1>Mapa de Farmácias</h1>
                    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {pharmacies.map((pharmacy, index) => (
                            <Marker key={index} position={[pharmacy.latitude, pharmacy.longitude]}>
                                <Popup>
                                    <strong>Razão Social:</strong> {pharmacy.razaoSocial}<br />
                                    <strong>CNPJ:</strong> {pharmacy.cnpj}<br />
                                    <strong>Nome Fantasia:</strong> {pharmacy.nomeFantasia}<br />
                                    {pharmacy.email && <><strong>E-mail:</strong> {pharmacy.email}<br /></>}
                                    {pharmacy.telefone && <><strong>Telefone:</strong> {pharmacy.telefone}<br /></>}
                                    <strong>Celular:</strong> <a href={`https://wa.me/55${pharmacy.celular}`} target="_blank" rel="noopener noreferrer">{pharmacy.celular}</a><br />
                                    <strong>Endereço:</strong> {pharmacy.endereco}, {pharmacy.numero}<br />
                                    {pharmacy.complemento && <><strong>Complemento:</strong> {pharmacy.complemento}<br /></>}
                                    <strong>Bairro:</strong> {pharmacy.bairro}<br />
                                    <strong>Cidade:</strong> {pharmacy.cidade}<br />
                                    <strong>Estado:</strong> {pharmacy.estado}<br />
                                    <strong>CEP:</strong> {pharmacy.cep}<br />
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export { Map }
