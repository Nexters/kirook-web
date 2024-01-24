export interface NotionAuthResponse {
  access_token: string;
  bot_id: string;
  duplicated_template_id: string;
  owner: any;
  workspace_icon?: string;
  workspace_id: string;
  workspace_name?: string;
}

export interface NotionBlockResponse {
  object: string;
  results: Block[];
}

export interface Block {
  object: string;
  id: string;
  parent: Parent;
  created_time: string;
  last_edited_time: string;
  created_by: User;
  last_edited_by: User;
  has_children: boolean;
  archived: boolean;
  type: string;
  child_database?: ChildDatabase;
}

interface Parent {
  type: string;
  page_id: string;
}

interface User {
  object: string;
  id: string;
}

interface ChildDatabase {
  title: string;
}

export interface Database {
  id: string;
  title: string;
}
