import { gql } from "@apollo/client"
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useQuery, useLazyQuery } from "@apollo/client/react"

type GetPlayerQuery = { 
    playerByUsername?: {
        __typename: "Player";
        uuid: string;
        username: string;
        ranks: string[];
    }   
        | null;
    };

type GetPlayerQueryVariables = { username : string };

const GET_PLAYER : TypedDocumentNode<GetPlayerQuery, GetPlayerQueryVariables> = gql `
    query playerByUsername($username: String!) {
        playerByUsername(username: $username) {
            uuid
            username
            ranks
        }
    }
`
function Home() {

    function handleSearch(e : React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        const searchBar = e.currentTarget;
        const searchData = new FormData(searchBar);
        const username = searchData.get("search");

        if (typeof username != "string") return;

        getUsername({ variables: {username: username}})
    }

    const [getUsername, { loading, error, data, called }] = useLazyQuery(GET_PLAYER, { 
        fetchPolicy: "no-cache",
    });

    if (error) return `Error! ${error.message}`;
    const player = data?.playerByUsername;
    console.log(player);
    

    return (
        <main className = "home">
            <div className = "home">
                <h1>MCCI Stats</h1>
                <p>The best site to view your competitive MCCI stats! (Not affiliated with Noxcrew).</p>
                <form onSubmit = {handleSearch}>
                    <label>
                        <input className = "home" name = "search" type = "text" placeholder= {"Enter user\u200Bname..."} autoComplete= "off" data-lpignore="true" data-1p-ignore data-dashlane-ignore="true" />  
                    </label>
                </form>

                {called && !loading && !error && !player && <p className = "error">Error: Player not found</p>}

            </div>
        </main>
    );
}

export default Home;