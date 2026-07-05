import { CONTACT_CHANNELS, MAIN_OFFICE_ADDRESS_LINES } from '../../data/contact';

export const CONTACT_HIGHLIGHTS = [
  {
    icon: 'pin',
    label: 'Head office',
    value: 'Nairobi, Kenya',
  },
  {
    icon: 'office',
    label: 'Coverage',
    value: 'Africa, Europe, Asia, the Middle East, the Americas, and Oceania',
  },
  {
    icon: 'clock',
    label: 'Response time',
    value: '< 24 Hours',
  },
];

export const CONTACT_OFFICES = [
  {
    id: 'kenya-hq',
    region: 'East Africa',
    country: 'Kenya',
    city: 'Nairobi',
    label: 'Head Office',
    note: 'Primary commercial and coordination desk.',
    addressLines: MAIN_OFFICE_ADDRESS_LINES,
    phones: [CONTACT_CHANNELS.phoneDisplay],
    email: CONTACT_CHANNELS.emailDisplay,
    hours: 'Mon - Fri / 08:00 - 17:30 EAT',
  },
  {
    id: 'tanzania-desk',
    region: 'East Africa',
    country: 'Tanzania',
    city: 'Dar es Salaam',
    label: 'Country Desk',
    note: 'Tanzania office and coordination desk.',
    addressLines: [
      'Rita Tower, 18th Floor',
      'Plot Number 727/11 Makunganya/Simu Street',
      'P.O. Box 31902',
      'Dar es Salaam, Tanzania',
    ],
    phones: ['+254-759-678710'],
    email: CONTACT_CHANNELS.emailDisplay,
    hours: 'Mon - Fri / Local office hours',
  },
  {
    id: 'south-sudan-desk',
    region: 'East Africa',
    country: 'South Sudan',
    city: 'Juba',
    label: 'Country Desk',
    note: 'South Sudan office and coordination desk.',
    addressLines: [
      'Hai Kuwait Bilpam Road',
      'Next to North East Building Room 5',
      'Juba, South Sudan',
    ],
    phones: ['Phone number to be added'],
    email: CONTACT_CHANNELS.emailDisplay,
    hours: 'Mon - Fri / Local office hours',
  },
];
