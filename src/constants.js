export const COMMENT_MAX_LENGTH = 256;

export const sexes = [
  'Male',
  'Female'
];

export const nationalities = [
  '',
  'Argentina',
  'Australia',
  'Austria',
  'Bangladesh',
  'Belarus',
  'Belgium',
  'Brazil',
  'Bulgaria',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'Estonia',
  'Fiji',
  'Finland',
  'France',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Kazakhstan',
  'Kenya',
  'Korea South',
  'Kuwait',
  'Laos',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Malaysia',
  'Mexico',
  'Monaco',
  'Mongolia',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Nigeria',
  'Norway',
  'Pakistan',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Saipan',
  'Samoa',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Thailand',
  'Tunisia',
  'Turkey',
  'Ukraine',
  'United Arab Erimates',
  'UK',
  'USA',
  'Uruguay',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'Others',
];

export const NOTNEEDED = 'Not needed';

export const equipmentOpts = [
  NOTNEEDED,
  'Regular snowboard',
  'Goofy snowboard',
  'Regular skis'
];

export const bootsizeOpts = [
  'Choose size...',
  'Own boots',
  '20',
  '20.5',
  '21',
  '21.5',
  '22',
  '22.5',
  '23',
  '23.5',
  '24',
  '24.5',
  '25',
  '25.5',
  '26',
  '26.5',
  '27',
  '27.5',
  '28',
  '28.5',
  '29',
  '29.5',
  '30',
  '30.5',
  '31',
  '31.5'
];

export const hikingshoesizeOpts = [
  'No',
  '22',
  '22.5',
  '23',
  '23.5',
  '24',
  '24.5',
  '25',
  '25.5',
  '26',
  '26.5',
  '27',
  '27.5',
  '28',
  '28.5',
  '29',
  '29.5',
  '30'
];
export const shoesizeOpts = [
  'No',
  '22',
  '22.5',
  '23',
  '23.5',
  '24',
  '24.5',
  '25',
  '25.5',
  '26',
  '26.5',
  '27',
  '27.5',
  '28',
  '28.5',
  '29',
  '29.5',
  '30'
];

export const gaitersizeOpts = [
  'No', 
  'S', 
  'M', 
  'L', 
  'XL'
];

export const jacketpantsizeOpts = [
  NOTNEEDED, 
  'XS', 
  'S', 
  'M', 
  'L', 
  'XL'
];

export const glovesizeOpts = [
  NOTNEEDED, 
  'S', 
  'M', 
  'L', 
  'XL'
];

export const bodysizeOpts = [
  'No', 
  'S', 
  'M', 
  'L', 
  'XL'
];

export const neededOpts = [
  NOTNEEDED,
  'Yes'
];

export const YesNo = [
  'Yes',
  'No',
  
];

export const YesNoMaybe = [
  'Yes',
  'No',
  'Will decide later',
];

export const lessonOpts = [
  NOTNEEDED,
  'Beginners snowboarding',
  'Beginners skiing',
  'Intermediate snowboarding (90mins)'
];

export const roomOpts = [
  'No preference',
  'Male or female only',
  'Male or female only shared rental tent',
  'Group of friends',
  'Private room/tent for 2 persons',
  'Private room for 2 persons',
  'Bringing own tent',
  'Will share rental tent with group of friends',
  'Sharing a 2 persons tent with a friend or partner',
  'With snoring people',
  'Coed room ok',
  'Private room for 3 persons',
];

export const roomOptsByEvent = {
  C: [ 2,7,8,9 ].map( idx => roomOpts[idx] ),
  S: [ 1,3,5,9,11 ].map( idx => roomOpts[idx] ),
  M: [ 1,3,5,9,11 ].map( idx => roomOpts[idx] ),
  H: [ 1,3,5,9,11 ].map( idx => roomOpts[idx] ),
  I: [ 1,3,5,9,10,11 ].map( idx => roomOpts[idx] ),
  N: [ 1,3,5,9,11 ].map( idx => roomOpts[idx] ),
  Z: [ 1,3,5,9,11 ].map( idx => roomOpts[idx] ),
  default: [ 1,3,4,6,9 ].map( idx => roomOpts[idx] ),
};

export const mealOpts = [
  'No preference',
  'No meat, fish/seafood ok',
  'No seafood',
  'No pork',
  'No beef',
  'Ovo-lacto',
  'Vegan',
];

export const events = [
  '',
  'Ski',
  'Non-ski',
  'Zao',
  'Snow Monkey',
];

export const isskievent = {
  Zao: true,
  Ski: true,
  'Snow Monkey': true,
};

export const swimmingskillOpts = [
  'Beginner',
  'Intermediate',
  'Advanced'
];

export const surfsupOpts = [
  'Surf lessons', 
  'SUP Lessons', 
  'Surf board rental only', 
  'SUP board rental only',
  'Beach Day & Pizza lunch only'

];

export const opts = {
  C: { camping: true, meals: true },
  S: { skiline: true, meals: true },
  M: { monkeybeer: true, meals: true },
  Z: { zao: true, meals: true },
  U: { unryu: true },
  H: { hotel_overnight: true, meals: true },
  N: { nightstay: true, meals: true },
  I: { oshima: true, meals: true },
  X: { not_camp: true, meals: true },
  F: { fujihikes: true, roomtent: true },
  D: { dolphin: true },
};
