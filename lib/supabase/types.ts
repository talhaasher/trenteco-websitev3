export interface products {
  id: number
  name: string
  category: string
  price: number
  size: string
  material: string
  image_urls: string | null
  description: string | null
  sku: string
  stock_quantity: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface article {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  author: string
  category: string
  tags: string[] | null
  image_url: string | null
  read_time: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface enquiry {
  id: number
  name: string
  email: string
  company: string | null
  phone: string | null
  enquiry_type: string
  message: string
  newsletter_subscription: boolean
  status: string
  priority: string
  created_at: string
  updated_at: string
}

export interface features {
  id: number
  icon: string
  title: string
  description: string
}

export interface team_members {
  id: number
  name: string
  role: string
  image: string
}

export interface faq {
  id: number
  question: string
  answer: string | null
  answer_list: string[] | null
  created_at: string
  updated_at: string
}