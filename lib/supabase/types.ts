export interface Product {
  id: number
  name: string
  category: string
  price: number
  size: string
  material: string
  image_url: string | null
  description: string | null
  sku: string
  stock_quantity: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
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

export interface Enquiry {
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

export interface Order {
  id: number
  customer_name: string
  customer_email: string
  customer_phone: string | null
  total_amount: number
  status: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number | null
  quantity: number
  price: number
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name: string | null
  role: string
  created_at: string
  updated_at: string
}
