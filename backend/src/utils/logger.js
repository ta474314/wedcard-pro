const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log file paths
const AUTH_LOG_FILE = path.join(logsDir, 'authenticate.log');
const SYSTEM_LOG_FILE = path.join(logsDir, 'system.log');
const ERROR_LOG_FILE = path.join(logsDir, 'error.log');
const API_LOG_FILE = path.join(logsDir, 'api.log');
const CHANGE_LOG_FILE = path.join(logsDir, 'changes.log');

// Helper function to get current timestamp
const getTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

// Helper function to get formatted date for filename
const getFormattedDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Write log to file
const writeLog = (filePath, logEntry) => {
  try {
    fs.appendFileSync(filePath, logEntry + '\n', 'utf8');
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
};

// Format log entry
const formatLogEntry = (type, data, req = null) => {
  const timestamp = getTimestamp();
  const date = getFormattedDate();
  
  let logEntry = `[${timestamp}] [${date}] [${type}]`;
  
  if (req) {
    logEntry += ` [IP: ${req.ip || req.connection?.remoteAddress || 'Unknown'}]`;
    logEntry += ` [User-Agent: ${req.headers['user-agent'] || 'Unknown'}]`;
  }
  
  logEntry += `\n${JSON.stringify(data, null, 2)}`;
  logEntry += `\n${'='.repeat(80)}\n`;
  
  return logEntry;
};

// Authentication Logger
const logAuth = (action, userData, status, req = null, error = null) => {
  const logData = {
    action: action, // LOGIN, REGISTER, LOGOUT, TOKEN_REFRESH
    timestamp: getTimestamp(),
    date: getFormattedDate(),
    status: status, // SUCCESS, FAILED, ERROR
    user: userData,
    error: error ? { message: error.message, stack: error.stack } : null
  };
  
  const logEntry = formatLogEntry('AUTH', logData, req);
  writeLog(AUTH_LOG_FILE, logEntry);
  
  // Also log to console
  console.log(`📝 [AUTH] ${action} - ${status} - ${userData?.email || 'Unknown'}`);
};

// System Logger
const logSystem = (action, data, status = 'INFO') => {
  const logData = {
    action: action,
    timestamp: getTimestamp(),
    date: getFormattedDate(),
    status: status,
    data: data
  };
  
  const logEntry = formatLogEntry('SYSTEM', logData);
  writeLog(SYSTEM_LOG_FILE, logEntry);
};

// Error Logger
const logError = (error, context, req = null) => {
  const logData = {
    timestamp: getTimestamp(),
    date: getFormattedDate(),
    context: context,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack
    }
  };
  
  const logEntry = formatLogEntry('ERROR', logData, req);
  writeLog(ERROR_LOG_FILE, logEntry);
  
  // Also log to console
  console.error(`❌ [ERROR] ${context}: ${error.message}`);
};

// API Logger
const logAPI = (req, res, responseTime) => {
  const logData = {
    timestamp: getTimestamp(),
    date: getFormattedDate(),
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    responseTime: `${responseTime}ms`,
    ip: req.ip || req.connection?.remoteAddress,
    userAgent: req.headers['user-agent']
  };
  
  const logEntry = formatLogEntry('API', logData, req);
  writeLog(API_LOG_FILE, logEntry);
};

// Change Logger (for any data changes)
const logChange = (action, collection, oldData, newData, userId = null) => {
  const logData = {
    action: action, // CREATE, UPDATE, DELETE
    collection: collection,
    timestamp: getTimestamp(),
    date: getFormattedDate(),
    userId: userId,
    changes: {
      old: oldData,
      new: newData
    }
  };
  
  const logEntry = formatLogEntry('CHANGE', logData);
  writeLog(CHANGE_LOG_FILE, logEntry);
};

// Middleware to log all API requests
const logRequestMiddleware = (req, res, next) => {
  const start = Date.now();
  
  // Store original end function
  const originalEnd = res.end;
  
  // Override end function to log after response
  res.end = function(...args) {
    const responseTime = Date.now() - start;
    logAPI(req, res, responseTime);
    originalEnd.apply(res, args);
  };
  
  next();
};

// Get log files content (for admin viewing)
const getLogs = (logType, lines = 100) => {
  let logFile;
  switch(logType) {
    case 'auth':
      logFile = AUTH_LOG_FILE;
      break;
    case 'system':
      logFile = SYSTEM_LOG_FILE;
      break;
    case 'error':
      logFile = ERROR_LOG_FILE;
      break;
    case 'api':
      logFile = API_LOG_FILE;
      break;
    case 'changes':
      logFile = CHANGE_LOG_FILE;
      break;
    default:
      return null;
  }
  
  try {
    if (fs.existsSync(logFile)) {
      const content = fs.readFileSync(logFile, 'utf8');
      const lines_array = content.split('\n').filter(line => line.trim());
      return lines_array.slice(-lines).join('\n');
    }
    return 'No logs available';
  } catch (error) {
    return `Error reading logs: ${error.message}`;
  }
};

// Clear log files
const clearLogs = (logType) => {
  let logFile;
  switch(logType) {
    case 'auth':
      logFile = AUTH_LOG_FILE;
      break;
    case 'system':
      logFile = SYSTEM_LOG_FILE;
      break;
    case 'error':
      logFile = ERROR_LOG_FILE;
      break;
    case 'api':
      logFile = API_LOG_FILE;
      break;
    case 'changes':
      logFile = CHANGE_LOG_FILE;
      break;
    case 'all':
      // Clear all logs
      [AUTH_LOG_FILE, SYSTEM_LOG_FILE, ERROR_LOG_FILE, API_LOG_FILE, CHANGE_LOG_FILE].forEach(file => {
        if (fs.existsSync(file)) {
          fs.writeFileSync(file, '', 'utf8');
        }
      });
      return 'All logs cleared';
    default:
      return 'Invalid log type';
  }
  
  if (fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, '', 'utf8');
    return `${logType} logs cleared`;
  }
  return 'Log file not found';
};

module.exports = {
  logAuth,
  logSystem,
  logError,
  logAPI,
  logChange,
  logRequestMiddleware,
  getLogs,
  clearLogs,
  AUTH_LOG_FILE,
  SYSTEM_LOG_FILE,
  ERROR_LOG_FILE,
  API_LOG_FILE,
  CHANGE_LOG_FILE
};