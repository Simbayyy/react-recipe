import { Link, Outlet } from "react-router-dom"


export const AdminDashboard: React.FunctionComponent<{}> =  (): React.ReactElement => {

    return <div className="admin__dashboard">
        <div className="admin__dashboard__buttons">
            <Link to={'ingredients'} className={"admin__button"}>
                <div className="admin__button__title">Liste des ingrédients</div>
                <div className="admin__button__desc">Accès à la liste de tous les ingrédients dans la base de donnée</div>
            </Link>
            <Link to={'low-confidence'} className={"admin__button"}>
                <div className="admin__button__title">Vérification des ingrédients incertains</div>
                <div className="admin__button__desc">Correction ou validation des ingrédients douteux</div>
            </Link>
        </div>
        <Outlet />
    </div>
}
