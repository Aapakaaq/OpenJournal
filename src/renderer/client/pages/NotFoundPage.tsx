// TODO: Better error handling
import {Link} from "react-router-dom"
export default function NotFoundPage(){
    return(
        <div>
            404 not found
            <Link to='/'>Back to home </Link>
        </div>
    );
}
