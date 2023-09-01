import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!email) {
            newErrors.email = 'Insira seu e-mail';
        }
        if (!password) {
            newErrors.password = 'Digite sua senha';
        }
        if (Object.keys(newErrors).length === 0) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            if (!email.match(emailRegex)) {
                newErrors.email = 'Insira um e-mail válido.';
            }
            if (!password.match(passwordRegex)) {
                newErrors.password = 'A senha deve ter pelo menos 8 caracteres com letras e números.';
            }

            if (Object.keys(newErrors).length === 0) {
                navigate('/home');
            }
        }

        setErrors(newErrors);
    };

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-4">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            E-mail
                        </label>
                        <input
                            type="email"
                            className={`form-control ${errors.email && 'is-invalid'}`}
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password && 'is-invalid'}`}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                </form>
            </div>
        </div>
    )}

export { Login }