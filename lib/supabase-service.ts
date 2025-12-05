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

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual General Meeting 2024',
    description: 'Join us for our Annual General Meeting where we will discuss the achievements of the past year and plan for the future.',
    date: new Date(Date.now() + 86400000 * 30).toISOString(), // 30 days from now
    location: 'Accra International Conference Centre',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Italian Wine Tasting & Networking',
    description: 'An evening of fine Italian wines and networking opportunities with business leaders.',
    date: new Date(Date.now() + 86400000 * 14).toISOString(), // 14 days from now
    location: 'Labadi Beach Hotel',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Business Forum: Ghana-Italy Trade Relations',
    description: 'A high-level forum discussing trade opportunities and economic cooperation between Ghana and Italy.',
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    location: 'Mövenpick Ambassador Hotel',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const MOCK_NEWS: News[] = [
  {
    id: '1',
    title: 'IBAG Elects New Executive Committee',
    content: 'The Italian Business Association of Ghana is pleased to announce its newly elected executives who will steer the affairs of the association for the next two years.',
    excerpt: 'New leadership to drive IBAG\'s strategic vision for 2025.',
    author: 'IBAG Secretariat',
    published_date: new Date().toISOString(),
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Trade Volume Between Italy and Ghana Increases',
    content: 'Recent statistics show a significant uptick in bilateral trade between Italy and Ghana, driven by the energy and construction sectors.',
    excerpt: 'Positive trends in economic cooperation reported.',
    author: 'Trade Desk',
    published_date: new Date(Date.now() - 86400000 * 10).toISOString(),
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Giuseppe Rossi',
    company: 'ItalConstruct Ghana Ltd',
    position: 'Managing Director',
    membership_type: 'Platinum',
    email: 'info@italconstruct.com',
    phone: '+233 24 400 0000',
    joined_date: '2020-01-15',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Ama Mensah',
    company: 'Accra Logistics Solutions',
    position: 'CEO',
    membership_type: 'Gold',
    email: 'info@accralogistics.com',
    phone: '+233 50 000 0000',
    joined_date: '2021-03-10',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Marco Verratti',
    company: 'Vino & Gusto',
    position: 'Owner',
    membership_type: 'Silver',
    email: 'info@vinogusto.com',
    phone: '+233 26 000 0000',
    joined_date: '2022-06-20',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const MOCK_GALLERY: Gallery[] = [
  {
    id: '1',
    title: '2023 End of Year Party',
    description: 'Celebration with members and partners.',
    image_url: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Event+Photo+1',
    event_id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Networking Cocktail',
    description: 'Networking event at the Ambassador\'s residence.',
    image_url: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Event+Photo+2',
    event_id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

// Events Service
export const eventsService = {
  // Get all events
  getAll: async (): Promise<Event[]> => {
    console.log("eventsService.getAll called - attempting fetch")
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.warn('Failed to fetch events, using mock data:', error)
      console.log('Returning mock events data:', MOCK_EVENTS?.length || 0, 'items')
      return MOCK_EVENTS || []
    }
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
    console.log("newsService.getAll called - attempting fetch")
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.warn('Failed to fetch news, using mock data:', error)
      console.log('Returning mock news data:', MOCK_NEWS?.length || 0, 'items')
      return MOCK_NEWS || []
    }
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
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('joined_date', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.warn('Failed to fetch members, using mock data:', error)
      return MOCK_MEMBERS
    }
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
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.warn('Failed to fetch gallery, using mock data:', error)
      return MOCK_GALLERY
    }
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