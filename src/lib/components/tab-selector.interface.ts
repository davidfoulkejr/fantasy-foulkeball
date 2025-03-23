export interface ITab {
	label: string;
	sublabel?: string;
	href: string;
	isActive?: boolean;
}

export interface ITabSelectorProps {
	tabs: ITab[];
	scrollButtons?: boolean;
}
