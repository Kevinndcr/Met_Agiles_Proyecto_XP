const OpenAI = require('openai');
require('dotenv').config();

/**
 * Herramienta para diagnosticar problemas con el servicio de IA
 */
class AIDiagnostic {
  static async runDiagnostic() {
    console.log('🔍 DIAGNÓSTICO DEL SERVICIO DE IA');
    console.log('================================');
    
    // 1. Verificar variables de entorno
    console.log('\n1. Verificando variables de entorno...');
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.log('❌ OPENAI_API_KEY no está definida en .env');
      return false;
    }
    
    if (apiKey === 'tu_openai_api_key_aqui') {
      console.log('❌ OPENAI_API_KEY no ha sido reemplazada (valor por defecto)');
      return false;
    }
    
    console.log('✅ OPENAI_API_KEY está configurada');
    console.log(`   Longitud: ${apiKey.length} caracteres`);
    console.log(`   Prefijo: ${apiKey.substring(0, 10)}...`);
    
    // 2. Verificar formato de la API key
    console.log('\n2. Verificando formato de API key...');
    if (apiKey.startsWith('sk-')) {
      console.log('✅ API key tiene el formato correcto (sk-...)');
    } else {
      console.log('⚠️  API key no tiene el formato esperado (debería empezar con sk-)');
    }
    
    // 3. Probar conexión con OpenAI
    console.log('\n3. Probando conexión con OpenAI...');
    try {
      const openai = new OpenAI({
        apiKey: apiKey,
      });
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "Di solo 'Conexión exitosa' si puedes leer esto."
          }
        ],
        max_tokens: 10,
      });
      
      console.log('✅ Conexión exitosa con OpenAI');
      console.log(`   Respuesta: ${completion.choices[0].message.content}`);
      return true;
      
    } catch (error) {
      console.log('❌ Error al conectar con OpenAI:');
      console.log(`   Error: ${error.message}`);
      
      if (error.status === 401) {
        console.log('   💡 Solución: API key inválida o expirada');
      } else if (error.status === 429) {
        console.log('   💡 Solución: Límite de cuota excedido o rate limit');
      } else if (error.status === 500) {
        console.log('   💡 Solución: Error del servidor de OpenAI, intenta más tarde');
      }
      
      return false;
    }
  }
  
  static async testDescriptionGeneration() {
    console.log('\n4. Probando generación de descripción...');
    
    const { generateProductDescription } = require('./aiService');
    
    const testProduct = {
      nombre_producto: "Camiseta de Prueba",
      categoria: "camisetas",
      talla: "M",
      color: "azul",
      precio_unitario: 25.99
    };
    
    try {
      const description = await generateProductDescription(testProduct);
      console.log('✅ Generación de descripción exitosa');
      console.log(`   Descripción generada: "${description.substring(0, 100)}..."`);
      return true;
    } catch (error) {
      console.log('❌ Error en generación de descripción:');
      console.log(`   Error: ${error.message}`);
      return false;
    }
  }
}

// Si ejecutas este archivo directamente
if (require.main === module) {
  (async () => {
    const connectionOk = await AIDiagnostic.runDiagnostic();
    if (connectionOk) {
      await AIDiagnostic.testDescriptionGeneration();
    }
    
    console.log('\n📋 RESUMEN:');
    console.log('============');
    if (connectionOk) {
      console.log('✅ Todo funciona correctamente. La IA está disponible.');
    } else {
      console.log('❌ Hay problemas con la configuración de IA.');
      console.log('\n💡 PASOS PARA SOLUCIONARLO:');
      console.log('1. Obtén una API key válida de OpenAI: https://platform.openai.com/api-keys');
      console.log('2. Reemplaza la línea en .env: OPENAI_API_KEY=tu_nueva_api_key');
      console.log('3. Reinicia el servidor');
      console.log('4. Ejecuta este diagnóstico nuevamente: node utils/aiDiagnostic.js');
    }
  })();
}

module.exports = AIDiagnostic;