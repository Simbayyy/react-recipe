import { Link } from "react-router-dom"


export const ErrorView: React.FunctionComponent<{
        errorCode:string
    }> =  ({errorCode}): React.ReactElement => {

    const message = (code:string) => {
        if (code == 'unauthorized') {return "L'accès à cette page est interdit"}
        else {return "Une erreur innattendue est survenue"}
    }
    return <div>
        <div className="error__view__message">{message(errorCode)}</div>
        <Link to={'/'}>Retour à l'accueil</Link>
    </div>
}
