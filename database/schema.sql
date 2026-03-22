-- SystemCraft AI Database Schema

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    scale VARCHAR(20),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL REFERENCES users(id)
);

-- Architectures table
CREATE TABLE architectures (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    tech_stack TEXT,
    description TEXT,
    trade_offs TEXT,
    project_id INTEGER NOT NULL UNIQUE REFERENCES projects(id)
);

-- Database Schemas table
CREATE TABLE database_schemas (
    id SERIAL PRIMARY KEY,
    schema_json TEXT,
    sql_script TEXT,
    project_id INTEGER NOT NULL UNIQUE REFERENCES projects(id)
);

-- API Definitions table
CREATE TABLE api_definitions (
    id SERIAL PRIMARY KEY,
    endpoint VARCHAR(255),
    method VARCHAR(10),
    request_body TEXT,
    response_body TEXT,
    description TEXT,
    project_id INTEGER NOT NULL REFERENCES projects(id)
);

-- Chat History table
CREATE TABLE chat_history (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    response TEXT,
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    project_id INTEGER NOT NULL REFERENCES projects(id)
);
