const { isAIAvailable } = require('../utils/aiService');

/**
 * Middleware para validar si el servicio de IA está disponible
 */
const validateAIService = (req, res, next) => {
  if (!isAIAvailable()) {
    console.warn('AI service not configured. Using fallback descriptions.');
    // No bloqueamos la request, solo agregamos un flag
    req.aiAvailable = false;
  } else {
    req.aiAvailable = true;
  }
  next();
};

/**
 * Middleware para requerir que el servicio de IA esté disponible
 */
const requireAIService = (req, res, next) => {
  if (!isAIAvailable()) {
    return res.status(503).json({
      error: 'AI service not available. Please configure OPENAI_API_KEY.',
      code: 'AI_SERVICE_UNAVAILABLE'
    });
  }
  next();
};

module.exports = {
  validateAIService,
  requireAIService
};