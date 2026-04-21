export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicFile {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    icon?: string;
    cover_image?: CosmicFile;
  };
}

export interface Advertiser extends CosmicObject {
  type: 'advertisers';
  metadata: {
    full_name?: string;
    handle?: string;
    bio?: string;
    avatar?: CosmicFile;
    email?: string;
    phone?: string;
    city?: string;
    website?: string;
    social_links?: Record<string, string>;
    verified?: boolean;
    primary_category?: Category;
  };
}

export interface Listing extends CosmicObject {
  type: 'listings';
  metadata: {
    title?: string;
    description?: string;
    price?: string;
    location?: string;
    featured_image?: CosmicFile;
    gallery?: CosmicFile[];
    category?: Category;
    advertiser?: Advertiser;
    featured?: boolean;
  };
}

export interface Bookmark extends CosmicObject {
  type: 'bookmarks';
  metadata: {
    title?: string;
    url?: string;
    description?: string;
    thumbnail?: CosmicFile;
    category?: Category;
    advertiser?: Advertiser;
  };
}

export interface GalleryPost extends CosmicObject {
  type: 'gallery-posts';
  metadata: {
    title?: string;
    caption?: string;
    media_type?: string;
    cover_image?: CosmicFile;
    media_files?: CosmicFile[];
    video_url?: string;
    advertiser?: Advertiser;
    category?: Category;
  };
}

export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: CosmicFile;
    category?: Category;
    advertiser?: Advertiser;
  };
}

export interface Event extends CosmicObject {
  type: 'events';
  metadata: {
    title?: string;
    description?: string;
    event_date?: string;
    venue?: string;
    city?: string;
    ticket_price?: string;
    event_image?: CosmicFile;
    registration_url?: string;
    category?: Category;
    organiser?: Advertiser;
  };
}