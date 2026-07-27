const ROLES = ['SUPERADMIN', 'REDITEL', 'ADMINISTRACE', 'VEDOUCI', 'MONTER'];
const ATTENDANCE_TYPES = ['PRICHOD', 'ODCHOD', 'ABSENCE'];
const ATTENDANCE_STATUSES = ['PRACE', 'NEMOC', 'DOVOLENA', 'SKOLENI', 'CESTA'];
const DOCUMENT_TYPES = ['INVOICE', 'PROFORMA_INVOICE', 'CREDIT_NOTE', 'ATTENDANCE_STATEMENT', 'ATTENDANCE_CLOSURE', 'DAILY_LOG_ENTRY', 'DAILY_LOG_REPORT', 'PROJECT_ASSIGNMENT', 'PROJECT_HANDOVER_PROTOCOL', 'CHANGE_PROTOCOL', 'INVENTORY_ISSUE_NOTE', 'INVENTORY_RECEIPT_NOTE', 'INVENTORY_AUDIT_PROTOCOL', 'VZT_CALCULATION_SHEET', 'VZT_PRODUCTION_SHEET', 'PRICE_OFFER', 'SERVICE_REPORT', 'LICENSE_AGREEMENT', 'USER_APPROVAL', 'SIGNATURE_AUTHORIZATION', 'PAYMENT_REMINDER', 'PAYMENT_CONFIRMATION'];
const DOCUMENT_STATUSES = ['DRAFT', 'PENDING_REVIEW', 'PENDING_APPROVAL', 'APPROVED', 'PENDING_SIGNATURE', 'SIGNED', 'EXPORTED', 'ARCHIVED', 'REJECTED', 'CANCELLED', 'SUPERSEDED'];
const EXPORT_FORMATS = ['PDF', 'DOCX', 'XLSX'];
const SIGNATURE_LEVELS = ['INTERNAL_APPROVAL', 'SIMPLE', 'ADVANCED', 'QUALIFIED', 'ELECTRONIC_SEAL', 'TIMESTAMP_ONLY'];
const PROJECT_GPS_MODES = ['MANUAL', 'AUTO', 'COMBINED'];
const INVENTORY_MOVEMENT_TYPES = ['RECEIPT', 'ISSUE', 'TRANSFER', 'ADJUSTMENT', 'WRITE_OFF', 'RETURN'];

function requiredString(value, field, min = 1) {
  if (typeof value !== 'string' || value.trim().length < min) return `${field} je povinný text`;
  return null;
}

function optionalEnum(value, field, allowed) {
  if (value === undefined || value === null || value === '') return null;
  if (!allowed.includes(value)) return `${field} musí být jedna z hodnot: ${allowed.join(', ')}`;
  return null;
}

function requiredEnum(value, field, allowed) {
  if (!allowed.includes(value)) return `${field} musí být jedna z hodnot: ${allowed.join(', ')}`;
  return null;
}

function optionalNumber(value, field) {
  if (value === undefined || value === null || value === '') return null;
  if (Number.isNaN(Number(value))) return `${field} musí být číslo`;
  return null;
}

function requiredNumber(value, field) {
  if (value === undefined || value === null || value === '' || Number.isNaN(Number(value))) return `${field} musí být číslo`;
  return null;
}

function optionalEmail(value, field) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string' || !value.includes('@')) return `${field} musí být validní e-mail`;
  return null;
}

function requiredBooleanLike(value, field) {
  if (typeof value !== 'boolean') return `${field} musí být boolean`;
  return null;
}

function requiredUuidish(value, field) {
  if (typeof value !== 'string' || value.trim().length < 8) return `${field} musí být neprázdné ID`;
  return null;
}

function optionalStringArray(value, field, { maxItems = 4 } = {}) {
  if (value === undefined || value === null) return null;
  if (!Array.isArray(value)) return `${field} musí být pole`;
  if (value.length > maxItems) return `${field} může mít maximálně ${maxItems} položky`;
  if (value.some((item) => typeof item !== 'string' || !item.trim())) return `${field} musí obsahovat jen textové položky`;
  return null;
}

function collect(checks) {
  return checks.filter(Boolean);
}

export const validators = {
  auth