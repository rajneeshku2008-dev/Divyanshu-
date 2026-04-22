/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CreditScore = 'Excellent' | 'Good' | 'Fair' | 'Poor';
export type SpendingPreference = 'Travel' | 'Cashback' | 'Business' | 'Student';
export type AnnualFeePreference = 'No fee' | 'Low fee' | 'Any';
export type IncomeRange = '<$30K' | '$30K-$60K' | '$60K-$100K' | '$100K+';

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  type: SpendingPreference;
  bonus?: string;
  annualFee: number;
  creditScore: CreditScore;
  features: string[];
  referralUrl: string;
  imageUrl: string;
  incomeRequirement?: IncomeRange;
  // UI helper fields
  matchReason?: string;
}

export interface QuizData {
  creditScore: CreditScore;
  income: IncomeRange;
  spending: SpendingPreference;
  annualFee: AnnualFeePreference;
}
