export class Nav {
    label: string;
    icon?: string;
    route?: string;
    uri?: string;
    subnav?: Array<SubNav>;
    subnavState?: string;
}

export class SubNav {
    label: string;
    icon?: string;
    route?: string;
    uri?: string;
}