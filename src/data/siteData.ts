export type ListingKind = 'Property' | 'Room' | 'Land'
export type PaymentMethodId =
  | 'apple-pay'
  | 'google-pay'
  | 'credit-card'
  | 'cash-on-arrival'

export interface ListingAgent {
  name: string
  title: string
  phone: string
  email: string
  officeHours: string
}

export interface Listing {
  id: string
  title: string
  kind: ListingKind
  location: string
  country: string
  currency: string
  price: number
  priceLabel: string
  capacity: number
  area: string
  highlight: string
  summary: string
  description: string
  features: string[]
  agents: ListingAgent[]
  trending: boolean
}

export interface BookingHistoryItem {
  id: string
  listingId: string
  status: 'Confirmed' | 'Awaiting payment' | 'Completed'
  people: number
  stay: string
  country: string
  checkIn: string
}

export interface SavedPaymentMethod {
  id: string
  label: string
  type: PaymentMethodId
  detail: string
  country: string
}

export const paymentMethodCatalog: Array<{
  id: PaymentMethodId
  label: string
  summary: string
}> = [
  {
    id: 'apple-pay',
    label: 'Apple Pay',
    summary: 'Fast payment on Apple devices with wallet confirmation.',
  },
  {
    id: 'google-pay',
    label: 'Google Pay',
    summary: 'One-tap payment for Android and supported browsers.',
  },
  {
    id: 'credit-card',
    label: 'Credit Card',
    summary: 'Visa, Mastercard, and Amex with manual card entry.',
  },
  {
    id: 'cash-on-arrival',
    label: 'Cash on Arrival',
    summary: 'Reserve now and settle in person at key handover.',
  },
]

export const paymentSupportByCountry: Array<{
  country: string
  currency: string
  methods: PaymentMethodId[]
}> = [
  {
    country: 'United States',
    currency: 'USD',
    methods: ['apple-pay', 'google-pay', 'credit-card', 'cash-on-arrival'],
  },
  {
    country: 'Canada',
    currency: 'CAD',
    methods: ['apple-pay', 'google-pay', 'credit-card'],
  },
  {
    country: 'Nigeria',
    currency: 'NGN',
    methods: ['credit-card', 'cash-on-arrival'],
  },
  {
    country: 'Ghana',
    currency: 'GHS',
    methods: ['google-pay', 'credit-card', 'cash-on-arrival'],
  },
  {
    country: 'Kenya',
    currency: 'KES',
    methods: ['google-pay', 'credit-card'],
  },
  {
    country: 'United Arab Emirates',
    currency: 'AED',
    methods: ['apple-pay', 'credit-card', 'cash-on-arrival'],
  },
]

export const listings: Listing[] = [
  {
    id: 'lagos-courtyard-house',
    title: 'Courtyard House / Lagos Mainland',
    kind: 'Property',
    location: 'Yaba, Lagos',
    country: 'Nigeria',
    currency: 'NGN',
    price: 2800000,
    priceLabel: 'per year',
    capacity: 5,
    area: '210 sqm',
    highlight: 'Quiet family compound within walking distance of transit.',
    summary:
      'A compact house for families who want privacy, daylight, and a clear commute.',
    description:
      'This listing balances open living space with separation for work and sleep. The layout is simple and easy to manage, with a private courtyard and dedicated utility corner.',
    features: ['3 bedrooms', 'Courtyard', 'Gated access', 'Generator line', 'Parking'],
    agents: [
      {
        name: 'Ayo Ogunleye',
        title: 'Senior Listing Agent',
        phone: '+234 800 123 4400',
        email: 'ayo@axisestate.com',
        officeHours: 'Mon to Sat / 09:00 to 18:00',
      },
    ],
    trending: true,
  },
  {
    id: 'toronto-loft-suite',
    title: 'Loft Suite / West Queen West',
    kind: 'Room',
    location: 'Toronto, Ontario',
    country: 'Canada',
    currency: 'CAD',
    price: 1850,
    priceLabel: 'per month',
    capacity: 2,
    area: '58 sqm',
    highlight: 'Private room layout with shared kitchen and quiet working corner.',
    summary:
      'Best for one or two people who want a clean city base without excess space.',
    description:
      'The suite uses a square plan with direct daylight, built-in storage, and access to shared amenities. It is intentionally minimal and suited to medium-term stays.',
    features: ['Private bath', 'Shared kitchen', 'High-speed Wi-Fi', 'Washer', 'Desk niche'],
    agents: [
      {
        name: 'Mina Clarke',
        title: 'Urban Rentals Lead',
        phone: '+1 416 555 2019',
        email: 'mina@axisestate.com',
        officeHours: 'Mon to Fri / 08:30 to 17:30',
      },
    ],
    trending: true,
  },
  {
    id: 'epe-waterfront-parcel',
    title: 'Waterfront Parcel / Epe Belt',
    kind: 'Land',
    location: 'Epe, Lagos',
    country: 'Nigeria',
    currency: 'NGN',
    price: 16000000,
    priceLabel: 'full purchase',
    capacity: 12,
    area: '600 sqm',
    highlight: 'Build-ready land with road access and clear title path.',
    summary:
      'A land option for buyers who want to develop housing or hold long-term value.',
    description:
      'The parcel sits on a straight access road with survey documentation available. It suits duplex development, small compound housing, or future resale.',
    features: ['Survey available', 'Road access', 'Waterfront edge', 'Dry season access', 'Title review'],
    agents: [
      {
        name: 'Femi Solanke',
        title: 'Land Advisory Agent',
        phone: '+234 803 440 8891',
        email: 'femi@axisestate.com',
        officeHours: 'Mon to Sat / 09:00 to 17:00',
      },
    ],
    trending: false,
  },
  {
    id: 'accra-garden-flat',
    title: 'Garden Flat / Cantonments',
    kind: 'Property',
    location: 'Accra',
    country: 'Ghana',
    currency: 'GHS',
    price: 4200,
    priceLabel: 'per month',
    capacity: 4,
    area: '145 sqm',
    highlight: 'Ground floor apartment with a shaded outdoor strip for children.',
    summary:
      'A calm four-person apartment designed for short relocation windows and yearly leases.',
    description:
      'The plan keeps circulation short and uses a central living room as the anchor. Bedrooms stay separate from guest movement, which helps larger households feel orderly.',
    features: ['2 bedrooms', 'Outdoor strip', 'Backup water', 'Parking', 'Security desk'],
    agents: [
      {
        name: 'Efua Boateng',
        title: 'Residential Advisor',
        phone: '+233 30 255 0191',
        email: 'efua@axisestate.com',
        officeHours: 'Mon to Fri / 09:00 to 17:00',
      },
    ],
    trending: true,
  },
  {
    id: 'nairobi-ridge-plot',
    title: 'Ridge Plot / Karen Edge',
    kind: 'Land',
    location: 'Nairobi',
    country: 'Kenya',
    currency: 'KES',
    price: 23500000,
    priceLabel: 'full purchase',
    capacity: 8,
    area: '0.5 acre',
    highlight: 'Low-density site for a private residence or two-unit scheme.',
    summary:
      'A reserved plot with infrastructure nearby and room for future expansion.',
    description:
      'The site works for buyers who prefer a slow build process. Utilities can be extended from the access road, and the neighborhood has stable long-term demand.',
    features: ['Half acre', 'Utility access', 'Low density', 'Perimeter markers', 'View corridor'],
    agents: [
      {
        name: 'Neema Kilonzo',
        title: 'Acquisitions Agent',
        phone: '+254 700 211 844',
        email: 'neema@axisestate.com',
        officeHours: 'Mon to Sat / 08:00 to 17:00',
      },
    ],
    trending: false,
  },
  {
    id: 'dubai-marina-stay',
    title: 'Marina Stay / Midrise Room',
    kind: 'Room',
    location: 'Dubai Marina',
    country: 'United Arab Emirates',
    currency: 'AED',
    price: 6200,
    priceLabel: 'per month',
    capacity: 2,
    area: '49 sqm',
    highlight: 'Short-stay room designed for business travel and flexible occupancy.',
    summary:
      'A restrained room setup with easy transport links and service-led management.',
    description:
      'The room works well for travel-heavy users who need a compact but structured base. Shared amenities are managed on a daily schedule with concierge access.',
    features: ['Concierge', 'Shared gym', 'Metro access', 'Weekly cleaning', 'Balcony slot'],
    agents: [
      {
        name: 'Layla Nasser',
        title: 'Short Stay Agent',
        phone: '+971 50 000 1182',
        email: 'layla@axisestate.com',
        officeHours: 'Daily / 10:00 to 20:00',
      },
    ],
    trending: true,
  },
]

export const bookingHistory: BookingHistoryItem[] = [
  {
    id: 'BK-1024',
    listingId: 'toronto-loft-suite',
    status: 'Confirmed',
    people: 2,
    stay: '4 months',
    country: 'Canada',
    checkIn: '2026-05-02',
  },
  {
    id: 'BK-0998',
    listingId: 'lagos-courtyard-house',
    status: 'Awaiting payment',
    people: 5,
    stay: '12 months',
    country: 'Nigeria',
    checkIn: '2026-06-15',
  },
  {
    id: 'BK-0931',
    listingId: 'accra-garden-flat',
    status: 'Completed',
    people: 3,
    stay: '8 months',
    country: 'Ghana',
    checkIn: '2025-11-03',
  },
]

export const savedPaymentMethods: SavedPaymentMethod[] = [
  {
    id: 'pm-001',
    label: 'Studio travel card',
    type: 'credit-card',
    detail: 'Visa ending in 4022',
    country: 'Canada',
  },
  {
    id: 'pm-002',
    label: 'Primary iPhone wallet',
    type: 'apple-pay',
    detail: 'Active on supported Apple devices',
    country: 'United States',
  },
  {
    id: 'pm-003',
    label: 'Move-in cash preference',
    type: 'cash-on-arrival',
    detail: 'Used for local inspection handovers',
    country: 'Nigeria',
  },
]

export function getListingById(listingId: string) {
  return listings.find((listing) => listing.id === listingId)
}

export function getPaymentCountry(country: string) {
  return (
    paymentSupportByCountry.find((entry) => entry.country === country) ??
    paymentSupportByCountry[0]
  )
}

export function getPaymentMethods(country: string) {
  const entry = getPaymentCountry(country)
  return paymentMethodCatalog.filter((method) => entry.methods.includes(method.id))
}

export function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatListingPrice(listing: Listing) {
  return `${formatPrice(listing.price, listing.currency)} ${listing.priceLabel}`
}
