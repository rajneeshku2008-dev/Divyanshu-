/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreditCard } from './types';

export const CREDIT_CARDS: CreditCard[] = [
  {
    id: 'chase-sapphire-preferred',
    name: 'Chase Sapphire Preferred® Card',
    issuer: 'Chase',
    features: [
      '60,000 bonus points after $4,000 spend',
      '3x points on dining and streaming',
      '2x points on travel',
      'No foreign transaction fees'
    ],
    annualFee: 95,
    type: 'Travel',
    creditScore: 'Excellent',
    referralUrl: '#',
    imageUrl: 'https://picsum.photos/seed/chase/400/250',
    bonus: '60,000 Points'
  },
  {
    id: 'capital-one-venture',
    name: 'Capital One Venture Rewards Credit Card',
    issuer: 'Capital One',
    features: [
      '75,000 bonus miles after $4,000 spend',
      '2x miles on every purchase',
      '5x miles on hotels and rental cars',
      '$100 Global Entry/TSA PreCheck credit'
    ],
    annualFee: 95,
    type: 'Travel',
    creditScore: 'Excellent',
    referralUrl: '#',
    imageUrl: 'https://picsum.photos/seed/venture/400/250',
    bonus: '75,000 Miles'
  },
  {
    id: 'chase-freedom-unlimited',
    name: 'Chase Freedom Unlimited®',
    issuer: 'Chase',
    features: [
      'Unlimited 1.5% cash back',
      '3x back on dining and drugstores',
      '5x back on travel through Chase',
      '0% Intro APR for 15 months'
    ],
    annualFee: 0,
    type: 'Cashback',
    creditScore: 'Good',
    referralUrl: '#',
    imageUrl: 'https://picsum.photos/seed/freedom/400/250',
    bonus: '$200 Signup Bonus'
  },
  {
    id: 'amex-blue-cash-everyday',
    name: 'Blue Cash Everyday® Card from American Express',
    issuer: 'American Express',
    features: [
      '3% Cash Back at US supermarkets',
      '3% Cash Back on US online retail',
      '3% Cash Back at US gas stations',
      'No annual fee'
    ],
    annualFee: 0,
    type: 'Cashback',
    creditScore: 'Good',
    referralUrl: '#',
    imageUrl: 'https://picsum.photos/seed/amex/400/250',
    bonus: '$200 Statement Credit'
  },
  {
    id: 'ink-business-cash',
    name: 'Ink Business Cash® Credit Card',
    issuer: 'Chase',
    features: [
      '5% cash back on office supplies',
      '5% back on internet, cable, and phone',
      '2% back on gas stations and dining',
      'No annual fee'
    ],
    annualFee: 0,
    type: 'Business',
    creditScore: 'Excellent',
    referralUrl: '#',
    imageUrl: 'https://picsum.photos/seed/ink/400/250',
    bonus: '$350 Bonus Cash'
  },
  {
    id: 'discover-it-student',
    name: 'Discover it® Student Cash Back',
    issuer: 'Discover',
    features: [
      '5% cash back on quarterly categories',
      'Unlimited Cashback Match first year',
      'No annual fee',
      'Good Grades Reward'
    ],
    annualFee: 0,
    type: 'Student',
    creditScore: 'Fair',
    referralUrl: '#',
    imageUrl: 'https://picsum.photos/seed/student/400/250',
    bonus: 'Cashback Match'
  }
];
