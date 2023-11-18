import crypto from 'crypto'

export default (text: string, secretKey: string) => {
    const cipher = crypto.createCipheriv(
        'aes-256-ecb',
        Buffer.from(secretKey),
        '',
    );

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}