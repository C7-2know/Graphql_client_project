import { gql } from "@apollo/client";

const GET_PROJECTS= gql`
    query getProjects{
        projects{
            id
            description
            status
        }
    }
`

export {GET_PROJECTS}