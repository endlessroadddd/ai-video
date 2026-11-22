/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ start: NonNullable<unknown>, end: NonNullable<unknown>, total: NonNullable<unknown> }} Header_RowsInputs */

const en_header_rows = /** @type {(inputs: Header_RowsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Rows ${i?.start}-${i?.end}, total ${i?.total}`)
};

const zh_header_rows = /** @type {(inputs: Header_RowsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`第${i?.start}-${i?.end}行，共${i?.total}行`)
};

/**
* | output |
* | --- |
* | "Rows {start}-{end}, total {total}" |
*
* @param {Header_RowsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_rows = /** @type {((inputs: Header_RowsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_RowsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_header_rows(inputs)
	return zh_header_rows(inputs)
});