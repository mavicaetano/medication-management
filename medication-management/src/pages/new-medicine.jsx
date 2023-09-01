import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Menu } from "../components/menu";

function NewMedicine() {
    const [medicineData, setMedicineData] = useState({
        nomeMedicamento: '',
        nomeLaboratorio: '',
        dosagem: '',
        descricao: '',
        precoUnitario: '',
        tipoMedicamento: 'Medicamento comum'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMedicineData({ ...medicineData, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        try {
            const medicines = JSON.parse(localStorage.getItem('medicines')) || [];
            medicines.push(medicineData);
            localStorage.setItem('medicines', JSON.stringify(medicines));

            alert('Medicamento cadastrado com sucesso!');
            setMedicineData({
                nomeMedicamento: '',
                nomeLaboratorio: '',
                dosagem: '',
                descricao: '',
                precoUnitario: '',
                tipoMedicamento: 'Medicamento comum',
            });
        } catch (error) {
            alert('Erro ao cadastrar o medicamento.');
        }
    };

    return (
        <div className="d-flex">
            <div className="menu-container">
                <Menu />
            </div>
            <div className="content-container p-4">
                <h1>Cadastro de Novo Medicamento</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nomeMedicamento" className="form-label">Nome do Medicamento *</label>
                        <input type="text" className="form-control" id="nomeMedicamento" name="nomeMedicamento" onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nomeLaboratorio" className="form-label">Nome do Laboratório *</label>
                        <input type="text" className="form-control" id="nomeLaboratorio" name="nomeLaboratorio" onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dosagem" className="form-label">Dosagem *</label>
                        <input type="text" className="form-control" id="dosagem" name="dosagem" onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <textarea className="form-control" id="descricao" name="descricao" onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="precoUnitario" className="form-label">Preço Unitário *</label>
                        <input type="text" className="form-control" id="precoUnitario" name="precoUnitario" onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tipoMedicamento" className="form-label">Tipo do Medicamento *</label>
                        <select className="form-select" id="tipoMedicamento" name="tipoMedicamento" onChange={handleInputChange}>
                            <option value="Medicamento comum">Medicamento comum</option>
                            <option value="Medicamento controlado">Medicamento controlado</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export { NewMedicine };
