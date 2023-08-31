import { Menu } from "../components/menu"

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function NewPharmacy() {
    const [formData, setFormData] = useState({
        razaoSocial: '',
        cnpj: '',
        nomeFantasia: '',
        email: '',
        telefone: '',
        celular: '',
        cep: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        complemento: '',
        latitude: 0,
        longitude: 0,
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleMapClick(e) {
        setFormData({
            ...formData,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
        });
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const requiredFields = ['razaoSocial', 'cnpj', 'nomeFantasia', 'email', 'celular', 'cep', 'endereco', 'numero', 'bairro', 'cidade', 'estado', 'latitude', 'longitude'];

        const missingFields = requiredFields.filter(field => !formData[field]);
        if (missingFields.length > 0) {
            alert(`Os campos ${missingFields.join(', ')} são obrigatórios.`);
            return;
        }

        const pharmacies = JSON.parse(localStorage.getItem('pharmacies')) || [];
        pharmacies.push(formData);
        localStorage.setItem('pharmacies', JSON.stringify(pharmacies));

        alert('Farmácia cadastrada com sucesso!');
        setFormData({
            razaoSocial: '',
            cnpj: '',
            nomeFantasia: '',
            email: '',
            telefone: '',
            celular: '',
            cep: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            complemento: '',
            latitude: 0,
            longitude: 0,
        });
    }

    return (
        <div className="d-flex">
            <div className="menu-container">
                <Menu />
            </div>
            <div className="content-container">
                <div className="container">
                    <h1>Cadastro de Nova Farmácia</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="razaoSocial" className="form-label">Razão Social *</label>
                            <input type="text" className="form-control" id="razaoSocial" name="razaoSocial" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cnpj" className="form-label">CNPJ *</label>
                            <input type="text" className="form-control" id="cnpj" name="cnpj" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nomeFantasia" className="form-label">Nome Fantasia *</label>
                            <input type="text" className="form-control" id="nomeFantasia" name="nomeFantasia" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail *</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefone" className="form-label">Telefone</label>
                            <input type="text" className="form-control" id="telefone" name="telefone" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="celular" className="form-label">Celular *</label>
                            <input type="text" className="form-control" id="celular" name="celular" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cep" className="form-label">CEP *</label>
                            <input type="text" className="form-control" id="cep" name="cep" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="endereco" className="form-label">Logradouro/Endereço *</label>
                            <input type="text" className="form-control" id="endereco" name="endereco" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="numero" className="form-label">Número *</label>
                            <input type="text" className="form-control" id="numero" name="numero" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bairro" className="form-label">Bairro *</label>
                            <input type="text" className="form-control" id="bairro" name="bairro" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cidade" className="form-label">Cidade *</label>
                            <input type="text" className="form-control" id="cidade" name="cidade" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="estado" className="form-label">Estado *</label>
                            <input type="text" className="form-control" id="estado" name="estado" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="complemento" className="form-label">Complemento</label>
                            <input type="text" className="form-control" id="complemento" name="complemento" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <h4>Geolocalização</h4>
                            <MapContainer center={[formData.latitude, formData.longitude]} zoom={13} style={{ height: '300px' }} onClick={handleMapClick}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[formData.latitude, formData.longitude]}>
                                    <Popup>Localização da Farmácia</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export {NewPharmacy};
