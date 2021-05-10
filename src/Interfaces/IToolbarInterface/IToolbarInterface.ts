export interface IToolbarActionItem {
    title: string,
    href?: string,
    action?(): void
}