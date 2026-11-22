/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ status: NonNullable<unknown> }} Kb_Upload_Progress_StatusInputs */

const en_kb_upload_progress_status = /** @type {(inputs: Kb_Upload_Progress_StatusInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Status: ${i?.status}`)
};

const zh_kb_upload_progress_status = /** @type {(inputs: Kb_Upload_Progress_StatusInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`状态：${i?.status}`)
};

/**
* | output |
* | --- |
* | "Status: {status}" |
*
* @param {Kb_Upload_Progress_StatusInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_progress_status = /** @type {((inputs: Kb_Upload_Progress_StatusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Progress_StatusInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_progress_status(inputs)
	return zh_kb_upload_progress_status(inputs)
});