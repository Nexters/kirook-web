export interface NotionMemoResponse {
  object: string;
  results: Page[];
  next_cursor: null;
  has_more: boolean;
  type: string;
  page_or_database: Record<string, unknown>;
  request_id: string;
}

export interface MemoResponse {
  memos: Memo[];
}

export interface Memo {
  tags: MultiSelectOption[];
  title: string;
  text: string;
  createdAt: string;
}

export interface Page {
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
  tags: MultiSelectProperty;
  'Created time': CreatedTimeProperty;
  text: RichTextProperty;
  title: TitleProperty;
}

interface MultiSelectProperty extends Property {
  multi_select: MultiSelectOption[];
}

interface MultiSelectOption {
  color: string;
  id: string;
  name: string;
  // Replace this with the actual structure of the object inside the multi_select array
}

interface CreatedTimeProperty extends Property {
  created_time: string;
}

interface Property {
  id: string;
  type: string;
  [key: string]: any; // Use any to accommodate various property types like multi_select, created_time, rich_text, etc.
}

// Similar interfaces can be created for other specific property types like rich_text, etc.
interface RichText {
  plain_text: string;
  // Replace this with the actual structure of the object inside the rich_text array
}

interface TitleProperty extends Property {
  title: RichText[]; // Assuming the title has the same structure as rich_text
}

interface RichTextProperty extends Property {
  rich_text: RichText[];
}
