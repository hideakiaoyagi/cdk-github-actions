export function message(path: string) {
    const env = process.env
    // return `Hello, CDK! You've hit ${path}\n`
    return `Hello, ${env.TEST}! You've hit ${path}\n`
}