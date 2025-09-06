// utils/validatePayPalBody.js
export function validatePayPalBody(body) {
    if (!body || typeof body !== "object") {
      return "Body must be an object";
    }
  
    if (!Array.isArray(body.purchase_units) || body.purchase_units.length === 0) {
      return "purchase_units must be a non-empty array";
    }
  
    const unit = body.purchase_units[0];
  
    if (!unit.amount || typeof unit.amount.value === "undefined") {
      return "Missing amount.value";
    }
  
    // Amount must be a string with 2 decimal places, e.g. "10.00"
    const amountStr = String(unit.amount.value);
    if (!/^\d+(\.\d{1,2})$/.test(amountStr)) {
      return `Invalid amount format: ${amountStr}`;
    }
  
    if (!unit.amount.currency_code || unit.amount.currency_code !== "USD") {
      return "Currency code must be USD";
    }
  
    if (!unit.custom_id || typeof unit.custom_id !== "string") {
      return "custom_id (bookingId) is required and must be a string";
    }
  
    if (!unit.description || typeof unit.description !== "string") {
      return "description is required and must be a string";
    }
  
    return null; // ✅ all good
  }
  