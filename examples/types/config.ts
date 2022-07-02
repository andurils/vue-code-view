import { Ref } from "vue";
import { MenuItemChildWithChildren, MenuItemWithLink } from "./menu";
import { SocialLink } from "./socialLink";

export interface Config {
  /**
   * The appearance option to enable/disable light/dark mode.
   *
   * @default true
   */
  appearance?: boolean;

  /**
   * The social links to be displayed at the end of the nav bar. Perfect for
   * placing links to social services such as GitHub, Twitter, Facebook, etc.
   */
  socialLinks?: SocialLink[];

  /**
   * The nav items.
   */
  nav?: NavItem[];

  /**
   * The sidebar items.
   */
  sidebar?: SidebarConfig;

  /**
   * Info for the edit link
   */
  editLink?: {
    /**
     * Repo of the site.
     * e.g. `vuejs/docs#next`
     *
     * If a branch isn't specified, it defaults to `main`.
     */
    repo?: string;
    text?: string;
  };

  /**
   * Global footer settings. The footer will only be displayed when a page has
   * the frontmatter option `page: true`.  You may pass `footer: false` to the
   * frontmatter to hide the footer.
   */
  footer?: {
    license?: {
      text: string;
      link: string;
    };

    copyright?: string;
  };

  /**
   * Algolia configuration for the site search.
   */
  algolia?: AlgoliaSearchOptions;

  /**
   * CarbonAds configuration
   */
  carbonAds?: {
    code: string;
    placement: string;
  };
}

/**
 * The Algolia search options. Partially copied from
 * @docsearch/react/dist/esm/DocSearch.d.ts
 */
export interface AlgoliaSearchOptions {
  appId?: string;
  apiKey: string;
  indexName: string;
  placeholder?: string;
  searchParameters?: any;
  disableUserPersonalization?: boolean;
  initialQuery?: string;
}

export type NavItem = NavItemWithLink | NavItemWithChildren;

export type NavItemWithLink = MenuItemWithLink & {
  /**
   * activeMatch is expected to be a regex string
   * We can't use actual RegExp object here because it isn't serializable
   */
  activeMatch?: string;
};

export interface NavItemWithChildren {
  text?: string;
  activeMatch?: string;
  items: (NavItemWithLink | MenuItemChildWithChildren)[];
}

export type SidebarConfig = SidebarGroup[] | MultiSidebarConfig;

export interface MultiSidebarConfig {
  [path: string]: SidebarGroup[];
}

export interface SidebarGroup {
  text: string;
  items: MenuItemWithLink[];
}

// vitepress  https://github.dev/vuejs/vitepress
export interface VitePressData<T = any> {
  // site: Ref<SiteData<T>>;
  page: Ref<PageData>;
  // theme: Ref<T>;
  frontmatter: Ref<PageData["frontmatter"]>;
  title: Ref<string>;
  description: Ref<string>;
  lang: Ref<string>;
  localePath: Ref<string>;
}

export interface PageData {
  relativePath: string;
  title: string;
  description: string;
  headers: Header[];
  frontmatter: Record<string, any>;
  lastUpdated?: number;
}

export interface Header {
  level: number;
  title: string;
  slug: string;
}
