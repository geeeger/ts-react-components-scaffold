declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.md" {
    const src: string;
    export default src;
}
