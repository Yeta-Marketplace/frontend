export interface IUserProfile {
    email: string;
    is_active: boolean;
    full_name: string;
    id: number;
}

export interface IUserProfileUpdate {
    email?: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserProfileCreate {
    email: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserProfileCreateOpen {
    email: string;
    full_name?: string;
    password: string;
}

// this class is fishy cause login uses username instead of email
export interface IUserSignin {
    email: string;
    password: string;
}