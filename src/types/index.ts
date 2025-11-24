export interface User {
    id: string;
    email: string;
    name?: string;
    measurements?: Record<string, number | string>;
    photo_url?: string;
    preferences?: string[];
    created_at: string;
}

export interface Design {
    id: string;
    user_id: string;
    design_code: string;
    name: string;
    description: string;
    image_urls: string[];
    video_url?: string;
    visibility: 'private' | 'shared' | 'public';
    created_at: string;
    specs?: Record<string, string | number>; // AI generated specs
}

export interface Order {
    id: string;
    user_id: string;
    design_id: string;
    status: 'pending' | 'production' | 'shipped' | 'delivered';
    tracking_number?: string;
    created_at: string;
}

export interface SharedCode {
    id: string;
    design_code: string;
    owner_id: string;
    granted_to_email?: string; // If granted to a specific user
    status: 'active' | 'revoked';
    created_at: string;
}
