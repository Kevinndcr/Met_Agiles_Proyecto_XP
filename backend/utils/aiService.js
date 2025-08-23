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
  generateFallbackDescription,
};
