export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          id: string
          email: string
          role: 'super_admin' | 'content_admin' | 'viewer'
          display_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'super_admin' | 'content_admin' | 'viewer'
          display_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'super_admin' | 'content_admin' | 'viewer'
          display_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          site_name: string
          logo_url: string | null
          favicon_url: string | null
          primary_cta_label: string
          primary_cta_url: string | null
          footer_company_name: string | null
          footer_business_info: string | null
          privacy_url: string | null
          terms_url: string | null
          sns_links: Json
          is_published: boolean
          meta_title: string | null
          meta_description: string | null
          meta_keywords: string | null
          og_title: string | null
          og_description: string | null
          og_image: string | null
          canonical_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          site_name?: string
          logo_url?: string | null
          favicon_url?: string | null
          primary_cta_label?: string
          primary_cta_url?: string | null
          footer_company_name?: string | null
          footer_business_info?: string | null
          privacy_url?: string | null
          terms_url?: string | null
          sns_links?: Json
          is_published?: boolean
          meta_title?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          og_title?: string | null
          og_description?: string | null
          og_image?: string | null
          canonical_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          site_name?: string
          logo_url?: string | null
          favicon_url?: string | null
          primary_cta_label?: string
          primary_cta_url?: string | null
          footer_company_name?: string | null
          footer_business_info?: string | null
          privacy_url?: string | null
          terms_url?: string | null
          sns_links?: Json
          is_published?: boolean
          meta_title?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          og_title?: string | null
          og_description?: string | null
          og_image?: string | null
          canonical_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      landing_sections: {
        Row: {
          id: string
          section_key: string
          title: string | null
          subtitle: string | null
          body: string | null
          image_url: string | null
          cta_label: string | null
          cta_url: string | null
          extra: Json
          sort_order: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section_key: string
          title?: string | null
          subtitle?: string | null
          body?: string | null
          image_url?: string | null
          cta_label?: string | null
          cta_url?: string | null
          extra?: Json
          sort_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section_key?: string
          title?: string | null
          subtitle?: string | null
          body?: string | null
          image_url?: string | null
          cta_label?: string | null
          cta_url?: string | null
          extra?: Json
          sort_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          title: string
          organization: string | null
          summary: string | null
          image_url: string | null
          goal_amount: number
          raised_amount: number
          start_date: string | null
          end_date: string | null
          external_url: string | null
          category: string | null
          is_featured: boolean
          is_visible: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          organization?: string | null
          summary?: string | null
          image_url?: string | null
          goal_amount?: number
          raised_amount?: number
          start_date?: string | null
          end_date?: string | null
          external_url?: string | null
          category?: string | null
          is_featured?: boolean
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          organization?: string | null
          summary?: string | null
          image_url?: string | null
          goal_amount?: number
          raised_amount?: number
          start_date?: string | null
          end_date?: string | null
          external_url?: string | null
          category?: string | null
          is_featured?: boolean
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: string
          name: string
          type: string | null
          logo_url: string | null
          website_url: string | null
          description: string | null
          is_visible: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: string | null
          logo_url?: string | null
          website_url?: string | null
          description?: string | null
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string | null
          logo_url?: string | null
          website_url?: string | null
          description?: string | null
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      stories: {
        Row: {
          id: string
          title: string
          summary: string | null
          image_url: string | null
          link_url: string | null
          published_at: string | null
          is_visible: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          summary?: string | null
          image_url?: string | null
          link_url?: string | null
          published_at?: string | null
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          summary?: string | null
          image_url?: string | null
          link_url?: string | null
          published_at?: string | null
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          type: string
          name: string
          organization: string | null
          email: string
          phone: string | null
          message: string
          status: 'new' | 'in_progress' | 'done'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type?: string
          name: string
          organization?: string | null
          email: string
          phone?: string | null
          message: string
          status?: 'new' | 'in_progress' | 'done'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: string
          name?: string
          organization?: string | null
          email?: string
          phone?: string | null
          message?: string
          status?: 'new' | 'in_progress' | 'done'
          created_at?: string
          updated_at?: string
        }
      }
      media_assets: {
        Row: {
          id: string
          file_name: string
          file_url: string
          mime_type: string | null
          size_bytes: number | null
          alt_text: string | null
          bucket: string
          is_deleted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          file_name: string
          file_url: string
          mime_type?: string | null
          size_bytes?: number | null
          alt_text?: string | null
          bucket?: string
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          file_name?: string
          file_url?: string
          mime_type?: string | null
          size_bytes?: number | null
          alt_text?: string | null
          bucket?: string
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          target_table: string
          target_id: string | null
          before_data: Json | null
          after_data: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          target_table: string
          target_id?: string | null
          before_data?: Json | null
          after_data?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          target_table?: string
          target_id?: string | null
          before_data?: Json | null
          after_data?: Json | null
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
