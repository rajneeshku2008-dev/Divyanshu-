/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreditCard, QuizData } from '../types';
import { CREDIT_CARDS } from '../constants';

export function getRecommendedCards(quiz: QuizData, availableCards: CreditCard[]): CreditCard[] {
  return availableCards.filter(card => {
    // Basic Credit Score filtering
    const scoreMap = { Poor: 1, Fair: 2, Good: 3, Excellent: 4 };
    if (scoreMap[card.creditScore] > scoreMap[quiz.creditScore]) return false;

    // Annual Fee preference
    if (quiz.annualFee === 'No fee' && card.annualFee > 0) return false;
    if (quiz.annualFee === 'Low fee' && card.annualFee > 100) return false;

    return true;
  }).sort((a, b) => {
    // Boost exact spending matches
    const aMatch = a.type === quiz.spending ? 2 : 0;
    const bMatch = b.type === quiz.spending ? 2 : 0;
    return bMatch - aMatch;
  }).slice(0, 3);
}
