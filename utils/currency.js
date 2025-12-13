/**
 * Currency conversion utility
 * Conversion rate: 90 INR = 1 USD
 */

const INR_TO_USD_RATE = 90;

/**
 * Convert INR amount to USD
 * @param {number} inrAmount - Amount in Indian Rupees
 * @returns {number} - Amount in US Dollars
 */
export const convertINRToUSD = (inrAmount) => {
  if (!inrAmount || isNaN(inrAmount)) return 0;
  return Number((inrAmount / INR_TO_USD_RATE).toFixed(2));
};

/**
 * Format amount in USD for display
 * @param {number} inrAmount - Amount in Indian Rupees (from backend)
 * @returns {string} - Formatted USD string (e.g., "$1.00")
 */
export const formatAmountInUSD = (inrAmount) => {
  const usdAmount = convertINRToUSD(inrAmount);
  return `$${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Format amount in USD without currency symbol (for calculations)
 * @param {number} inrAmount - Amount in Indian Rupees (from backend)
 * @returns {number} - Amount in US Dollars
 */
export const getAmountInUSD = (inrAmount) => {
  return convertINRToUSD(inrAmount);
};

/**
 * Convert USD amount to INR (for sending to backend)
 * @param {number} usdAmount - Amount in US Dollars
 * @returns {number} - Amount in Indian Rupees
 */
export const convertUSDToINR = (usdAmount) => {
  if (!usdAmount || isNaN(usdAmount)) return 0;
  return Number((usdAmount * INR_TO_USD_RATE).toFixed(2));
};

