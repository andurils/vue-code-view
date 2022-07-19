export type DropdownItem = DropdownItemWithLink | DropdownItemWithChildren;

export interface DropdownItemWithLink {
  label: string;
  icon?: string;
  key: string | number[];
}

export interface DropdownItemWithChildren {
  label: string;
  icon?: string;
  items: DropdownItemChild[];
}

export type DropdownItemChild =
  | DropdownItemWithLink
  | MenuItemChildWithChildren;

export interface MenuItemChildWithChildren {
  label?: string;
  icon?: string;
  items: DropdownItemWithLink[];
}
