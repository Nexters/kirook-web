export interface NotionTodoAllResponse {
  object: string;
  results: NotionTodo[];
}

export interface NotionTodo {
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
  status: CheckboxProperty;
  created_at: DateProperty;
  text: TitleProperty;
}

interface CheckboxProperty {
  id: string;
  type: string;
  checkbox: boolean;
}

interface DateProperty {
  id: string;
  type: string;
  date: {
    start: string;
    end: null;
    time_zone: null;
  };
}

interface TitleProperty {
  id: string;
  type: string;
  title: TitleContent[];
}

interface TitleContent {
  type: string;
  text: {
    content: string;
    link: null;
  };
  annotations: Annotations;
  plain_text: string;
  href: null;
}

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}
