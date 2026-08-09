// ==========================================
// FORMATTING FUNCTIONS
// ==========================================

// Format currency to PKR
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return 'PKR 0';
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date to readable string
export const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format date short (no time)
export const formatDateShort = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// ==========================================
// GENERATION FUNCTIONS
// ==========================================

// Generate unique account number
export const generateAccountNumber = () => {
  const prefix = 'ACC';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${timestamp}${random}`;
};

// Generate random password
export const generatePassword = (length = 12) => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  let password = '';
  
  // Ensure at least one of each type
  password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  
  // Fill remaining length
  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  // Shuffle password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

// ==========================================
// VALIDATION FUNCTIONS
// ==========================================

// Validate email format
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number (Pakistani format)
export const validatePhone = (phone) => {
  const re = /^03[0-9]{2}[0-9]{7}$/;
  return re.test(phone);
};

// Validate CNIC (Pakistani ID)
export const validateCNIC = (cnic) => {
  const re = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
  return re.test(cnic);
};

// Validate amount (positive number)
export const validateAmount = (amount) => {
  return !isNaN(amount) && Number(amount) > 0;
};

// Validate password strength
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSymbols,
    errors: {
      length: password.length < minLength,
      uppercase: !hasUpperCase,
      lowercase: !hasLowerCase,
      numbers: !hasNumbers,
      symbols: !hasSymbols
    }
  };
};

// ==========================================
// STATUS & COLOR FUNCTIONS
// ==========================================

// Get status color for badges
export const getStatusColor = (status) => {
  const colors = {
    // Account statuses
    'active': 'success',
    'inactive': 'secondary',
    'frozen': 'dark',
    'closed': 'danger',
    
    // Loan & Transaction statuses
    'pending': 'warning',
    'approved': 'success',
    'rejected': 'danger',
    'completed': 'success',
    'processing': 'info',
    'cancelled': 'secondary',
    'failed': 'danger',
    
    // Employee statuses
    'on leave': 'warning',
    'terminated': 'danger'
  };
  
  return colors[status?.toLowerCase()] || 'primary';
};

// Get status icon
export const getStatusIcon = (status) => {
  const icons = {
    'active': '✅',
    'inactive': '⏸️',
    'frozen': '❄️',
    'pending': '⏳',
    'approved': '✅',
    'rejected': '❌',
    'completed': '✔️',
    'processing': '🔄'
  };
  
  return icons[status?.toLowerCase()] || '❓';
};

// ==========================================
// TEXT FORMATTING FUNCTIONS
// ==========================================

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Capitalize each word
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Convert camelCase to Title Case
export const camelToTitle = (str) => {
  if (!str) return '';
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

// ==========================================
// CALCULATION FUNCTIONS
// ==========================================

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
};

// Calculate loan monthly installment
export const calculateMonthlyInstallment = (amount, durationMonths, interestRate = 0) => {
  if (durationMonths === 0) return amount;
  const totalAmount = amount + (amount * interestRate / 100);
  return Math.ceil(totalAmount / durationMonths);
};

// Sum array of numbers
export const sumArray = (arr) => {
  return arr.reduce((sum, val) => sum + (Number(val) || 0), 0);
};

// ==========================================
// DATA TRANSFORMATION FUNCTIONS
// ==========================================

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
};

// Sort array by date
export const sortByDate = (array, key = 'createdAt', ascending = false) => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

// Filter unique values
export const getUniqueValues = (array, key) => {
  return [...new Set(array.map(item => item[key]))];
};

// ==========================================
// LOCAL STORAGE FUNCTIONS
// ==========================================

// Save to localStorage
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Get from localStorage
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

// Remove from localStorage
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// ==========================================
// DEBOUNCE & THROTTLE FUNCTIONS
// ==========================================

// Debounce function
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// ==========================================
// EXPORT HELPER
// ==========================================

// Get greeting based on time
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 20) return 'Good Evening';
  return 'Good Night';
};

// Generate initials from name
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Check if object is empty
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

// Clone object deeply
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Convert file to base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};