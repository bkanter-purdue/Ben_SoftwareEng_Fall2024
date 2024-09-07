import { GraphQLResponse } from '../../Types/ResponseTypes';

export const requestFromGQL = async <T>(query: string): Promise<GraphQLResponse<T> | undefined> => {
    if (!process.env.GITHUB_API_URL || !process.env.GITHUB_PAT) {
        throw new Error(
            'env not properly configured, please create a .env file in MVP/ with... GITHUB_PAT (will change) and GITHUB_API_URL'
        );
    }

    const endpoint = process.env.GITHUB_API_URL;
    const token = process.env.GITHUB_PAT;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
        });
        const result: GraphQLResponse<T> = await response.json();
        return result;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};
