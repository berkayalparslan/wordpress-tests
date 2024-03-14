export function generateRandomString() {
    return ((Math.random() * 100) % 10).toString().replace('.', '');
}