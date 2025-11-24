export function generateDesignCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1 for clarity
    let code = '';
    for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const year = new Date().getFullYear();
    return `WD-${code}-${year}`;
}

export function validateDesignCode(code: string): boolean {
    const regex = /^WD-[A-Z0-9]{5}-\d{4}$/;
    return regex.test(code);
}
