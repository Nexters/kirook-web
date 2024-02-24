export interface NotionLinkResponse {
  object: string;
  results: NotionLink[];
}

export interface LinkResponse {
  links: LinkItem[];
}

export interface LinkItem {
  id: string;
  tags: MultiSelect[];
  title: string;
  text: string;
  image: string;
  url: string;
  createdAt: string;
}

export interface NotionLink {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: User;
  last_edited_by: User;
  cover: null;
  icon: null;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
  public_url: null;
}

interface User {
  object: string;
  id: string;
}

interface Parent {
  type: string;
  database_id: string;
}

interface Properties {
  text: RichTextProperty;
  link: RichTextProperty;
  image: RichTextProperty;
  tags: MultiSelectProperty;
  created_at: CreatedTimeProperty;
  title: TitleProperty;
}

interface RichTextProperty {
  id: string;
  type: string;
  rich_text: RichText[];
}

interface RichText {
  type: string;
  text: {
    content: string;
    link: Link | null;
  };
  annotations: Annotations;
  plain_text: string;
  href: string | null;
}

interface Link {
  url: string;
}

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface MultiSelectProperty {
  id: string;
  type: string;
  multi_select: MultiSelect[];
}

interface MultiSelect {
  id: string;
  name: string;
  color: string;
}

interface CreatedTimeProperty {
  id: string;
  type: string;
  created_time: string;
}

interface TitleProperty {
  id: string;
  type: string;
  title: RichText[];
}
