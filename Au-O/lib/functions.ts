export function handleFormInputChange(formKey: string, key: string, value: string, getFormData: (formKey: string) => any, setFormData: (formKey: string, data: any) => void) {
    const data = getFormData(formKey);
    setFormData(formKey, {
        ...data,
        [key]: value,
    })
} 

export function validateLogin(identifier: string, password: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!emailRegex.test(identifier) && !usernameRegex.test(identifier)) {
        return { valid: false, message: 'Invalid username or email' };
    }

    if (!passwordRegex.test(password)) {
        return { valid: false, message: 'Password must be at least 8 characters long, contain both uppercase and lowercase letters, and include at least one special character' };
    }

    return { valid: true, message: 'Validation successful' };
}