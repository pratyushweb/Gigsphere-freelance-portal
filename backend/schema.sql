-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('client', 'freelancer', 'admin')),
    full_name VARCHAR(255) NOT NULL,
    bio TEXT,
    skills TEXT[] DEFAULT '{}',
    avatar_url TEXT,
    avg_rating DECIMAL(3, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Gigs Table
CREATE TABLE gigs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    skills_required TEXT[] DEFAULT '{}',
    budget DECIMAL(10, 2) NOT NULL,
    deadline DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Proposals Table
CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cover_letter TEXT NOT NULL,
    bid_amount DECIMAL(10, 2) NOT NULL,
    delivery_days INT NOT NULL,
    ai_rank_score INT DEFAULT NULL,
    ai_analysis TEXT DEFAULT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(gig_id, freelancer_id) -- A freelancer can only apply once per gig
);

-- Contracts Table
CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gig_id UUID NOT NULL REFERENCES gigs(id),
    client_id UUID NOT NULL REFERENCES users(id),
    freelancer_id UUID NOT NULL REFERENCES users(id),
    proposal_id UUID NOT NULL REFERENCES proposals(id),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Messages Table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(id),
    stripe_session_id VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'held', 'released', 'refunded')),
    paid_at TIMESTAMP WITH TIME ZONE
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(id),
    reviewer_id UUID NOT NULL REFERENCES users(id),
    reviewee_id UUID NOT NULL REFERENCES users(id),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for standard querying performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_gigs_status ON gigs(status);
CREATE INDEX idx_gigs_client_id ON gigs(client_id);
CREATE INDEX idx_proposals_gig_id ON proposals(gig_id);
CREATE INDEX idx_contracts_client_freelancer ON contracts(client_id, freelancer_id);
CREATE INDEX idx_messages_contract_id ON messages(contract_id);
