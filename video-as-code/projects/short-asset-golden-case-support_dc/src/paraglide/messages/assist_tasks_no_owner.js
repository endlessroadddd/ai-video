/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_No_OwnerInputs */

const en_assist_tasks_no_owner = /** @type {(inputs: Assist_Tasks_No_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No owner`)
};

const zh_assist_tasks_no_owner = /** @type {(inputs: Assist_Tasks_No_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无负责人`)
};

/**
* | output |
* | --- |
* | "No owner" |
*
* @param {Assist_Tasks_No_OwnerInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_no_owner = /** @type {((inputs?: Assist_Tasks_No_OwnerInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_No_OwnerInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_no_owner(inputs)
	return zh_assist_tasks_no_owner(inputs)
});