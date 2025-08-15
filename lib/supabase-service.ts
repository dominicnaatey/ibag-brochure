import { supabase } from './supabase'
import type { Database } from './supabase'

type Event = Database['public']['Tables']['events']['Row']
type EventInsert = Database['public']['Tables']['events']['Insert']
type EventUpdate = Database['public']['Tables']['events']['Update']

type News = Database['public']['Tables']['news']['Row']
type NewsInsert = Database['public']['Tables']['news']['Insert']
type NewsUpdate = Database['public']['Tables']['news']['Update']

type Member = Database['public']['Tables']['members']['Row']
type MemberInsert = Database['public']['Tables']['members']['Insert']
type MemberUpdate = Database['public']['Tables']['members']['Update']

type Gallery = Database['public']['Tables']['gallery']['Row']
type GalleryInsert = Database['public']['Tables']['gallery']['Insert']
type GalleryUpdate = Database['public']['Tables']['gallery']['Update']

// Events Service
export const eventsService = {
  // Get all events
  getAll: async (): Promise<Event[]> => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get event by ID
  getById: async (id: string): Promise<Event | null> => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new event
  create: async (event: EventInsert): Promise<Event> => {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update event
  update: async (id: string, updates: EventUpdate): Promise<Event> => {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete event
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Get upcoming events
  getUpcoming: async (limit?: number): Promise<Event[]> => {
    let query = supabase
      .from('events')
      .select('*')
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true })
    
    if (limit) {
      query = query.limit(limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data || []
  }
}

// News Service
export const newsService = {
  // Get all news
  getAll: async (): Promise<News[]> => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get news by ID
  getById: async (id: string): Promise<News | null> => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new news
  create: async (news: NewsInsert): Promise<News> => {
    const { data, error } = await supabase
      .from('news')
      .insert(news)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update news
  update: async (id: string, updates: NewsUpdate): Promise<News> => {
    const { data, error } = await supabase
      .from('news')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete news
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Get recent news
  getRecent: async (limit?: number): Promise<News[]> => {
    let query = supabase
      .from('news')
      .select('*')
      .order('published_date', { ascending: false })
    
    if (limit) {
      query = query.limit(limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data || []
  }
}

// Members Service
export const membersService = {
  // Get all members
  getAll: async (): Promise<Member[]> => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('joined_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get member by ID
  getById: async (id: string): Promise<Member | null> => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new member
  create: async (member: MemberInsert): Promise<Member> => {
    const { data, error } = await supabase
      .from('members')
      .insert(member)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update member
  update: async (id: string, updates: MemberUpdate): Promise<Member> => {
    const { data, error } = await supabase
      .from('members')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete member
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Get members by type
  getByType: async (membershipType: string): Promise<Member[]> => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('membership_type', membershipType)
      .order('joined_date', { ascending: false })
    
    if (error) throw error
    return data || []
  }
}

// Gallery Service
export const galleryService = {
  // Get all gallery items
  getAll: async (): Promise<Gallery[]> => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get gallery item by ID
  getById: async (id: string): Promise<Gallery | null> => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new gallery item
  create: async (gallery: GalleryInsert): Promise<Gallery> => {
    const { data, error } = await supabase
      .from('gallery')
      .insert(gallery)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update gallery item
  update: async (id: string, updates: GalleryUpdate): Promise<Gallery> => {
    const { data, error } = await supabase
      .from('gallery')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete gallery item
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Get gallery items by event
  getByEvent: async (eventId: string): Promise<Gallery[]> => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }
}

// File Upload Service
export const fileService = {
  // Upload file to Supabase Storage
  uploadFile: async (bucket: string, path: string, file: File): Promise<string> => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) throw error
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)
    
    return publicUrl
  },

  // Delete file from Supabase Storage
  deleteFile: async (bucket: string, path: string): Promise<void> => {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])
    
    if (error) throw error
  },

  // Get public URL for file
  getPublicUrl: (bucket: string, path: string): string => {
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return publicUrl
  }
}