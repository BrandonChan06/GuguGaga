import { SquadMember, ItineraryItem, ExpenseItem, BookingItem, VoteItem, WantToGoItem, WeatherDay } from '../types'

export const INITIAL_MEMBERS: SquadMember[] = [
  {
    id: 'm1',
    name: 'Sarah Chen',
    initials: 'SC',
    role: 'Trip Lead & Organizer',
    grad: 'from-violet-500 to-blue-600',
    online: true,
    accessibility: {
      mobility: 'Wheelchair / step-free routes preferred for main transit',
      dietary: 'Nut allergy (strict)',
      sensory: 'Prefers quiet morning visits',
      notes: 'Emergency contact set'
    }
  },
  {
    id: 'm2',
    name: 'Mike Rodriguez',
    initials: 'MR',
    role: 'Photographer & Logistics',
    grad: 'from-blue-400 to-cyan-500',
    online: true,
    accessibility: {
      dietary: 'Gluten-sensitive',
      notes: 'Carries first aid kit'
    }
  },
  {
    id: 'm3',
    name: 'Emma Wilson',
    initials: 'EW',
    role: 'Food & Culture Guide',
    grad: 'from-emerald-400 to-teal-500',
    online: false,
    accessibility: {
      dietary: 'Vegetarian / Plant-based explorer',
      sensory: 'Visual audio guide user'
    }
  },
  {
    id: 'm4',
    name: 'Jake Thompson',
    initials: 'JT',
    role: 'Navigator & Finance',
    grad: 'from-orange-400 to-rose-500',
    online: false,
    accessibility: {
      mobility: 'No restrictions',
      notes: 'International driving permit holder'
    }
  }
]

export const INITIAL_ITINERARY: Record<string, ItineraryItem[]> = {
  day1: [
    { id: 'it1', day: 'day1', time: '09:00', endTime: '11:30', name: 'Colosseum Underground & Arena', emoji: '🏛️', loc: 'Piazza del Colosseo 1', note: 'Priority skip-the-line group ticket booked (Ref: COL-8891)', cost: '€28', travelTime: '15 min walk', travelMode: 'walk', pin: { x: 58, y: 56 }, colorClass: 'bg-amber-50 border-amber-200/70' },
    { id: 'it2', day: 'day1', time: '11:45', endTime: '13:00', name: 'Roman Forum & Palatine Hill', emoji: '🏺', loc: 'Via Sacra', note: 'Included in Colosseum pass. Great panoramic viewpoint.', cost: 'Included', travelTime: '20 min taxi', travelMode: 'taxi', pin: { x: 55, y: 51 }, colorClass: 'bg-blue-50 border-blue-200/70' },
    { id: 'it3', day: 'day1', time: '13:30', endTime: '14:45', name: 'Lunch at Roscioli Salumeria', emoji: '🍝', loc: 'Via dei Giubbonari 21', note: 'Confirmed reservation for 4 travelers at 1:30 PM. Wheelchair accessible entrance.', cost: '€45', travelTime: '25 min walk', travelMode: 'walk', pin: { x: 40, y: 39 }, colorClass: 'bg-emerald-50 border-emerald-200/70' },
    { id: 'it4', day: 'day1', time: '15:15', endTime: '17:30', name: 'Trevi Fountain & Pantheon', emoji: '⛲', loc: 'Piazza di Trevi', note: 'Best afternoon golden light. Coin toss tradition + Pantheon entry ticket.', cost: '€5', travelTime: '12 min walk', travelMode: 'walk', pin: { x: 43, y: 36 }, colorClass: 'bg-violet-50 border-violet-200/70' },
    { id: 'it5', day: 'day1', time: '19:30', endTime: '21:30', name: 'Dinner in Trastevere (Da Enzo)', emoji: '🍷', loc: 'Via dei Vascellari 29', note: 'Table booked outdoor terrace. Traditional cacio e pepe & amatriciana.', cost: '€38', pin: { x: 28, y: 47 }, colorClass: 'bg-rose-50 border-rose-200/70' }
  ],
  day2: [
    { id: 'it6', day: 'day2', time: '08:30', endTime: '12:00', name: 'Vatican Museums & Sistine Chapel', emoji: '🎨', loc: 'Viale Vaticano', note: 'Early morning VIP access before general public entrance.', cost: '€34', travelTime: '8 min walk', travelMode: 'walk', pin: { x: 18, y: 37 }, colorClass: 'bg-amber-50 border-amber-200/70' },
    { id: 'it7', day: 'day2', time: '12:15', endTime: '13:45', name: "St. Peter's Basilica & Cupola", emoji: '⛪', loc: 'Piazza San Pietro', note: 'Elevator available to dome base + step climb to highest panoramic deck.', cost: '€10', travelTime: '15 min walk', travelMode: 'walk', pin: { x: 20, y: 42 }, colorClass: 'bg-blue-50 border-blue-200/70' },
    { id: 'it8', day: 'day2', time: '14:15', endTime: '15:30', name: 'Lunch by River Tiber', emoji: '🥗', loc: 'Lungotevere Castello 12', note: 'Relaxed riverside terrace with shaded patio seating.', cost: '€25', travelTime: '18 min taxi', travelMode: 'taxi', pin: { x: 31, y: 56 }, colorClass: 'bg-emerald-50 border-emerald-200/70' },
    { id: 'it9', day: 'day2', time: '16:00', endTime: '18:00', name: "Castel Sant'Angelo & Bridge", emoji: '🏰', loc: 'Lungotevere Castello 50', note: 'Historical fortress with angel statues bridge photo walk.', cost: '€16', pin: { x: 24, y: 34 }, colorClass: 'bg-violet-50 border-violet-200/70' }
  ],
  day3: [
    { id: 'it10', day: 'day3', time: '09:30', endTime: '12:00', name: 'Villa Borghese Gardens & Bikes', emoji: '🚲', loc: 'Piazzale Napoleone I', note: 'Rent 4-person quadricycle or electric tandem bikes in park.', cost: '€15', travelTime: '20 min metro', travelMode: 'metro', pin: { x: 50, y: 22 }, colorClass: 'bg-emerald-50 border-emerald-200/70' },
    { id: 'it11', day: 'day3', time: '12:30', endTime: '15:00', name: 'Borghese Gallery Tour', emoji: '🖼️', loc: 'Piazzale Scipione Borghese 5', note: 'Masterpieces by Bernini and Caravaggio. Timed ticket slots.', cost: '€28', travelTime: '15 min walk', travelMode: 'walk', pin: { x: 58, y: 18 }, colorClass: 'bg-amber-50 border-amber-200/70' },
    { id: 'it12', day: 'day3', time: '18:00', endTime: '20:30', name: 'Aperitivo on Terrazza Borromini', emoji: '🍹', loc: 'Piazza Navona 44', note: 'Rooftop sunset drinks overlooking Piazza Navona fountains.', cost: '€30', pin: { x: 36, y: 38 }, colorClass: 'bg-rose-50 border-rose-200/70' }
  ]
}

export const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'e1', name: 'Lufthansa LH1820 Flights (4 travelers)', category: 'Transport', emoji: '✈️', amountEUR: 1648, date: '2026-09-12', paidBy: 'Sarah Chen', splitWith: ['Sarah Chen', 'Mike Rodriguez', 'Emma Wilson', 'Jake Thompson'], receiptName: 'lufthansa-eticket-lh1820.pdf', badgeClass: 'bg-blue-50 text-blue-700' },
  { id: 'e2', name: 'Hotel Artemide (6 nights luxury suite)', category: 'Hotel', emoji: '🏨', amountEUR: 1740, date: '2026-09-12', paidBy: 'Sarah Chen', splitWith: ['Sarah Chen', 'Mike Rodriguez', 'Emma Wilson', 'Jake Thompson'], receiptName: 'hotel-artemide-voucher.pdf', badgeClass: 'bg-emerald-50 text-emerald-700' },
  { id: 'e3', name: 'Colosseum + Roman Forum Group Passes', category: 'Activities', emoji: '🏛️', amountEUR: 112, date: '2026-09-13', paidBy: 'Mike Rodriguez', splitWith: ['Sarah Chen', 'Mike Rodriguez', 'Emma Wilson', 'Jake Thompson'], receiptName: 'colosseum-tickets-qr.pdf', badgeClass: 'bg-amber-50 text-amber-700' },
  { id: 'e4', name: 'Dinner Feast at Roscioli Salumeria', category: 'Dining', emoji: '🍝', amountEUR: 187, date: '2026-09-13', paidBy: 'Emma Wilson', splitWith: ['Sarah Chen', 'Mike Rodriguez', 'Emma Wilson', 'Jake Thompson'], receiptName: 'roscioli-receipt-913.jpg', badgeClass: 'bg-rose-50 text-rose-700' },
  { id: 'e5', name: 'Vatican Museums VIP Fast-Track', category: 'Activities', emoji: '🎨', amountEUR: 96, date: '2026-09-14', paidBy: 'Sarah Chen', splitWith: ['Sarah Chen', 'Mike Rodriguez', 'Emma Wilson', 'Jake Thompson'], receiptName: 'vatican-receipt.pdf', badgeClass: 'bg-amber-50 text-amber-700' },
  { id: 'e6', name: 'Airport Express Taxi & Metro 7-day Passes', category: 'Transport', emoji: '🚖', amountEUR: 84, date: '2026-09-12', paidBy: 'Jake Thompson', splitWith: ['Sarah Chen', 'Mike Rodriguez', 'Emma Wilson', 'Jake Thompson'], receiptName: 'metro-pass-receipt.jpg', badgeClass: 'bg-blue-50 text-blue-700' },
  { id: 'e7', name: 'Artisan Gelato Tour & Espresso Tastings', category: 'Dining', emoji: '🍦', amountEUR: 58, date: '2026-09-14', paidBy: 'Emma Wilson', splitWith: ['Sarah Chen', 'Mike Rodriguez', 'Emma Wilson', 'Jake Thompson'], badgeClass: 'bg-rose-50 text-rose-700' }
]

export const INITIAL_BOOKINGS: BookingItem[] = [
  {
    id: 'b1',
    title: 'Lufthansa Round-Trip Flight LH1820',
    type: 'Flight',
    emoji: '✈️',
    provider: 'Lufthansa Airlines',
    confirmationCode: 'LH-99214X',
    date: 'Sep 12, 2026 · 08:15 AM',
    time: '2h 15m nonstop',
    price: '€1,648',
    status: 'booked',
    livePrice: { current: '€1,648', original: '€1,820', trend: 'down', change: '-9.4%' },
    notes: 'Terminal 1 departure · 4 checked bags included · Row 12 seats together',
    receiptUrl: 'ticket-flight-lh1820.pdf'
  },
  {
    id: 'b2',
    title: 'Hotel Artemide (4-Star Boutique)',
    type: 'Hotel',
    emoji: '🏨',
    provider: 'Hotel Artemide Rome',
    confirmationCode: 'HA-ROME-2026',
    date: 'Sep 12 – 18, 2026 (6 nights)',
    time: 'Check-in 14:00 · Check-out 11:00',
    price: '€1,740',
    status: 'booked',
    livePrice: { current: '€1,740', original: '€1,950', trend: 'down', change: '-10.7%' },
    notes: 'Breakfast included daily · Spa access & rooftop patio · Free cancellation until Sep 10',
    receiptUrl: 'voucher-artemide.pdf'
  },
  {
    id: 'b3',
    title: 'Colosseum & Roman Forum VIP Tour',
    type: 'Activity',
    emoji: '🏛️',
    provider: 'CoopCulture Official',
    confirmationCode: 'COL-88912-VIP',
    date: 'Sep 13, 2026 · 09:00 AM',
    price: '€112',
    status: 'booked',
    notes: 'Show QR codes at Sperone Valadier gate 15 mins prior',
    receiptUrl: 'tickets-colosseum-qr.pdf'
  },
  {
    id: 'b4',
    title: 'Vespa Vintage Sunset Tour with Local Guide',
    type: 'Activity',
    emoji: '🛵',
    provider: 'Rome By Vespa Excursions',
    confirmationCode: 'VESPA-ROMA-4P',
    date: 'Sep 15, 2026 · 17:00 PM',
    price: '€300',
    status: 'pending',
    livePrice: { current: '€280', original: '€320', trend: 'down', change: '-12.5%' },
    notes: 'Pending group vote confirmation · Helmets & insurance included'
  },
  {
    id: 'b5',
    title: 'Frecciarossa High-Speed Train to Florence Day Trip',
    type: 'Transit',
    emoji: '🚄',
    provider: 'Trenitalia',
    confirmationCode: 'TREN-9102-FL',
    date: 'Sep 16, 2026 · 07:45 AM',
    price: '€184',
    status: 'pending',
    livePrice: { current: '€184', original: '€184', trend: 'stable', change: '0%' },
    notes: 'Watchlist item: Price monitored daily'
  }
]

export const INITIAL_VOTES: VoteItem[] = [
  { id: 'v1', emoji: '🛵', name: 'Vespa Tour of Historic Rome', desc: 'Cruise cobblestone alleys, Appian Way & panoramic vistas on vintage scooters', price: '€75/person', suggestedBy: 'Mike R.', category: 'Tour', up: 3, down: 1, myVote: 'up' },
  { id: 'v2', emoji: '👨‍🍳', name: 'Master Chef Pasta & Tiramisu Class', desc: 'Hands-on handmade pasta & tiramisu in a 16th-century palazzo cellar', price: '€95/person', suggestedBy: 'Emma W.', category: 'Culinary', up: 4, down: 0, myVote: 'up' },
  { id: 'v3', emoji: '🖼️', name: 'Borghese Gallery Masterpieces', desc: '2-hour private art historian guide for Caravaggio & Bernini sculptures', price: '€28/person', suggestedBy: 'Sarah C.', category: 'Art', up: 2, down: 1, myVote: null },
  { id: 'v4', emoji: '🏺', name: 'Ostia Antica Ancient Port Day Trip', desc: 'Explore preserved ancient Roman harbor city, 35 min direct coastal train', price: '€22/person', suggestedBy: 'Jake T.', category: 'Day Trip', up: 1, down: 2, myVote: 'down' },
  { id: 'v5', emoji: '🍷', name: 'Frascati Vineyard Wine Tasting', desc: 'Scenic countryside winery with olive oil tasting & farmhouse lunch', price: '€65/person', suggestedBy: 'Emma W.', category: 'Culinary', up: 3, down: 0, myVote: 'up' }
]

export const INITIAL_WANT_TO_GO: WantToGoItem[] = [
  { id: 'w1', member: 'Emma Wilson', memberInitials: 'EW', memberGrad: 'from-emerald-400 to-teal-500', title: 'Authentic Cacio e Pepe at Da Enzo', type: 'Food & Drink', notes: 'Must arrive 15 min before opening to secure outdoor table!', priority: 'High' },
  { id: 'w2', member: 'Mike Rodriguez', memberInitials: 'MR', memberGrad: 'from-blue-400 to-cyan-500', title: 'Sunset Golden Hour from Giardino degli Aranci', type: 'Photo Spot', notes: 'Best orange garden panorama through keyhole of Knights of Malta', priority: 'High' },
  { id: 'w3', member: 'Sarah Chen', memberInitials: 'SC', memberGrad: 'from-violet-500 to-blue-600', title: 'Pantheon Oculus Beam at 12 Noon', type: 'Must-See', notes: 'Sun ray aligns perfectly inside the ancient dome', priority: 'High' },
  { id: 'w4', member: 'Jake Thompson', memberInitials: 'JT', memberGrad: 'from-orange-400 to-rose-500', title: 'Underground Catacombs of San Callisto', type: 'Experience', notes: 'Guided tour through ancient subterranean passageways', priority: 'Medium' },
  { id: 'w5', member: 'Emma Wilson', memberInitials: 'EW', memberGrad: 'from-emerald-400 to-teal-500', title: 'Artisan Gelateria del Teatro Tasting', type: 'Food & Drink', notes: 'Sage & raspberry flavour + pistachio made fresh daily', priority: 'Medium' }
]

export const INITIAL_PACKING: Record<string, { id: string; item: string; checked: boolean }[]> = {
  '👔 Clothing & Apparel': [
    { id: 'p1', item: 'Breathable linen shirts × 5', checked: true },
    { id: 'p2', item: 'Comfortable broken-in walking shoes', checked: true },
    { id: 'p3', item: 'Smart-casual dinner outfit for evening reservations', checked: false },
    { id: 'p4', item: 'Light cotton jacket (evenings drop to ~18°C)', checked: false },
    { id: 'p5', item: 'Shoulder & knee cover scarf (required for Vatican & churches)', checked: true }
  ],
  '🧴 Toiletries & Health': [
    { id: 'p6', item: 'SPF 50+ mineral sunscreen', checked: true },
    { id: 'p7', item: 'Hydrocolloid blister prevention plasters', checked: true },
    { id: 'p8', item: 'Refillable insulated water bottle (for Rome fontanelle fountains)', checked: true },
    { id: 'p9', item: 'Prescription medications & mini first aid kit', checked: false }
  ],
  '📱 Electronics & Power': [
    { id: 'p10', item: 'EU Type C / F power plug adapters × 2', checked: true },
    { id: 'p11', item: '20,000 mAh airline-compliant power bank', checked: false },
    { id: 'p12', item: 'Noise-cancelling earbuds for flight & museums', checked: true },
    { id: 'p13', item: 'Portable luggage digital scale', checked: false }
  ],
  '📋 Documents & Cards': [
    { id: 'p14', item: 'Passport (valid for >6 months)', checked: true },
    { id: 'p15', item: 'International travel medical insurance card', checked: true },
    { id: 'p16', item: 'Offline downloaded Google / Apple Maps & PDFs', checked: true },
    { id: 'p17', item: '0% foreign transaction fee credit / debit card', checked: true }
  ]
}

export const EXCHANGE_RATES: Record<string, { rate: number; symbol: string; name: string }> = {
  USD: { rate: 1.09, symbol: '$', name: 'US Dollar' },
  EUR: { rate: 1.00, symbol: '€', name: 'Euro' },
  GBP: { rate: 0.86, symbol: '£', name: 'British Pound' },
  JPY: { rate: 161.4, symbol: '¥', name: 'Japanese Yen' },
  CAD: { rate: 1.48, symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { rate: 1.64, symbol: 'A$', name: 'Australian Dollar' },
  CHF: { rate: 0.98, symbol: 'CHF', name: 'Swiss Franc' },
  SGD: { rate: 1.45, symbol: 'S$', name: 'Singapore Dollar' }
}

export const WEATHER_FORECAST: WeatherDay[] = [
  { day: 'Sat 12', date: 'Sep 12', temp: '29°C', low: '19°C', icon: '☀️', condition: 'Sunny', rain: '0%', uv: '7 (High)' },
  { day: 'Sun 13', date: 'Sep 13', temp: '28°C', low: '18°C', icon: '☀️', condition: 'Clear Sky', rain: '5%', uv: '7 (High)' },
  { day: 'Mon 14', date: 'Sep 14', temp: '27°C', low: '18°C', icon: '🌤️', condition: 'Partly Cloudy', rain: '10%', uv: '6 (Mod)' },
  { day: 'Tue 15', date: 'Sep 15', temp: '24°C', low: '17°C', icon: '🌧️', condition: 'PM Showers (Plan B recommended)', rain: '65%', uv: '4 (Low)' },
  { day: 'Wed 16', date: 'Sep 16', temp: '26°C', low: '18°C', icon: '⛅', condition: 'Sunny Spells', rain: '15%', uv: '6 (Mod)' },
  { day: 'Thu 17', date: 'Sep 17', temp: '28°C', low: '19°C', icon: '☀️', condition: 'Clear Sky', rain: '0%', uv: '7 (High)' },
  { day: 'Fri 18', date: 'Sep 18', temp: '29°C', low: '20°C', icon: '☀️', condition: 'Warm & Sunny', rain: '0%', uv: '8 (Very High)' },
]
