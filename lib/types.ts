export type Playthrough = {
  id: string;
  title: string;
  streamer_name: string | null;
  video_url: string;
  thumbnail_url: string | null;
  created_at?: string;
  description?: string | null;
  platform?: string | null;
  is_featured?: boolean | null;
};
