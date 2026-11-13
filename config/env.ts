import dotenv from 'dotenv';

dotenv.config({ override: true });
interface EnvironmentConfig {
    baseUrl: string;
    username: string;
    password: string;
}

function loadEnvironment(): EnvironmentConfig {
    const { BASE_URL, USERNAME, PASSWORD } = process.env;

    if (!BASE_URL || !USERNAME || !PASSWORD) {
        throw new Error(
            'Missing required environment variables: BASE_URL, USERNAME or PASSWORD'
        );
    }

    return {
        baseUrl: BASE_URL,
        username: USERNAME,
        password: PASSWORD
    };
}

export const env = loadEnvironment();