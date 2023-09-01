import { useState, useEffect } from 'react';
import { Menu } from "../components/menu";

function MedicineList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterPrice, setFilterPrice] = useState('');
    const [filterLab, setFilterLab] = useState('All');
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        const storedMedicines = JSON.parse(localStorage.getItem('medicines')) || [];
        setMedicines(storedMedicines);
    }, []);

    const filteredMedicines = medicines.filter((medicine) => {
        return (
            medicine.nomeMedicamento.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterType === 'All' || medicine.tipoMedicamento === filterType) &&
            (filterPrice === '' || medicine.precoUnitario <= parseInt(filterPrice)) &&
            (filterLab === 'All' || medicine.nomeLaboratorio === filterLab)
        );
    });

    const labOptions = [...new Set(medicines.map((medicine) => medicine.nomeLaboratorio))];

    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    return (
        <div className="d-flex">
            <div className="menu-container">
                <Menu />
            </div>
            <div className="content-container">
                <div className="container">
                    <div className="mb-3">
                        <h2>Filtros</h2>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Buscar medicamento"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className="form-select mb-3"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="All">Todos os tipos</option>
                            <option value="Medicamento controlado">Medicamento controlado</option>
                            <option value="Medicamento comum">Medicamento comum</option>
                        </select>
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Filtrar por preço"
                            value={filterPrice}
                            onChange={(e) => setFilterPrice(e.target.value)}
                        />
                        <select
                            className="form-select"
                            value={filterLab}
                            onChange={(e) => setFilterLab(e.target.value)}
                        >
                            <option value="All">Todos os laboratórios</option>
                            {labOptions.map((lab) => (
                                <option key={lab} value={lab}>
                                    {lab}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <h2>Lista de Medicamentos</h2>
                        <ul className="list-group">
                            {filteredMedicines.map((medicine) => (
                                <li key={medicine.id} className="list-group-item">
                                    <strong>ID:</strong> {medicine.id}<br />
                                    <strong>Nome:</strong> {medicine.nomeMedicamento}<br />
                                    <strong>Tipo:</strong> {medicine.tipoMedicamento}<br />
                                    <strong>Preço:</strong> {formatCurrency(medicine.precoUnitario)}<br />
                                    <strong>Laboratório:</strong> {medicine.nomeLaboratorio}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { MedicineList };
