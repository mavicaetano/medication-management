import { Menu } from "../components/menu"

import {useRef, useState} from 'react';
import {MapContainer, TileLayer, FeatureGroup} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

function NewPharmacy() {
    const [formData, setFormData] = useState({
        id: null,
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

    const [markerPosition, setMarkerPosition] = useState([formData.latitude, formData.longitude]);
    const [enderecoDisabled, setEnderecoDisabled] = useState(true);
    const [bairroDisabled, setBairroDisabled] = useState(true);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleMarkersCreated(e) {
        const marker = e.layer;
        if (markerGroupRef.current) {
            markerGroupRef.current.clearLayers();
            markerGroupRef.current.addLayer(marker);
            setFormData({
                ...formData,
                latitude: marker.getLatLng().lat,
                longitude: marker.getLatLng().lng,
            });
            setMarkerPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
    }

    const markerGroupRef = useRef();

    function getNextId() {
        const storedPharmacies = JSON.parse(localStorage.getItem('pharmacies')) || [];
        const maxId = storedPharmacies.length > 0 ? Math.max(...storedPharmacies.map(pharmacy => pharmacy.id)) : 0;
        return maxId + 1;
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const requiredFields = ['razaoSocial', 'cnpj', 'nomeFantasia', 'email', 'celular', 'cep', 'endereco', 'numero', 'bairro', 'cidade', 'estado', 'latitude', 'longitude'];
        console.log(formData)
        const missingFields = requiredFields.filter(field => !formData[field]);
        if (missingFields.length > 0) {
            alert(`Os campos ${missingFields.join(', ')} são obrigatórios.`);
            return;
        }

        const pharmacies = JSON.parse(localStorage.getItem('pharmacies')) || [];
        const newPharmacy = { ...formData, id: getNextId() };
        pharmacies.push(newPharmacy);
        localStorage.setItem('pharmacies', JSON.stringify(pharmacies));

        alert('Farmácia cadastrada com sucesso!');
        setFormData({
            id: null,
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
        setMarkerPosition([0, 0]);
    }

    async function handleCepSearch() {
        if (!formData.cep || formData.cep.length !== 8) {
            alert('Digite um CEP válido com 8 números.');
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    ...formData,
                    endereco: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf,
                });

                setEnderecoDisabled(data.logradouro !== '');
                setBairroDisabled(data.logradouro !== '');
            } else {
                alert('CEP não encontrado.');
            }
        } catch (error) {
            alert('Erro ao consultar CEP.');
        }
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
                        <fieldset>
                            <legend>Endereço</legend>
                            <div className="mb-3">
                                <label htmlFor="cep" className="form-label">CEP *</label>
                                <div className="d-flex">
                                    <input type="number" className="form-control me-2" id="cep" name="cep" value={formData.cep} onChange={handleInputChange} />
                                    <button type="button" className="btn btn-secondary" onClick={handleCepSearch}>Consultar</button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="estado" className="form-label">Estado *</label>
                                <input type="text" className="form-control" id="estado" name="estado" disabled={true} value={formData.estado} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cidade" className="form-label">Cidade *</label>
                                <input type="text" className="form-control" id="cidade" name="cidade" disabled={true} value={formData.cidade} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="bairro" className="form-label">Bairro *</label>
                                <input type="text" className="form-control" id="bairro" name="bairro" disabled={bairroDisabled} onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="endereco" className="form-label">Rua *</label>
                                <input type="text" className="form-control" id="endereco" name="endereco" disabled={enderecoDisabled} onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="numero" className="form-label">Número *</label>
                                <input type="text" className="form-control" id="numero" name="numero" onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="complemento" className="form-label">Complemento</label>
                                <input type="text" className="form-control" id="complemento" name="complemento" onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <h4>Selecione a localização no mapa</h4>
                                <MapContainer center={markerPosition} zoom={13} style={{ height: '300px' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <FeatureGroup ref={markerGroupRef}>
                                        <EditControl
                                            position="topright"
                                            draw={{
                                                polyline: false,
                                                polygon: false,
                                                rectangle: false,
                                                circle: false,
                                                circlemarker: false,
                                                marker: true,
                                            }}
                                            onCreated={handleMarkersCreated}
                                        />
                                    </FeatureGroup>
                                </MapContainer>
                            </div>
                        </fieldset>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )}

export {NewPharmacy};
