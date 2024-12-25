import { gql,useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from "./clientRow";
import Spinner from "./spinner";

export default function Clients() {
    const {loading, error, data} = useQuery(GET_CLIENTS);
    if(loading) return <Spinner/>
    if(error) return <p>Error</p>

    return (
        <>
        {!loading && !error && 
        <table className="table table-hover mt-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.clients.map(client =>
                    <ClientRow client={client}/>
                )}
            </tbody>
        </table>
        }
        </>
    )
}
