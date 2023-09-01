import { Link } from "react-router-dom";

function Menu() {
    const pages = [
        {
            route: "/home",
            description: "Mapa",
        },
        {
            route: "/new-medicine",
            description: "Cadastrar medicamento",
        },
        {
            route: "/medicine-list",
            description: "Lista de medicamentos",
        },
        {
            route: "/new-pharmacy",
            description: "Cadastrar farmácia",
        }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav flex-column">
                        {pages.map(({ route, description }) => {
                            return (
                                <li className="nav-item" key={description}>
                                    <Link className="nav-link" to={route}>
                                        {description}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export { Menu };
