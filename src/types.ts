export type Screen = 'dashboard' | 'itinerary' | 'calendar' | 'budget' | 'bookings' | 'group'

export interface Trip {
  id: string
  destination: string
  country: string
  flag: string
  dates: string
  daysCount: number
  daysUntil: number
  status: 'Confirmed' | 'Planning'
  imageUrl: string
  travelers: string[]
  progress: number
}

export interface ItineraryItem {
  id: string
  day: string
  time: string
  endTime: string
  name: string
  emoji: string
  loc: string
  note: string
  cost?: string
  travelTime?: string // e.g. "15 min walk"
  travelMode?: 'walk' | 'taxi' | 'metro' | 'bus'
  pin: { x: number; y: number }
  colorClass: string
}

export interface ExpenseItem {
  id: string
  name: string
  category: 'Transport' | 'Hotel' | 'Activities' | 'Dining' | 'Shopping' | 'Other'
  emoji: string
  amountEUR: number
  date: string
  paidBy: string
  splitWith: string[] // member names
  receiptName?: string
  badgeClass: string
}

export interface BookingItem {
  id: string
  title: string
  type: 'Flight' | 'Hotel' | 'Activity' | 'Transit'
  emoji: string
  provider: string
  confirmationCode: string
  date: string
  time?: string
  price: string
  status: 'booked' | 'pending'
  livePrice?: {
    current: string
    original: string
    trend: 'down' | 'up' | 'stable'
    change: string
  }
  notes: string
  receiptUrl?: string
}

export interface VoteItem {
  id: string
  emoji: string
  name: string
  desc: string
  price: string
  suggestedBy: string
  category: string
  up: number
  down: number
  myVote: 'up' | 'down' | null
}

export interface WantToGoItem {
  id: string
  member: string
  memberInitials: string
  memberGrad: string
  title: string
  type: 'Must-See' | 'Food & Drink' | 'Experience' | 'Photo Spot'
  notes: string
  priority: 'High' | 'Medium' | 'Nice to have'
}

export interface SquadMember {
  id: string
  name: string
  initials: string
  role: string
  grad: string
  online: boolean
  accessibility: {
    mobility?: string
    dietary?: string
    sensory?: string
    notes?: string
  }
}

export interface WeatherDay {
  day: string
  date: string
  temp: string
  low: string
  icon: string
  condition: string
  rain: string
  uv: string
}
