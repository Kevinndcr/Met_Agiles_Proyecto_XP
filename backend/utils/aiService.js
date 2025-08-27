const fetch = require("node-fetch");

/**
 * Genera una descripción automática para un producto usando IA local (Ollama)
 * @param {Object} productData - Datos del producto
 * @returns {Promise<string>}
 */
async function generateProductDescription(productData) {
  try {
    const { nombre_producto, categoria, talla, color, precio_unitario } = productData;

    const prompt = `
      Genera una descripción atractiva y profesional para un producto de ropa con las siguientes características:
      - Nombre: ${nombre_producto}
      - Categoría: ${categoria || "ropa"}
      - Talla: ${talla || "no especificada"}
      - Color: ${color || "no especificado"}
      - Precio: $${precio_unitario}

      La descripción debe ser:
      - Entre 50 y 100 palabras
      - Atractiva para el cliente
      - Incluir características del producto
      - Mencionar beneficios y uso recomendado
      - Tono profesional pero amigable
      - En español
      - No incluir el precio.
    `;


    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3:latest", // ajusta según el modelo que tengas
        messages: [{ role: "user", content: prompt }],
        stream: false, // evita respuestas en streaming
      }),
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonError) {
      console.error("❌ Error parseando JSON:", jsonError);
      return "No se pudo generar la descripción (error parseando JSON)";
    }


    const description = data.message?.content?.trim();
    if (!description) {
      console.warn("⚠️ No se encontró 'message.content' en la respuesta de Ollama");
      return "No se pudo generar la descripción";
    }

    return description;
  } catch (error) {
    console.error("❌ Error generando descripción con Ollama:", error);
    return "No se pudo generar la descripción (error en fetch)";
  }
}

/**
 * Genera recomendaciones de productos usando IA local (Ollama)
 * @param {Array} purchasedProducts - Lista de productos comprados anteriormente {id, nombre}
 * @param {Array} availableProducts - Lista de todos los productos disponibles {id, nombre}
 * @returns {Promise<Array>}
 */
async function generateRecommendations(purchasedProducts, availableProducts) {
  try {
    const purchasedNames = purchasedProducts.map(p => p.nombre);
    const availableItems = availableProducts.map(p => `${p.nombre} (ID: ${p.id})`);

    const prompt = `
      Actúa como un sistema de recomendaciones para una tienda de ropa.

      Productos que el cliente ya ha comprado:
      ${purchasedNames.join(', ')}

      Productos disponibles en la tienda:
      ${availableItems.join(', ')}

      Basándote en el historial de compras del cliente, recomienda exactamente 3 productos que complementen sus compras anteriores o que sean similares a lo que ya ha comprado.

      IMPORTANTE: 
      - Responde ÚNICAMENTE en formato JSON válido
      - No incluyas explicaciones adicionales
      - La respuesta debe ser un array de objetos
      - Cada objeto debe tener exactamente estas propiedades: "id" y "nombre"
      - No recomiendes productos que ya ha comprado
      - Máximo 3 recomendaciones

      Formato de respuesta requerido:
      [
        {"id": "producto_id", "nombre": "nombre_del_producto"},
        {"id": "producto_id", "nombre": "nombre_del_producto"},
        {"id": "producto_id", "nombre": "nombre_del_producto"}
      ]
    `;

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3:latest",
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonError) {
      console.error("❌ Error parseando JSON de respuesta de Ollama:", jsonError);
      return generateFallbackRecommendations(purchasedProducts, availableProducts);
    }

    const recommendationsText = data.message?.content?.trim();
    if (!recommendationsText) {
      console.warn("⚠️ No se encontró 'message.content' en la respuesta de Ollama");
      return generateFallbackRecommendations(purchasedProducts, availableProducts);
    }

    // Intentar parsear las recomendaciones como JSON
    let recommendations;
    try {
      recommendations = JSON.parse(recommendationsText);
    } catch (parseError) {
      console.error("❌ Error parseando recomendaciones JSON:", parseError);
      return generateFallbackRecommendations(purchasedProducts, availableProducts);
    }

    // Validar formato de las recomendaciones
    if (!Array.isArray(recommendations)) {
      console.error("❌ Las recomendaciones no son un array");
      return generateFallbackRecommendations(purchasedProducts, availableProducts);
    }

    // Filtrar y validar recomendaciones
    const validRecommendations = recommendations
      .filter(rec => rec.id && rec.nombre && typeof rec.id === 'string' && typeof rec.nombre === 'string')
      .slice(0, 3); // Máximo 3 recomendaciones

    if (validRecommendations.length === 0) {
      console.warn("⚠️ No se generaron recomendaciones válidas");
      return generateFallbackRecommendations(purchasedProducts, availableProducts);
    }

    return validRecommendations;

  } catch (error) {
    console.error("❌ Error generando recomendaciones con Ollama:", error);
    return generateFallbackRecommendations(purchasedProducts, availableProducts);
  }
}


/**
 * Fallback si falla la IA
 */
function generateFallbackDescription(productData) {
  console.log("🔹 Usando fallback de descripción");
  const { nombre_producto, categoria, talla, color } = productData;
  let description = `${nombre_producto}`;
  if (categoria) description += ` es una excelente opción en ${categoria}`;
  if (color && talla) description += `, disponible en color ${color} y talla ${talla}`;
  else if (color) description += ` en hermoso color ${color}`;
  else if (talla) description += ` en talla ${talla}`;
  description +=
    ". Perfecto para uso diario, combina comodidad y estilo. Material de alta calidad que garantiza durabilidad y confort.";
  return description;
}

module.exports = {
  generateProductDescription,
  generateRecommendations,
  generateFallbackDescription,
};
