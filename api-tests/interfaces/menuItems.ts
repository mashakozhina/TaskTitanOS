export interface MenuItem {
  id: number | null;
  type: string | null;
  kind?: string;
  position: number;
  name: string;
  url: string | null;
  content_type: string | null;
  internal_id: string;
  icon: string;
}
