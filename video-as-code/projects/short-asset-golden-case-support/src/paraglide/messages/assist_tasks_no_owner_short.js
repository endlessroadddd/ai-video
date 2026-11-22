/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_No_Owner_ShortInputs */

const en_assist_tasks_no_owner_short = /** @type {(inputs: Assist_Tasks_No_Owner_ShortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`N`)
};

const zh_assist_tasks_no_owner_short = /** @type {(inputs: Assist_Tasks_No_Owner_ShortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无`)
};

/**
* | output |
* | --- |
* | "N" |
*
* @param {Assist_Tasks_No_Owner_ShortInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_no_owner_short = /** @type {((inputs?: Assist_Tasks_No_Owner_ShortInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_No_Owner_ShortInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_no_owner_short(inputs)
	return zh_assist_tasks_no_owner_short(inputs)
});